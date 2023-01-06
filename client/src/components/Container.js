import React from "react";

const Container = ({ children }) => {
  return (
    <section className="mx-auto max-w-7xl lg:px-0 px-4">{children}</section>
  );
};

export default Container;
