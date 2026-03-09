import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-4xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-600">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Button as="link" href="/" variant="primary" size="md" className="mt-8">
        Back to home
      </Button>
    </div>
  );
}
