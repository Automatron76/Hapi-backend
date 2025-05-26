import { db } from "../models/db.js";
export const accountsController = {
    index: {
        auth: false,
        handler: async function (request, h) {
            return h.view("main", { title: "Welcome to journal" });
        },
    },
    showSignup: {
        auth: false,
        handler: async function (request, h) {
            return h.view("signup", { title: "Sign up for Donation" });
        },
    },
    signup: {
        auth: false,
        handler: async function (request, h) {
            const user = request.payload;
            await db.userStore.add(user);
            return h.redirect("/");
        },
    },
    showLogin: {
        auth: false,
        handler: async function (request, h) {
            return h.view("login", { title: "Login to Journal" });
        },
    },
    login: {
        auth: false,
        handler: async function (request, h) {
            const { email, password } = request.payload;
            const user = await db.userStore.findBy(email);
            if (!user || user.password !== password) {
                return h.redirect("/");
            }
            request.cookieAuth.set({ id: user._id });
            return h.redirect("/journal");
        },
    },
    logout: {
        handler: async function (request, h) {
            request.cookieAuth.clear();
            return h.redirect("/");
        },
    },
    async validate(request, session) {
        const user = await db.userStore.findOne(session.id);
        if (!user) {
            return { isValid: false };
        }
        return { isValid: true, credentials: user };
    },
};
