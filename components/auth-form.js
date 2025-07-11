"use client";
import Link from "next/link";
import { useFormState } from "react-dom";

import { signup } from "@/actions/auth-actions";

export default function AuthForm( {mode} ) {
  const [formState, formAction] = useFormState(signup, {});
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>

      {formState.errors && (
        <ul id="form-errors">
          {Object.keys(formState.errors).map((error) => (
            <li key={error}>{formState.errors[error]}</li>
          ))}
        </ul>
      )}

      <p>
        <button type="submit">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </p>
      <p>
        {/* If the mode is 'login', show the link to create an account, otherwise show the link to login */}
        {mode === "login" && (
          <Link href="/?mode=signup">Create an account</Link>
        )}
        {/* If the mode is 'signup', show the link to login, otherwise show the link to create an account */}
        {mode === "signup" && (
          <Link href="/?mode=login">Login with existing account.</Link>
        )}
      </p>
    </form>
  );
}
