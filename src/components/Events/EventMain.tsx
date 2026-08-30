// app/events/page.tsx

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
};

const events: Event[] = [
  {
    id: 1,
    title: "Introduction to React",
    date: "September 10, 2026",
    time: "7:00 PM",
    description: "Learn the basics of React and how components work.",
  },
  {
    id: 2,
    title: "JavaScript Workshop",
    date: "September 15, 2026",
    time: "6:00 PM",
    description: "Practice JavaScript with simple exercises.",
  },
  {
    id: 3,
    title: "Career in Web Development",
    date: "September 20, 2026",
    time: "7:00 PM",
    description: "Learn about opportunities in web development.",
  },
];

export default function EventMain() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Upcoming Events</h1>

          <p className="mt-2 text-slate-600">
            Join our upcoming workshops and learning sessions.
          </p>
        </div>

        {/* Events */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {event.title}
              </h2>

              <div className="mt-3 text-sm text-slate-500">
                <p>📅 {event.date}</p>
                <p className="mt-1">🕒 {event.time}</p>
              </div>

              <p className="mt-4 text-sm text-slate-600">{event.description}</p>

              <button className="mt-5 w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                View Event
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
