import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { LoaderCircleIcon } from "lucide-react";

import { Button } from "#/components/ui/button.tsx";
import { Input } from "#/components/ui/input.tsx";
import { Label } from "#/components/ui/label.tsx";
import { toast } from "#/components/ui/toast.tsx";
import { authClient } from "#/lib/auth/auth-client.ts";

export const Route = createFileRoute("/_guest/login")({
  component: LoginForm,
});

function getLoginErrorMessage(status: number) {
  if (status === 401) return "NIM atau kata sandi salah.";
  if (status === 429) return "Terlalu banyak percobaan. Coba lagi beberapa saat lagi.";
  return "Terjadi kesalahan saat masuk. Silakan coba lagi.";
}

function LoginForm() {
  const { redirectUrl } = Route.useRouteContext();

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: async (data: { username: string; password: string }) =>
      await authClient.signIn.username(
        {
          ...data,
          callbackURL: redirectUrl,
        },
        {
          onError: ({ error }) => {
            toast.add({ type: "error", description: getLoginErrorMessage(error.status) });
          },
          // better-auth triggers a hard navigation on login,
          // so we don't have to revalidate & navigate ourselves
        },
      ),
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;

    const formData = new FormData(e.currentTarget);
    const username = formData.get("nim");
    const password = formData.get("password");

    if (typeof username !== "string" || typeof password !== "string" || !username || !password)
      return;

    loginMutate({ username: username.trim(), password });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Selamat datang kembali</h1>
        <p className="text-sm text-muted-foreground">
          Masukkan NIM dan kata sandi Anda untuk mengakses akun.
        </p>
      </div>
      <form onSubmit={handleSubmit} aria-busy={isPending}>
        <div className="flex flex-col gap-5">
          <div className="grid gap-2">
            <Label htmlFor="nim">NIM</Label>
            <Input
              id="nim"
              name="nim"
              type="text"
              inputMode="numeric"
              placeholder="Masukkan NIM"
              autoComplete="username"
              readOnly={isPending}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Kata sandi</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Masukkan kata sandi"
              autoComplete="current-password"
              readOnly={isPending}
              required
            />
          </div>
          <Button type="submit" className="mt-2 w-full" size="lg" disabled={isPending}>
            {isPending && <LoaderCircleIcon className="animate-spin" aria-hidden="true" />}
            {isPending ? "Sedang masuk..." : "Masuk"}
          </Button>
        </div>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Belum memiliki akun? Hubungi guru atau administrator Anda.
      </p>
    </div>
  );
}
