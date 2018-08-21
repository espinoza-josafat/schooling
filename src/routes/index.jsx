import Account from "../layouts/Account.jsx";
import Dashboard from "../layouts/Dashboard.jsx";

var indexRoutes = [
  { path: "/account", name: "Account", component: Account },
  { path: "/", name: "Home", component: Dashboard }
];

export default indexRoutes;
