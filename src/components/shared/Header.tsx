export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold text-slate-900">Afghan Geeks</h1>

        <nav className="flex gap-6 text-sm text-slate-600">
          <a href="/">Home</a>
          <a href="/events">Events</a>
          <a href="/about">About</a>
        </nav>
      </div>
    </header>
  );
}
