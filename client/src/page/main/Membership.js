import React from "react";
import Banner from "../../components/membership/Banner";
import Plan from "../../components/membership/Plan";
import Footer from "../../components/shared/Footer";

const Membership = () => {
  return (
    <section className="container mx-auto lg:px-0 px-4">
      <Banner />
      <Plan />
      <Footer />
    </section>
  );
};

export default Membership;
