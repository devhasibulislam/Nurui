import React, { useState } from "react";
import { Link } from "react-router-dom";

const Plan = () => {
  const [planType, setPlanType] = useState("monthly");

  const plans = [
    {
      name: "Free",
      price: {
        monthly: 0,
        yearly: 0,
      },
      detail:
        "Sign up now to be notified of new content and support Nurui, help keep this site independent.",
      features: [
        "Full access to posts for subscribers",
        "Weekly email newsletter",
      ],
      colors: ["#23bd38", "#41eba9"],
    },
    {
      name: "Premium",
      price: {
        monthly: 7,
        yearly: 79,
      },
      detail: "Get access to the library of paid-members only posts.",
      features: [
        "Full access to premium posts",
        "Weekly email newsletter",
        "Support indie publishing",
        "Simple, secure card payment",
      ],
      colors: ["#e77842", "#f7c068"],
    },
    {
      name: "Premium Plus",
      price: {
        monthly: 14,
        yearly: 149,
      },
      detail: "Get access to the everything.",
      features: [
        "Full access to premium plus posts",
        "Members-only Q&A",
        "Weekly email newsletter",
        "Support indie publishing",
        "Simple, secure card payment",
      ],
      colors: ["#b53cff", "#f952ff"],
    },
  ];

  return (
    <section className="max-w-7xl mx-auto bg-white relative -mt-20 rounded-2xl p-12 shadow mb-12">
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2 items-center">
          <h1 className="capitalize font-bold text-lg">
            Choose your plan: <span className="text-slate-500">{planType}</span>
          </h1>
          <div className="flex gap-x-4">
            <button className="btn" onClick={() => setPlanType("monthly")}>
              Monthly
            </button>
            <button
              className="btn-secondary"
              onClick={() => setPlanType("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 text-center">
          {plans.map((plan, index) => (
            <div
              key={index}
              style={{
                backgroundImage: `linear-gradient(242deg, ${plan.colors[1]}, ${plan.colors[0]})`,
              }}
              className="text-white flex flex-col gap-y-4 rounded-2xl px-6 py-12 hover:-translate-y-2 hover:-translate-x-2 transition-all duration-200"
            >
              <h2 className="text-3xl font-bold">{plan.name}</h2>
              <h1 className="text-xl font-medium">
                $
                <span className="text-6xl font-bold">
                  {plan.price[planType]}
                </span>
              </h1>
              <p className="text-slate-100">{plan.detail}</p>
              <ul>
                {plan.features.map((feature, index1) => (
                  <li key={index1}>{feature}</li>
                ))}
              </ul>
              <button className="bg-white w-fit text-black px-4 py-2 mx-auto rounded-3xl mt-auto hover:bg-black hover:text-white transition-all">
                Subscribe Now
              </button>
            </div>
          ))}
        </div>

        <p className="text-center">
          Already have an account? <Link to="/account/sign-in" className="underline">Sign in</Link>
        </p>
      </div>
    </section>
  );
};

export default Plan;
