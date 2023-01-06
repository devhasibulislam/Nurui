import React from "react";
import { Link } from "react-router-dom";

const AccountLogo = () => {
  return (
    <Link to="/">
      <img
        src="/nurui.svg"
        alt="nurui logo"
        loading="lazy"
        className="w-24 object-cover object-center"
      />
    </Link>
  );
};

export default AccountLogo;
