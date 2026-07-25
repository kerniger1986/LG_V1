import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-Mail", type: "email" },
        password: { label: "Passwort", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email;
        const password = credentials?.password;
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (
          typeof email !== "string" ||
          typeof password !== "string" ||
          !adminEmail ||
          !adminPasswordHash
        ) {
          console.log("[auth-debug] fehlt:", {
            hatEmailInput: typeof email === "string",
            hatPasswortInput: typeof password === "string",
            hatAdminEmailEnv: Boolean(adminEmail),
            hatAdminHashEnv: Boolean(adminPasswordHash),
          });
          return null;
        }

        const emailPasst =
          email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
        const gueltig = await bcrypt.compare(password, adminPasswordHash);

        console.log("[auth-debug] vergleich:", {
          emailPasst,
          passwortPasst: gueltig,
          hashLaenge: adminPasswordHash.length,
          hashPrefix: adminPasswordHash.slice(0, 7),
        });

        if (!emailPasst || !gueltig) return null;

        return { id: "admin", email: adminEmail };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
});
