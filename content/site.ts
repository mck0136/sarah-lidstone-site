export const siteConfig = {
  name: "Dr. Sarah Lidstone",
  title: "Dr. Sarah Lidstone | Neurologist, Researcher, Speaker",
  description:
    "A personal-professional website for Dr. Sarah Lidstone, a Toronto neurologist, neuroscientist, researcher, and speaker focused on whole-person neurology, rehabilitation, and integrated care.",
  url: "https://drsarahlidstone.com"
};

export const contactEmail = "Sarah.Lidstone@gmail.com";

export const logo = {
  src: "/images/sarah-lidstone-logo.png",
  alt: "Sarah Lidstone MD logo",
  width: 194,
  height: 144
};

export const logoMonogram = {
  src: "/images/sarah-lidstone-monogram.png",
  alt: "SL monogram",
  width: 99,
  height: 88
};

export const portrait = {
  src: "/images/sarah-lidstone-portrait-hero.jpeg",
  alt: "Portrait of Dr. Sarah Lidstone"
};

export const aboutPortrait = {
  src: "/images/sarah-lidstone-portrait-about.jpeg",
  alt: "Portrait of Dr. Sarah Lidstone in a light blazer"
};

export const mediaPortrait = {
  src: "/images/sarah-lidstone-headshot-highres.jpg",
  alt: "Headshot of Dr. Sarah Lidstone"
};

