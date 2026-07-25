import bcrypt from "bcryptjs";

const passwort = process.argv[2];

if (!passwort) {
  console.error("Nutzung: npm run hash-password -- <dein-passwort>");
  process.exit(1);
}

bcrypt.hash(passwort, 12).then((hash) => {
  console.log("\nADMIN_PASSWORD_HASH für .env:\n");
  console.log(hash);
  console.log("");
});
