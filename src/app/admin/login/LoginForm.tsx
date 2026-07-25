"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export function LoginForm() {
  const [fehler, formAction, pending] = useActionState(
    loginAction,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label className="block text-base font-medium text-slate-800 mb-1" htmlFor="email">
          E-Mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-base outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <div>
        <label
          className="block text-base font-medium text-slate-800 mb-1"
          htmlFor="password"
        >
          Passwort
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-base outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
        />
      </div>
      {fehler && (
        <p className="text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-sm">
          {fehler}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-blue-700 px-4 py-2.5 text-base font-medium text-white hover:bg-blue-800 disabled:opacity-60"
      >
        {pending ? "Anmelden …" : "Anmelden"}
      </button>
    </form>
  );
}
