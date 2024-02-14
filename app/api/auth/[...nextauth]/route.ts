import NextAuth from "next-auth"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clintId: process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECTET,
    })
]
})


export { handler as GET, handler as POST }
