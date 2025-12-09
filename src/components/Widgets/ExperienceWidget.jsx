import React from 'react';

const ExperienceWidget = () => {
  const experiences = [
    {
      title: "Cloud Security Engineer",
      company: "Saayam-for-All",
      description: "I served as the primary architect for the organization’s cloud defense strategy, focusing on the hardening of AWS infrastructure. My work centered on enforcing strict Identity and Access Management (IAM) governance to ensure a principle of least privilege across all development environments. By leveraging serverless automation and Python scripting, I engineered self-healing workflows that could detect and auto-remediate misconfigurations in real-time, significantly reducing the window of exposure for critical data assets."
    },
    {
      title: "AI Cybersecurity Research Co-op",
      company: "Drexel University",
      description: "Operating at the cutting edge of Adversarial Machine Learning, I conducted extensive research into the security implications of Large Language Models (LLMs). My role involved utilizing PyTorch to develop and simulate sophisticated attack vectors, specifically targeting prompt injection vulnerabilities and \"jailbreak\" scenarios. This deep vulnerability analysis provided critical data on how generative AI systems can be manipulated, contributing to the development of robust defense mechanisms against emerging AI-driven threats."
    },
    {
      title: "Security Engineer",
      company: "SK Enterprises",
      description: "In this role, I executed a comprehensive security strategy focused on network integrity and attack surface reduction. I was responsible for the continuous monitoring of network traffic patterns to identify anomalies indicative of latent threats. I orchestrated the deployment of rigorous access controls and collaborated with cross-functional teams to close security gaps in legacy systems, ensuring that the organization’s internal architecture remained resilient against both external penetration attempts and lateral movement."
    }
  ];

  return (
    <div className="animate-fade-in space-y-8 font-mono">
      {experiences.map((job, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
          
          {/* Job Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b border-gray-100 pb-2">
            <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
            <span className="text-blue-600 font-semibold">{job.company}</span>
          </div>

          {/* Job Description */}
          <p className="text-gray-700 leading-relaxed text-justify text-sm md:text-base">
            {job.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ExperienceWidget;
