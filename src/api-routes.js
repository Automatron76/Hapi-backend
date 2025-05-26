import { userApi } from "./api/users-api.js";
import { candidatesApi } from "./api/candidates-api.js";
import { journalsApi } from "./api/journal-api.js";
export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
    { method: "GET", path: "/api/candidates", config: candidatesApi.find },
    { method: "GET", path: "/api/candidates/{id}", config: candidatesApi.findOne },
    { method: "POST", path: "/api/candidates", config: candidatesApi.create },
    { method: "DELETE", path: "/api/candidates/{id}", config: candidatesApi.deleteOne },
    { method: "DELETE", path: "/api/candidates", config: candidatesApi.deleteAll },
    { method: "GET", path: "/api/journals", config: journalsApi.findAll },
    { method: "GET", path: "/api/candidates/{id}/djournals", config: journalsApi.findByCandidate },
    { method: "POST", path: "/api/candidates/{id}/djournals", config: journalsApi.makeJournal },
    { method: "DELETE", path: "/api/djournals", config: journalsApi.deleteAll },
];
