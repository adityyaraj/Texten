"use server"
import { signIn } from "@/lib/auth";
import { signOut } from "@/lib/auth";

export const login = async () =>{
    await signIn("google", { redirectTo: "/home" });
};
export const logout = async () =>{
    await signOut({ redirectTo: "/" });
};