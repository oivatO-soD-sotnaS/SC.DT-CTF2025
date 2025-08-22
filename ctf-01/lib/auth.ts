import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import Database from "better-sqlite3";
 
export const auth = betterAuth({
    database: new Database("./sqlite.db"),
    emailAndPassword: {
        enabled: true, 
    },
    plugins: [nextCookies()],
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24 // 1 day (every 1 day the session expiration is updated)
    }
})
