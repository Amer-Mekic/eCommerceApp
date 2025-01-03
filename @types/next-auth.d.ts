import { DefaultSession } from "next-auth"
declare module "next-auth"{
    interface Session {
        user: { // User session does not have id, so we have to add it in typescript like this
            id: string,
        } & DefaultSession["user"]  // but keep all other user session data, 
        // by making intersection with default session from next auth
    }
}