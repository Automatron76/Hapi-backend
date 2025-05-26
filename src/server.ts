import Hapi, { Server } from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Cookie from "@hapi/cookie";
import Handlebars from "handlebars";

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { accountsController } from "./controllers/accounts-controller.js";
import { webRoutes } from "./web-routes.js";
import { connectDb } from "./models/db.js";

import { apiRoutes } from "./api-routes.js";
import { validate } from "./api/jwt-utils.js";
import * as jwt from "hapi-auth-jwt2";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function importEnvs() {
  const result = dotenv.config();
  if (result.error) {
    console.log(result.error.message);
    process.exit(1);
  }
}

async function initPlugins(server: Server) {
  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);
  await server.register(jwt);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });

 

 
  

}

function initSecurityStrategies(server: Server) {
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });
  server.auth.default("session");

  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] },
  });
}

async function init() {
  importEnvs();
  const server = Hapi.server({
    port: process.env.PORT || 4000,
    routes: { cors: {
      origin: ["http://localhost:5173"],
      credentials: true,
      additionalHeaders: ["cache-control", "x-requested-with", "authorization"]
    } },
  });
  await initPlugins(server);
  initSecurityStrategies(server);
  connectDb("mongo");
  server.route(webRoutes);
  console.log("Registered API routes:",apiRoutes.map(r=> r.path))
  server.route(apiRoutes);
  server.route({
    method: "GET",
    path: "/api/hello",
    handler: () => {
      return "HELLO FROM HAPI";
    },
  })
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});





await init();
