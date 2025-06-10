import React from "react";

function HomeSectionWrapper({ title, children }) {
  return (
    <section className="p-4 relative">
      <h2 className="text-2xl font-bold text-secondary-light mb-4">{title}</h2>
      {children}
    </section>
  );
}

export default HomeSectionWrapper;
