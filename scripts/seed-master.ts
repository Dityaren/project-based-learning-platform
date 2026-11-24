import { hashPassword } from "better-auth/crypto";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { ENV } from "varlock/env";

import { nimToEmail } from "../src/lib/auth/nim.ts";
import { account, user } from "../src/lib/db/schema/auth.schema.ts";

const { MASTER_NAME: name, MASTER_NIM: nim, MASTER_PASSWORD: password } = ENV;

if (!name || !nim || !password) {
  console.error("Isi MASTER_NAME, MASTER_NIM, dan MASTER_PASSWORD di .env.local terlebih dahulu.");
  process.exit(1);
}

if (password.length < 8) {
  console.error("MASTER_PASSWORD minimal 8 karakter.");
  process.exit(1);
}

const client = postgres(ENV.DATABASE_URL);
const db = drizzle({ client });

try {
  const [existing] = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.role, "master"))
    .limit(1);

  if (existing) {
    console.log("Akun master sudah ada. Tidak ada yang diubah.");
  } else {
    const id = crypto.randomUUID();
    const username = nim.trim().toLowerCase();
    const passwordHash = await hashPassword(password);

    await db.transaction(async (tx) => {
      await tx.insert(user).values({
        id,
        name,
        email: nimToEmail(nim),
        emailVerified: true,
        username,
        displayUsername: nim.trim(),
        role: "master",
      });
      await tx.insert(account).values({
        id: crypto.randomUUID(),
        accountId: id,
        providerId: "credential",
        userId: id,
        password: passwordHash,
      });
    });

    console.log("Akun master berhasil dibuat.");
  }
} finally {
  await client.end();
}
