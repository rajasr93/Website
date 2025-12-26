import React from 'react';

const AboutWidget = () => {
  return (
    <div className="animate-fade-in font-mono text-gray-700 space-y-6 leading-relaxed text-justify">

      {/* Section 1 */}
      <p>
        My path into cybersecurity wasn't linear; it was a recursive loop of curiosity. During my time at <span className="font-bold">Drexel University</span>, I realized that engineering reliable software requires a fundamental understanding of failure states. That insight shifted my focus from simply building applications to securing the infrastructure that powers them. I became obsessed with the logic behind the code—analyzing why systems fracture under pressure and how to design architectures that are resilient by default.
      </p>

      {/* Section 2 */}
      <p>
        I started my career grappling with the tangible chaos of general IT and network hardware, which gave me a necessary respect for the physical layer of technology. As I pivoted toward <span className="font-bold">Security Engineering</span>, I translated that hands-on discipline into the cloud. I learned that modern security isn't just about configuring firewalls; it is about orchestration, automating compliance, and understanding the behavioral psychology behind every attack vector.
      </p>

      {/* Section 3 */}
      <p>
        Today, my work exists at the volatile intersection of infrastructure and innovation. Whether I am hardening <span className="font-bold">cloud environments</span> or dissecting <span className="font-bold">adversarial AI</span> models, I approach security as an engineering problem rather than a checklist. I don't just want to patch vulnerabilities; I want to engineer environments where those vulnerabilities are statistically unlikely to exist.
      </p>
    </div>
  );
};

export default AboutWidget;
