import "@tanstack/react-start/server-only";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { APIError } from "better-auth/api";
import { betterAuth } from "better-auth/minimal";
import { username } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { ENV } from "varlock/env";

import { db } from "#/lib/db/index.ts";
import * as schema from "#/lib/db/schema/index.ts";
import { useLogger } from "#/lib/logger.server.ts";

export const auth = betterAuth({
  baseURL: ENV.VITE_BASE_URL,
  onAPIError: {
    // Better Auth turns thrown errors into responses, so record unexpected ones on the wide event.
    // Providing this hook replaces Better Auth's own error logging.
    onError: (error) => {
      if (error instanceof APIError && error.status !== "INTERNAL_SERVER_ERROR") return;
      useLogger().error(error instanceof Error ? error : String(error));
    },
  },
  telemetry: {
    enabled: false,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  // username() lets accounts sign in with NIM + password. The NIM is stored as `username`.
  // https://better-auth.com/docs/plugins/username
  plugins: [username(), tanstackStartCookies()],

  // https://better-auth.com/docs/concepts/session-management#session-caching
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  // https://better-auth.com/docs/concepts/database#extending-core-schema
  user: {
    additionalFields: {
      // input: false stops clients from choosing their own role.
      role: { type: "string", required: false, defaultValue: "student", input: false },
    },
  },

  // https://better-auth.com/docs/authentication/email-password
  emailAndPassword: {
    enabled: true,
    // TODO: public signup stays open until class-token registration replaces it.
    // Then set disableSignUp: true and create accounts through a server function.
  },

  advanced: {
    database: {
      // https://better-auth.com/docs/adapters/drizzle#joins
      joins: true,
    },
  },
});
