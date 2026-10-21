/* Durable editorial updates applied to every rendered design export. */
const CREATIVE_PARAGRAPH = "Dr Lidstone is passionate about neuroscience and the arts, especially theatre and the dramatic arts. She loves working on projects that cross the creative disciplines.";
const CONTACT_NOTICE = "This website is for educational purposes only.";

function count(source, value) {
  return source.split(value).length - 1;
}

function replaceOnce(source, before, after, label) {
  const occurrences = count(source, before);
  if (occurrences !== 1) throw new Error(`${label}: expected one source match, found ${occurrences}`);
  return source.replace(before, after);
}

function updateConsulting(html) {
  const cards = ["FAST PD Clinics", "Care Finder", "Digital Hub"];
  const headingCount = (source, title) => (source.match(new RegExp(`<h3\\b[^>]*>${title}<\\/h3>`, "g")) || []).length;
  const present = [count(html, "Current Work"), ...cards.map((title) => headingCount(html, title))];
  if (present.every((n) => n === 0)) return html;
  if (present.some((n) => n !== 1)) throw new Error(`Consulting section markers have unexpected counts: ${present.join(", ")}`);

  const heading = html.indexOf("Current Work");
  const start = html.lastIndexOf("<section", heading);
  const end = html.indexOf("</section>", heading);
  if (start < 0 || end < 0) throw new Error("Could not locate the bounded Consulting Current Work section");
  const section = html.slice(start, end + "</section>".length);
  if (count(section, "Current Work") !== 1) throw new Error("Consulting heading is outside the expected section");
  for (const card of cards) {
    if (headingCount(section, card) !== 1) throw new Error(`Consulting card is outside the expected section: ${card}`);
  }
  return html.slice(0, start) + html.slice(end + "</section>".length);
}

function updateCreative(html) {
  const intro = '<p style="font-size: 19px; margin: 0px; max-width: 760px;">Bringing clinical accuracy and lived-experience sensitivity to storytelling about the brain.</p>';
  const paragraph = `<p style="font-size: 19px; margin: 18px 0px 0px; max-width: 760px;">${CREATIVE_PARAGRAPH}</p>`;
  const existing = count(html, CREATIVE_PARAGRAPH);
  if (existing > 1) throw new Error("Creative paragraph appears more than once");
  if (existing === 1) return html;
  return replaceOnce(html, intro, `${intro}${paragraph}`, "Creative introduction");
}

function updateContact(html) {
  const introNote = '<p style="font-size: 16px; margin: 18px 0px 0px; max-width: 760px; color: rgb(107, 90, 100);">This contact page is not monitored for clinical questions, appointment requests, symptoms, medical history, or urgent health concerns. Please do not include personal health information.</p>';
  const notice = `<p style="font-size: 16px; margin: 12px 0px 0px; max-width: 760px; color: rgb(107, 90, 100);">${CONTACT_NOTICE}</p>`;
  const existing = count(html, CONTACT_NOTICE);
  if (existing > 1) throw new Error("Contact notice appears more than once");
  if (existing === 1) return html;
  return replaceOnce(html, introNote, `${introNote}${notice}`, "Contact introduction note");
}

function removeEducationNavigation(html, pageName) {
  return html.replace(/<(header|footer)\b[^>]*>[\s\S]*?<\/\1>/gi, (region) => {
    const isFooter = /^<footer\b/i.test(region);
    let updated = isFooter
      ? region.replace(/<li>\s*<a\b(?=[^>]*\bhref="\/education")[^>]*>Education<\/a>\s*<\/li>/g, "")
      : region.replace(/<a\b(?=[^>]*\bhref="\/education")[^>]*>Education<\/a>/g, "");
    if (isFooter) updated = updated.replace(/<li>\s*<\/li>/g, "");
    if (/<a\b(?=[^>]*\bhref="\/education")[^>]*>Education<\/a>/.test(updated)) {
      throw new Error(`${pageName}: Education navigation link remains in a desktop header or footer`);
    }
    return updated;
  });
}

function transform(records) {
  const pages = structuredClone(records);
  for (const [name, record] of Object.entries(pages)) {
    if (typeof record.html !== "string") throw new Error(`${name}: missing rendered HTML`);
    record.html = removeEducationNavigation(record.html, name);
  }

  if (!pages.Consulting || !pages.Creative || !pages.Contact) {
    throw new Error("Editorial updates require Consulting, Creative, and Contact page records");
  }
  pages.Consulting.html = updateConsulting(pages.Consulting.html);
  pages.Creative.html = updateCreative(pages.Creative.html);
  pages.Contact.html = updateContact(pages.Contact.html);

  const finalHtml = Object.values(pages).map((record) => record.html).join("\n");
  for (const label of ["FAST PD Clinics", "Care Finder", "Digital Hub", "Current Work"]) {
    if (finalHtml.includes(label)) throw new Error(`Editorial update check failed: ${label} remains`);
  }
  if (count(finalHtml, CREATIVE_PARAGRAPH) !== 1) throw new Error("Creative paragraph check failed");
  if (count(finalHtml, CONTACT_NOTICE) !== 1) throw new Error("Contact notice check failed");
  if (/href="\/education"/.test(finalHtml)) throw new Error("Education navigation link remains");
  if (pages.Education?.slug !== "/education") throw new Error("Education page route/data was not retained");
  return pages;
}

module.exports = { transform };
