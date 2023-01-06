import Account from "../layout/account/Account";
import ForgotPassword from "../page/main/ForgotPassword";
import Signin from "../page/main/Signin";
import Signup from "../page/main/Signup";

const accountRoutes = {
  path: "/account",
  element: <Account />,
  children: [
    {
      path: "sign-in",
      element: <Signin />,
    },
    {
      path: "sign-up",
      element: <Signup />,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
    },
  ],
};

export default accountRoutes;
