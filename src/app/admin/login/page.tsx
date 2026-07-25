import { LoginForm } from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">
        Admin-Login
      </h1>
      <LoginForm />
    </div>
  );
}
