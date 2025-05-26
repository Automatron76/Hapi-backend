import { userApi } from "./api/users-api.js";
import { candidatesApi } from "./api/candidates-api.js";
import { journalsApi } from "./api/journal-api.js";

export const apiRoutes = [
 
  { method: "GET" as const, path: "/api/users", config: userApi.find },
  { method: "POST" as const, path: "/api/users", config: userApi.create },
  { method: "POST" as const, path: "/api/users/authenticate", config: userApi.authenticate },
  { method: "DELETE" as const, path: "/api/users", config: userApi.deleteAll },
  { method: "GET" as const, path: "/api/users/{id}", config: userApi.findOne },

  { method: "GET" as const, path: "/api/candidates", config: candidatesApi.find },
  { method: "GET" as const, path: "/api/candidates/{id}", config: candidatesApi.findOne },
  { method: "POST" as const, path: "/api/candidates", config: candidatesApi.create },
  { method: "DELETE" as const, path: "/api/candidates/{id}", config: candidatesApi.deleteOne },
  { method: "DELETE" as const, path: "/api/candidates", config: candidatesApi.deleteAll },

  { method: "GET" as const, path: "/api/journals", config: journalsApi.findAll },
  { method: "GET" as const, path: "/api/candidates/{id}/journals", config: journalsApi.findByCandidate },
  
  { method: "POST" as const, path: "/api/candidates/{id}/journals", config: journalsApi.makeJournal },
  { method: "DELETE" as const, path: "/api/journals", config: journalsApi.deleteAll },
];
