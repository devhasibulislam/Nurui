import { createBrowserRouter } from "react-router-dom";
import accountRoutes from "./accountRoutes";
import dashboardRoutes from "./dashboardRoutes";
import mainRoutes from "./mainRoutes";

const routes = createBrowserRouter([
  mainRoutes,
  accountRoutes,
  dashboardRoutes,
]);

export default routes;
