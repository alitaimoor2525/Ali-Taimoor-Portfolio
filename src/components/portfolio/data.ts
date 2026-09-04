import fixlyImg from "@/assets/fixly.jpg";
import novapayImg from "@/assets/novapay.jpg";
import aliPhoto from "@/assets/ali.jpg.asset.json";

export const PROFILE = {
  name: "Ali Taimoor",
  photo: aliPhoto.url as string | null,
  roles: ["AI/ML Engineer", "Full-Stack Developer", "Building Intelligent Products"],
  statement: "I design and ship AI-powered products end-to-end — from model to interface.",
  email: "taimoorali659@gmail.com",
  github: "https://github.com/alitaimoor2525",
  linkedin: "https://www.linkedin.com/in/ali-taimoor-cs",
};

export const STATS = [
  { value: "12+", label: "Projects Shipped" },
  { value: "2", label: "AI Internships" },
  { value: "15+", label: "Technologies" },
  { value: "100%", label: "Ownership" },
];

export const SKILLS = [
  {
    category: "AI / ML",
    items: ["Python", "PyTorch", "TensorFlow", "scikit-learn", "Pandas / NumPy", "OpenAI API"],
  },
  {
    category: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "FastAPI", "Firebase", "PostgreSQL", "REST / WebSockets"],
  },
  {
    category: "Tools / DevOps",
    items: ["Git & GitHub", "Docker", "Vercel", "CI/CD", "Postman", "Figma"],
  },
];

export const PROJECTS = [
  {
    name: "Fixly",
    tagline: "AI-powered home services marketplace",
    image: fixlyImg,
    problem:
      "Homeowners waste hours vetting unreliable technicians, while skilled providers struggle to find nearby, trustworthy work.",
    solution:
      "Built a marketplace where an ML ranking layer matches each request to the best-fit provider using skill overlap, location, pricing and rating signals.",
    features: [
      "ML-based provider matching & ranking engine",
      "Real-time booking, chat and status tracking",
      "Trust layer: verification, reviews, dispute flow",
      "Provider dashboard with earnings analytics",
    ],
    outcome: "Cut average time-to-match to under 60 seconds in testing across 5 service categories.",
    stack: ["Next.js", "TypeScript", "Node.js", "Python", "scikit-learn", "Firebase"],
    github: "https://github.com/alitaimoor2525/fixly-ai-marketplace",
    demo: "https://example.com/",
  },
  {
    name: "NovaPay",
    tagline: "FinTech mobile application",
    image: novapayImg,
    problem:
      "Everyday users juggle multiple apps to send money, split bills and understand where their money actually goes.",
    solution:
      "Shipped a mobile-first wallet with instant peer transfers and an ML categorisation model that turns raw transactions into readable spending insight.",
    features: [
      "Instant P2P transfers with ledger-safe transactions",
      "Automatic transaction categorisation model",
      "Anomaly detection for suspicious activity",
      "Budget insights with predictive monthly spend",
    ],
    outcome: "Categorisation model reached 94% accuracy on held-out transaction data.",
    stack: ["React Native", "Node.js", "Firebase", "Python", "TensorFlow", "PostgreSQL"],
    github: "https://github.com/alitaimoor2525/novapay-fintech-app",
    demo: "https://example.com/",
  },
  {
    name: "ML Learning Journey",
    tagline: "Applied ML notebooks & experiments",
    problem: "A working archive of end-to-end ML experiments — from clean data pipelines to deployed inference.",
    stack: ["Python", "PyTorch", "Jupyter"],
    github: "https://github.com/alitaimoor2525/ml-learning-journey",
  },
];

