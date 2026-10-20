export default function NotFound() {
  return (
    <section style={{ maxWidth: 680, margin: "0 auto", padding: "96px 24px", lineHeight: 1.75 }}>
      <p style={{ color: "#5a2547", fontSize: 13, letterSpacing: ".16em", textTransform: "uppercase" }}>Page not found</p>
      <h1 style={{ color: "#5a2547", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 48, fontWeight: 500, lineHeight: 1.1 }}>This page is not available.</h1>
      <p>The address may have changed. Explore the site from the homepage.</p>
      <a href="/" style={{ display: "inline-block", padding: "12px 20px", background: "#5a2547", color: "#fff", borderRadius: 4 }}>Return home</a>
    </section>
  );
}
