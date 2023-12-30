import bcrypt from "bcrypt";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prisma";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "example@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = await prisma.user.findUnique({ where: { email: credentials.email } })

                if (user) {
                    const matchPassword = bcrypt.compareSync(credentials.password, user.password);
                    if (!matchPassword) throw new Error("Wrong password");

                    return {
                        id: user.id,
                        name: user.username,
                        email: user.email,
                    }
                } else {
                    throw new Error("User not found")
                }
            },
        })
    ],
    pages: {
        signIn: "/auth/signin",
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };