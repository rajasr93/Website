/* src/data/config.js */
export const config = {
  profile: {
    name: "Rajas Ronghe",
    role: "Security Engineer",
    email: "rajasr9@outlook.com",
    phone: "+1 (267) 366-3719",
    location: "Philadelphia, PA",
    linkedin: "https://linkedin.com/in/rajas-ronghe93/", // Update if needed based on standard URL pattern
    github: "https://github.com/rajasr93"      // Update if needed
  },
  // "About" sourced from Key Skills and Certifications [cite: 6, 43, 44]
  about: {
    bio: "Cloud Security Engineer specializing in Vulnerability Management, Penetration Testing, and Security Automation. Expertise in implementing NIST CSF and OWASP standards across cloud and on-premise infrastructures. Currently pursuing AWS Certified Security Specialist certification.",
    certifications: [
      "CompTIA Security+ SY0-701",
      "AWS Certified Security Specialist (In Progress)"
    ]
  },
  // Skills sourced exactly from resume [cite: 4, 5, 6]
  skills: [
    { category: "Security Tools", items: ["Metasploit", "Burp Suite", "Nessus", "Qualys", "Wireshark", "Nmap", "Shodan", "Splunk", "tcpdump", "Kali Linux"] },
    { category: "Cloud & Infrastructure", items: ["AWS (IAM, Security Hub, CloudTrail)", "Pulumi", "Infrastructure as Code"] },
    { category: "Programming", items: ["Python", "Bash", "PowerShell", "JavaScript", "SQL", "Java"] },
    { category: "Frameworks & Standards", items: ["NIST CSF", "OWASP Top 10", "MITRE ATT&CK", "MITRE D3FEND", "PCI-DSS", "GDPR", "ISO 27001"] }
  ],
  // Experience points combined into paragraphs [cite: 11, 12, 13, 14, 18, 19, 20, 26, 27, 28, 29, 33, 34, 35, 36]
  experience: [
    {
      company: "Saayam-for-All",
      role: "Cloud Security Engineer",
      period: "Feb 2025 – Present",
      location: "San Jose, CA",
      desc: "Engineered automated IAM provisioning systems using Python and Infrastructure as Code to reduce manual configuration errors by 85%. Orchestrated standardized security policy validation frameworks for AWS infrastructure ensuring 100% compliance across ecosystems. Streamlined credential lifecycle management workflows to decrease administrative overhead by 70% while implementing secure secrets management architecture to support SOC 2 compliance for 50+ internal users.",
      tags: ["AWS", "Python", "IaC", "SOC 2"]
    },
    {
      company: "Drexel University",
      role: "AI Cybersecurity Research Co-op",
      period: "Oct 2024 – Dec 2024",
      location: "Philadelphia, PA",
      desc: "Pioneered adversarial machine learning testing methodologies against neural networks, achieving a 92% attack success rate to validate model robustness. Analyzed vulnerability patterns within image classification systems, documenting 18% accuracy degradation to inform resilient defense mechanisms, and presented findings to 30+ stakeholders to influence future AI defense strategy.",
      tags: ["Adversarial ML", "AI Security", "Research"]
    },
    {
      company: "SK Enterprises",
      role: "Security Engineer",
      period: "Jan 2022 – Jan 2023",
      location: "India",
      desc: "Spearheaded organizational phishing simulation campaigns utilizing behavioral analysis to reduce employee susceptibility by 32%. Executed comprehensive vulnerability assessments using Metasploit and OWASP standards to remediate critical flaws, while optimizing automated testing workflows with Burp Suite to accelerate threat detection by 40%. Consolidated security monitoring operations for 115 endpoints to enhance incident response velocity.",
      tags: ["Phishing Sim", "Metasploit", "Burp Suite"]
    },
    {
      company: "Digital Pass",
      role: "Cybersecurity Analyst",
      period: "Jan 2021 – Dec 2021",
      location: "India",
      desc: "Leveraged OSINT reconnaissance tools to identify exposed assets, shrinking the organizational attack surface by 32%. Catalyzed vulnerability remediation efforts across 200+ endpoints and mobilized network topology mapping to eliminate 12 distinct security exposures. Streamlined risk reporting processes to translate technical vulnerabilities into actionable mitigation steps for leadership.",
      tags: ["OSINT", "Network Security", "Risk Assessment"]
    }
  ],
  projects: [
    {
      title: "Black Mamba AI-Keylogger",
      type: "Offensive",
      desc: "Developed a proof-of-concept AI-keylogger utilizing OpenAI API to demonstrate EDR evasion techniques for academic research.",
      link: "#"
    },
    {
      title: "Federal InfoSec Training",
      type: "Education",
      desc: "Designed interactive training modules on cybersecurity threats, addressing the root causes of data breaches in government sectors.",
      link: "#"
    },
    {
      title: "Web Privacy Analysis",
      type: "Research",
      desc: "Evaluated privacy-enhancing technologies across major browsers, assessing tracking mechanisms and compliance with GDPR/CCPA standards.",
      link: "#"
    }
  ],
  education: [
    {
      school: "Drexel University",
      degree: "M.S. in Cybersecurity",
      year: "2023 – 2025" // Updated based on 'Expected Dec 2025' [cite: 52]
    },
    {
      school: "Savitribai Phule Pune University",
      degree: "B.Tech in Information Technology",
      year: "2018 – 2022"
    }
  ]
};
