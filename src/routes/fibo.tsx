import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/fibo")({
  beforeLoad: () => {
    throw redirect({ to: "/natech", statusCode: 301 });
  },
});
