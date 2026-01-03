export const config = {
  profile: {
    name: "Rajas Ronghe",
    role: "Security Engineer",
    email: "rajasr9@outlook.com",
    phone: "+1 (267) 366-3719",
    location: "Philadelphia, PA",
    linkedin: "https://linkedin.com/in/rajas-ronghe93/",
    github: "https://github.com/rajasr93"
  },

  // 1. NEW: The Start Screen Content
  start: {
    greeting: "Welcome to Rajas Ronghe's Portfolio!",
    bio: "This is Rajas Ronghe. He is a security engineer who believes that the best way to build a secure system is to understand exactly how to break it. He spends his time architecting cloud defenses, researching the vulnerabilities of AI, and occasionally staring at the night sky.",
    instructions: "This interface is designed to let you query my background directly from the source.",
    commands: [
      { cmd: "about", desc: "Background & Philosophy" },
      { cmd: "experience", desc: "Professional History" },
      { cmd: "projects", desc: "Research & Payloads" },
      { cmd: "skills", desc: "Technical Arsenal" },
      { cmd: "education", desc: "Credentials" },
      { cmd: "intel", desc: "Intelligence Feed" }
    ]
  },

  thanks: {
    message: "Thank you for taking the time to explore my world! It truly means a lot. If you'd like to discuss security, engineering, or just connect, please feel free to reach out. I'd love to chat!"
  },

  // 2. UPDATED: The Narrative "About Me"
  about: {
    sections: [
      "My path into cybersecurity wasn't linear; it was a recursive loop of curiosity. During my time at Drexel University, I realized that engineering reliable software requires a fundamental understanding of failure states. That insight shifted my focus from simply building applications to securing the infrastructure that powers them.",
      "I started my career grappling with the tangible chaos of general IT and network hardware. As I pivoted toward Security Engineering, I translated that hands-on discipline into the cloud. I learned that modern security isn't just about configuring firewalls; it is about orchestration, automating compliance, and understanding the behavioral psychology behind every attack vector.",
      "Today, my work exists at the volatile intersection of infrastructure and innovation. Whether I am hardening cloud environments or dissecting adversarial AI models, I approach security as an engineering problem rather than a checklist."
    ]
  },

  // 3. UPDATED: The "Smart" Experience Summaries
  experience: [
    {
      company: "Saayam-for-All",
      role: "Cloud Security Engineer",
      period: "Feb 2025 – Present",
      location: "San Jose, CA",
      // The polished narrative summary:
      desc: "Security policies are useless if they aren't enforced by code. Engineered automated IAM provisioning systems using Python and Infrastructure as Code (IaC), which effectively eliminated manual configuration errors across the cloud environment. Orchestrated standardized validation frameworks for AWS infrastructure, ensuring strict compliance across development, staging, and production ecosystems. To tighten access controls, streamlined credential lifecycle management by automating rotation workflows and implemented secure secrets management architectures to support SOC 2 requirements. The focus was on building a self-healing infrastructure where security is baked in, not bolted on.",
      tags: ["AWS", "Python", "IaC", "SOC 2"]
    },
    {
      company: "Drexel University",
      role: "AI Cybersecurity Research Co-op",
      period: "Oct 2024 – Dec 2024",
      location: "Philadelphia, PA",
      desc: "Active defense requires understanding how to break the model first. Pioneered adversarial machine learning testing methodologies against neural networks, achieving a 92% attack success rate to validate model robustness. Analyzed vulnerability patterns within image classification systems, documenting accuracy degradation to inform the development of resilient defense mechanisms. This research moved beyond theory, as findings on adversarial vulnerabilities were presented to stakeholders to directly influence future AI defense strategies.",
      tags: ["Adversarial ML", "AI Security", "Research"]
    },
    {
      company: "SK Enterprises",
      role: "Security Engineer",
      period: "Jan 2022 – Jan 2023",
      location: "India",
      desc: "Testing the human firewall is just as critical as testing the software. Spearheaded organizational phishing simulation campaigns using behavioral analysis, reducing employee susceptibility to social engineering by 32%. On the technical side, executed comprehensive vulnerability assessments utilizing Metasploit and OWASP standards to identify and remediate critical flaws in web applications. Optimized these testing workflows by integrating Burp Suite, which accelerated threat detection capabilities. Consolidated monitoring operations for 115 endpoints, enhancing incident response velocity and visibility into network threats.",
      tags: ["Phishing Sim", "Metasploit", "Burp Suite"]
    },
    {
      company: "Digital Pass",
      role: "Cybersecurity Intern",
      period: "Jan 2021 – Jan 2022",
      location: "India",
      desc: "You cannot protect what you cannot see. Leveraged OSINT reconnaissance tools to identify exposed assets, aggressively shrinking the organizational attack surface. Managing security across 200+ endpoints required catalyzing remediation efforts and prioritizing critical findings for rapid patch deployment. To eliminate blind spots, mapped the full network topology to detect unauthorized services, applying strict access controls to close distinct security exposures. This technical data was streamlined into actionable risk reports, translating complex vulnerabilities into clear mitigation steps for leadership.",
      tags: ["OSINT", "Network Security", "Vulnerability Management"]
    }
  ],

  // Keep existing data...
  projects: [
    {
      title: "PhishingEmail",
      type: "Security Tool",
      desc: "An advanced phishing email analysis and detection tool. Check it out on GitHub.",
      link: "https://github.com/rajasr93/PhishingEmail"
    },
    {
      title: "CNN-Backdoor",
      type: "AI Security",
      desc: "Research implementation of a backdoor attack on Convolutional Neural Networks.",
      link: "https://github.com/rajasr93/CNN-Backdoor"
    },
    {
      title: "Pulumi AWS IAM Management script",
      type: "Cloud Security Tool",
      desc: "Automated AWS IAM provisioning and management using Pulumi Infrastructure as Code.",
      link: "https://github.com/rajasr93/Pulumi-AWS-IAM-Auto"
    },
    {
      title: "Web Privacy Analysis tool",
      type: "Privacy tool",
      desc: "lightweight, privacy-focused forensic tool that discloses exactly what the web sees through your browser. See your digital trace instantly, from HTTP headers to WebGL hardware leaks.",
      link: "https://github.com/rajasr93/Web-Privacy-analyzer"
    },
    {
      title: "Black Mamba Polymorphic AI Malware",
      type: "Offensive",
      desc: "Presented and theorized a proof-of-concept AI polymorphic malware utilizing OpenAI API or local LLMs to demonstrate EDR evasion techniques for academic research.",
    },
    {
      title: "Federal InfoSec Training",
      type: "Education",
      desc: "Designed interactive training modules on cybersecurity threats, addressing the root causes of data breaches in government sectors.",
    }
  ],
  education: [
    {
      school: "Drexel University",
      degree: "M.S. in Cybersecurity",
      year: "2023 – 2025"
    },
    {
      school: "Savitribai Phule Pune University",
      degree: "B.Tech in Information Technology",
      year: "2018 – 2022"
    }
  ],
  certifications: [
    {
      name: "CompTIA Security+",
      code: "SY0-701",
      date: "April 2024 – April 2027",
      link: "https://www.credly.com/badges/02540d7d-f387-42eb-96c0-f5d16b0604a8"
    }
  ],
  skills: [
    { category: "Penetration Testing", items: ["Metasploit", "Burp Suite", "Kali Linux", "Nmap"] },
    { category: "Security Operations", items: ["Splunk", "Wireshark", "Shodan"] },
    { category: "Vulnerability Management", items: ["Nessus", "Qualys"] },
    { category: "Cloud Security", items: ["AWS (IAM, Security Hub, CloudTrail)", "Pulumi"] },
    { category: "Programming", items: ["Python", "Bash", "PowerShell", "JavaScript"] },
    { category: "Governance & Frameworks", items: ["NIST CSF", "OWASP Top 10", "MITRE ATT&CK", "ISO 27001"] }
  ]
};