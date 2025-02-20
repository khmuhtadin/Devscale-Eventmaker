"use client";
import { Button, Input } from "@heroui/react";
import { useActionState } from "react";
import { loginAction } from "./action";
import { OauthButton } from "../_components/oauthButton";
import Link from "next/link";

export default function Page() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <main className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <p>Login to your account</p>
      </section>
      <section className="space-y-2">
        <form className="space-y-5" action={formAction}>
          <Input placeholder="email" name="email" variant="underlined" />
          <Input placeholder="password" name="password" variant="underlined" />
          <Button
            isLoading={pending}
            type="submit "
            fullWidth
            color="primary"
            radius="sm"
          >
            Login
          </Button>
        </form>
        {state?.status === "error" && (
          <div className="text-center text-rose-600 bg-rose-50 p-2 rounded-lg">
            {state.message}
          </div>
        )}
        {state?.status === "success" && (
          <div className="text-center text-emerald-600 bg-emerald -50 p-2 rounded-lg">
            {state.message}
          </div>
        )}
      </section>
      <section>
        <OauthButton />
      </section>
      <section>
        <p>
          Don't have an account?{" "}
          <Link href="/register" className="font-medium">
            Register
          </Link>
        </p>
      </section>
    </main>
  );
}
