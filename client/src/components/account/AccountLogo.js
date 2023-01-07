import React from "react";
import { Link } from "react-router-dom";

const AccountLogo = () => {
  return (
    <Link to="/">
      <img
        src="/logo.png"
        alt="canim logo"
        loading="lazy"
        className="w-28 object-cover object-center"
      />
    </Link>
  );
};

export default AccountLogo;
