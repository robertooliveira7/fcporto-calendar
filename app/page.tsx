import { SITE } from "@/constants/site";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-5xl font-bold tracking-tight text-slate-900">
        {SITE.name}
      </h1>

      <p className="mt-4 text-xl text-slate-600">
        Season {SITE.season}
      </p>

      <p className="mt-8 max-w-xl text-slate-500">
        {SITE.description}
      </p>
    </main>
  );
}