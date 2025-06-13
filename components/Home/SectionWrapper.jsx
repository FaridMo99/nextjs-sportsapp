import React from "react";

function SectionWrapper({ title, children, home = false, teamName }) {
  return (
    <section className="p-4 relative">
      <h2
        style={{
          color: home
            ? "var(--secondary-light)"
            : `var(--${teamName[1]}-second`,
        }}
        className="text-2xl font-bold text-secondary-light mb-4"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export default SectionWrapper;
