import React from "react";

const NotFound = () => {
  return (
    <section className="h-full w-full overflow-hidden p-0 m-0 flex justify-center items-center">
      <img
        src="/notfound.svg"
        alt="not found"
        loading="lazy"
        className="max-w-full "
      />
    </section>
  );
};

export default NotFound;
