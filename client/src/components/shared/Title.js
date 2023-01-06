import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({ children }) => {
  return <Helmet>{children} | Nurui</Helmet>;
};

export default Title;
