type Graduate = {
  name: string;
  slug: string;
};

type GraduatesListProps = {
  graduates: Graduate[];
};

export default function GraduatesList({
  graduates,
}: GraduatesListProps) {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12 dark:bg-black">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white">
          Our Graduates
        </h1>

        <p className="mb-8 text-zinc-600 dark:text-zinc-400">
          Meet our graduates.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {graduates.map((graduate) => (
            <div

              key={graduate.name}
              className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h2 className="font-semibold text-zinc-900 dark:text-white">
                {graduate.slug}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}