/**
 * Route-level loading UI.
 *
 * Only used for client-side navigations — the first load is covered by the
 * full preloader in the layout. Deliberately light: a full splash on every
 * internal link would be slower and more irritating than the wait it hides.
 */
export default function Loading() {
  return (
    <div className="container-page py-20" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <div className="skeleton h-4 w-32 rounded-full" />
      <div className="skeleton mt-6 h-12 w-3/4 rounded-xl" />
      <div className="skeleton mt-4 h-4 w-full rounded-full" />
      <div className="skeleton mt-2 h-4 w-5/6 rounded-full" />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card-surface p-6">
            <div className="skeleton h-5 w-32 rounded-full" />
            <div className="skeleton mt-4 h-3 w-full rounded-full" />
            <div className="skeleton mt-2 h-3 w-4/5 rounded-full" />
            <div className="skeleton mt-6 h-9 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}