"use server"

import { auth } from "@/lib/auth"

export const signIn = async (email: string, password: string) => {
    return await auth.api.signInEmail({
        body: {
            email,
            password
        }
    })
}

export const signUp = async (email: string, password: string, name: string) => {
    return await auth.api.signUpEmail({
        body: {
            email,
            password,
            name
        }
    })
}