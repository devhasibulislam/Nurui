import React from "react";

const Banner = () => {
  return (
    <section
      style={{ backgroundImage: "url(/membership.jpg)" }}
      className="bg-no-repeat bg-cover bg-center lg:h-[400px] md:h-[300px] h-[200px] flex flex-col justify-center items-center rounded-xl relative z-0"
    >
      <div className="absolute top-0 left-0 bg-black opacity-50 -z-10 h-full w-full rounded-xl" />
      <article className="z-10 text-white text-center flex flex-col gap-y-4">
        <h1 className="text-5xl font-bold">Membership</h1>
        <p className="lg:font-semibold md:font-semibold font-medium md:text-xl text-lg">
          Unlock full access to Nurui and see the entire{" "}
          <br className="lg:block md:block hidden" /> library of subscribers
          only content & updates
        </p>
      </article>
    </section>
  );
};

export default Banner;
