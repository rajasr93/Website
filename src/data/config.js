/* src/data/config.js */
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
    greeting: "System initialized. Welcome to the terminal.",
    bio: "I’m Rajas Ronghe, a security engineer who believes that the best way to build a secure system is to understand exactly how to breakXZ it. I spend my time architecting cloud defenses, researching the vulnerabilities of AI, and occasionally staring at the night sky.",
    instruction: "This interface is designed to let you query my background directly from the source.",
    commands: [
      { cmd: "about", desc: "Background & Philosophy" },
      { cmd: "experience", desc: "Professional History" },
      { cmd: "projects", desc: "Research & Payloads" },
      { cmd: "skills", desc: "Technical Arsenal" },
      { cmd: "education", desc: "Credentials" }
    ]
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
      desc: "I serve as the primary architect for the organization’s cloud defense strategy, focusing on the hardening of AWS infrastructure. My work centers on enforcing strict Identity and Access Management (IAM) governance to ensure a principle of least privilege. By leveraging serverless automation and Python scripting, I engineer self-healing workflows that detect and auto-remediate misconfigurations in real-time, significantly reducing the window of exposure for critical data assets.",
      tags: ["AWS", "Python", "IaC", "SOC 2"]
    },
    {
      company: "Drexel University",
      role: "AI Cybersecurity Research Co-op",
      period: "Oct 2024 – Dec 2024",
      location: "Philadelphia, PA",
      desc: "Operating at the cutting edge of Adversarial Machine Learning, I conducted extensive research into the security implications of Large Language Models (LLMs). My role involved utilizing PyTorch to develop and simulate sophisticated attack vectors, specifically targeting prompt injection vulnerabilities. This deep vulnerability analysis provided critical data on how generative AI systems can be manipulated, contributing to the development of robust defense mechanisms.",
      tags: ["Adversarial ML", "AI Security", "Research"]
    },
    {
      company: "SK Enterprises",
      role: "Security Engineer",
      period: "Jan 2022 – Jan 2023",
      location: "India",
      desc: "Executed a comprehensive security strategy focused on network integrity and attack surface reduction. I was responsible for the continuous monitoring of network traffic patterns to identify anomalies indicative of latent threats. I orchestrated the deployment of rigorous access controls and collaborated with cross-functional teams to close security gaps in legacy systems, ensuring the architecture remained resilient against lateral movement.",
      tags: ["Phishing Sim", "Metasploit", "Burp Suite"]
    }
  ],

  // Keep existing data...
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
      year: "2023 – 2025"
    },
    {
      school: "Savitribai Phule Pune University",
      degree: "B.Tech in Information Technology",
      year: "2018 – 2022"
    }
  ],
  skills: [
    { category: "Security Tools", items: ["Metasploit", "Burp Suite", "Nessus", "Qualys", "Wireshark", "Nmap", "Shodan", "Splunk", "Kali Linux"] },
    { category: "Cloud & Infrastructure", items: ["AWS (IAM, Security Hub, CloudTrail)", "Pulumi", "IaC"] },
    { category: "Programming", items: ["Python", "Bash", "PowerShell", "JavaScript", "SQL", "Java"] },
    { category: "Frameworks", items: ["NIST CSF", "OWASP Top 10", "MITRE ATT&CK", "ISO 27001"] }
  ]
};