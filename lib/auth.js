import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { cookies } from "next/headers";

import db from "./db";

const adapter = new BetterSqlite3Adapter(db, {
  user: "users", // Table name for users
  session: "sessions", // Table name for sessions
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false, // Session cookies will not expire
    attributes: {
      secure: process.env.NODE_ENV === "production", // Secure cookies in production
    },
  },
});

export async function createAuthSession(userId) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}

export async function verifyAuth() {
  // Verify if the user is authenticated
  const sessionCookie = cookies().get(lucia.sessionCookieName);

  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }
  const sessionId = sessionCookie.value;
  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      // Check if the session is fresh
      // If the session is fresh, update the session cookie
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
    }
  } catch {}

  lucia.createSessionCookie(result.session.id);
  return result; // Return the user and session information
}