export const navigation = [
  { label: "About", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Speaking", href: "/speaking-media" },
  { label: "Integrated Care", href: "/integrated-care" },
  { label: "Contact", href: "/contact" }
];

export const affiliations = [
  "University Health Network",
  "University of Toronto",
  "Toronto Western Hospital",
  "Toronto Rehabilitation Institute",
  "Integrated Movement Disorders Program"
];

export const tedxTalk = {
  title:
    "It\u2019s All in Your Head: Challenging Dualism in Health Care | Dr. Sarah Lidstone | TEDxUofT",
  shortTitle: "It\u2019s All in Your Head: Challenging Dualism in Health Care",
  url: "https://www.youtube.com/watch?v=XtSNBqC1z18",
  embedUrl: "https://www.youtube-nocookie.com/embed/XtSNBqC1z18",
  thumbnail: "https://i.ytimg.com/vi/XtSNBqC1z18/hqdefault.jpg",
  published: "2024-12-20",
  summary:
    "In this official TEDxUofT talk, Dr. Lidstone challenges the divide between neurology and psychiatry and explains why care that integrates brain, mind, and body can better support patients and clinicians."
};

export const philosophy = [
  {
    title: "Brain",
    body: "Neurological science, careful diagnosis, movement-disorder expertise, and a commitment to taking symptoms seriously."
  },
  {
    title: "Mind",
    body: "The lived experience of illness, mental health, learning, expectation, confidence, and self-management."
  },
  {
    title: "Body",
    body: "Rehabilitation, movement, physiotherapy, practical recovery goals, and function in everyday life."
  }
];

export type Publication = {
  year: string;
  title: string;
  journal: string;
  description: string;
  href: string;
  doi?: string;
  topic: string;
  featured?: boolean;
};

export const publications: Publication[] = [
  {
    year: "2025",
    title: "Integrated model of care for functional movement disorder: targeting brain, mind and body.",
    journal: "Disability and Rehabilitation",
    description:
      "Describes an integrated care model for functional movement disorder that combines neurology, physiotherapy, and mental health-informed care.",
    href: "https://pubmed.ncbi.nlm.nih.gov/38978472/",
    doi: "10.1080/09638288.2024.2373775",
    topic: "Integrated care",
    featured: true
  },
  {
    year: "2024",
    title: "Rehabilitation for Functional Dystonia: Cases and Review of the Literature.",
    journal: "Movement Disorders Clinical Practice",
    description:
      "Reviews rehabilitation approaches for functional dystonia and illustrates how functional recovery can be addressed in practice.",
    href: "https://pubmed.ncbi.nlm.nih.gov/38853490/",
    doi: "10.1002/mdc3.14121",
    topic: "Rehabilitation",
    featured: true
  },
  {
    year: "2024",
    title: "Factors Influencing Triage to Rehabilitation in Functional Movement Disorder.",
    journal: "Movement Disorders Clinical Practice",
    description:
      "Explores how patients with functional movement disorder are triaged to rehabilitation, supporting more thoughtful care pathways.",
    href: "https://pubmed.ncbi.nlm.nih.gov/38385766/",
    doi: "10.1002/mdc3.14007",
    topic: "Functional movement disorder",
    featured: true
  },
  {
    year: "2023",
    title: "Setting up Functional Neurological Disorder Treatment Services: Questions and Answers.",
    journal: "Neurologic Clinics",
    description:
      "Addresses practical questions involved in establishing services for functional neurological disorder treatment.",
    href: "https://pubmed.ncbi.nlm.nih.gov/37775201/",
    doi: "10.1016/j.ncl.2023.04.002",
    topic: "Functional neurological disorder"
  },
  {
    year: "2023",
    title: "Moving Beyond Movement: Diagnosing Functional Movement Disorder.",
    journal: "Seminars in Neurology",
    description:
      "Frames functional movement disorder diagnosis through clinical signs and a broader understanding of patient experience.",
    href: "https://pubmed.ncbi.nlm.nih.gov/36893796/",
    doi: "10.1055/s-0043-1763505",
    topic: "Functional movement disorder"
  },
  {
    year: "2022",
    title:
      "Functional movement disorder gender, age and phenotype study: a systematic review and individual patient meta-analysis of 4905 cases.",
    journal: "Journal of Neurology, Neurosurgery, and Psychiatry",
    description:
      "Uses a large individual-patient meta-analysis to clarify age, gender, and phenotype patterns in functional movement disorder.",
    href: "https://pubmed.ncbi.nlm.nih.gov/35217516/",
    doi: "10.1136/jnnp-2021-328462",
    topic: "Functional movement disorder",
    featured: true
  },
  {
    year: "2020",
    title: "Diagnosing functional neurological disorder: seeing the whole picture.",
    journal: "CNS Spectrums",
    description:
      "Argues for diagnosis that integrates neurological, psychological, and follow-up perspectives in functional neurological disorder.",
    href: "https://pubmed.ncbi.nlm.nih.gov/33161935/",
    doi: "10.1017/S1092852920001996",
    topic: "Patient education"
  },
  {
    year: "2020",
    title: "The evidence for multidisciplinary care in Parkinson's disease.",
    journal: "Expert Review of Neurotherapeutics",
    description:
      "Reviews the evidence base for multidisciplinary care in Parkinson's disease and the value of coordinated support.",
    href: "https://pubmed.ncbi.nlm.nih.gov/32479209/",
    doi: "10.1080/14737175.2020.1771184",
    topic: "Parkinson's disease"
  },
  {
    year: "2020",
    title: "Integrated Therapy for Functional Movement Disorders: Time for a Change.",
    journal: "Movement Disorders Clinical Practice",
    description:
      "Makes the case for integrated therapy approaches in functional movement disorders.",
    href: "https://pubmed.ncbi.nlm.nih.gov/32071934/",
    doi: "10.1002/mdc3.12888",
    topic: "Integrated care"
  },
  {
    year: "2014",
    title: "Great expectations: the placebo effect in Parkinson's disease.",
    journal: "Handbook of Experimental Pharmacology",
    description:
      "Reviews the placebo effect in Parkinson's disease and why expectation matters in neurological research and care.",
    href: "https://pubmed.ncbi.nlm.nih.gov/25304530/",
    doi: "10.1007/978-3-662-44519-8_8",
    topic: "Placebo science"
  },
  {
    year: "2010",
    title: "Effects of expectation on placebo-induced dopamine release in Parkinson disease.",
    journal: "Archives of General Psychiatry",
    description:
      "Investigates how expectation can influence placebo-induced dopamine release in Parkinson disease.",
    href: "https://pubmed.ncbi.nlm.nih.gov/20679593/",
    doi: "10.1001/archgenpsychiatry.2010.88",
    topic: "Placebo science"
  }
];

export const researchThemes = [
  "Parkinson's disease",
  "Functional neurological disorder",
  "Functional movement disorder",
  "Rehabilitation",
  "Placebo science",
  "Patient education",
  "Integrated care"
];

export const speakingTopics = [
  {
    title: "Challenging the false divide",
    body: "A clear, evidence-led case for moving beyond the split between physical and mental health."
  },
  {
    title: "Functional neurological disorder",
    body: "How integrated services can take symptoms seriously while supporting recovery-oriented care."
  },
  {
    title: "Parkinson's and whole-person neurology",
    body: "What movement disorders teach us about multidisciplinary care, expectation, and lived experience."
  },
  {
    title: "Building integrated models",
    body: "Practical lessons for multidisciplinary teams caring for complex neurological conditions."
  },
  {
    title: "Patient education and self-management",
    body: "How better understanding can become part of care, confidence, and recovery."
  },
  {
    title: "Rethinking rehabilitation",
    body: "Rehabilitation as active, collaborative, brain-mind-body care rather than a downstream afterthought."
  }
];

export const inquiryRoutes = [
  {
    title: "Speaking and media",
    body: "Conference keynotes, podcast invitations, interviews, panels, and medical education programs."
  },
  {
    title: "Research collaboration",
    body: "Academic, clinical, rehabilitation, and integrated-care research conversations."
  },
  {
    title: "Professional inquiries",
    body: "Institutional, education, and healthcare-system inquiries that do not involve patient intake."
  }
];

export const approvalItems = [
  "Confirm MD and PhD credential styling and any preferred post-nominals.",
  "Confirm current appointments, titles, and active affiliations before publishing.",
  "Confirm whether Krembil Brain Institute and KITE Research Institute should be shown as current affiliations.",
  "Approve wording around Integrated Rehabilitation and any named clinical model.",
  "Provide approved portrait, headshot, downloadable speaker sheet, and contact destination.",
  "Review all Ontario physician advertising, privacy, accessibility, and medical disclaimer language."
];
