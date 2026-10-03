/**
 * Renders a JSON-LD graph.
 *
 * `JSON.stringify` output goes into a script tag, so `<` is escaped to `\u003c`.
 * Without that, a stray `<` inside any string (a quote from a review, for
 * instance) can terminate the script element early — a real injection vector
 * once review content becomes user-supplied.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // `<` is escaped so a quote inside review text can never terminate the
        // script element early.
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}