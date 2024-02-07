import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const argon2 = require('argon2');
import { db } from "../../../../../lib/db";

export const authOptions = {
    providers:[
        CredentialsProvider({
            name: 'credentials',
            credentials: {},

            async authorize(credentials){
                const {username, password} = credentials;

                try{
                    const user = await db.oneOrNone('SELECT username, email, password FROM users WHERE username = $1', username);

                    if(!user){
                        return null;
                    }

                    const passwordMatch = await argon2.verify(user.password, credentials.password);

                    if(!passwordMatch){
                        return null;
                    }

                    return user;
                }
                catch(error){
                    console.log('Error', error);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            console.log(token, user);
            if(user){
                return{
                    ...token,
                    username: user.username,
                    email: user.email
                }
            }
            return token
        },
        async session({ session, token }) {
            console.log(session, token)
            return{
                ...session,
                user:{
                    ...session.user,
                    username: token.username,
                    email: token.email
                }
            }
        },
    },
    session:{
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};