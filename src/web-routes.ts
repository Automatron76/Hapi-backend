import { accountsController } from "./controllers/accounts-controller.js";
import { svelteController } from "./controllers/svelte-controller.js";

export const webRoutes = [
  { method: "GET" as const, path: "/", config: accountsController.index },
  { method: "GET" as const, path: "/signup", config: accountsController.showSignup },
  { method: "GET" as const, path: "/login", config: accountsController.showLogin },
  { method: "GET" as const, path: "/logout", config: accountsController.logout },
  { method: "POST" as const, path: "/register", config: accountsController.signup },
  { method: "POST" as const, path: "/authenticate", config: accountsController.login },

  { method: "GET" as const, path: "/journal", config: svelteController.index },
  { method: "POST" as const, path: "/journal", config: svelteController.index },
  { method: "GET" as const, path: "/report", config: svelteController.index },

  {
    method: "GET" as const,
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public",
      },
    },
    options: { auth: false as const },
  },
];
