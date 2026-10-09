/**
 * Pilgrim reels.
 *
 * The clips in `public/reviewVideos/` are reviews recorded by pilgrims who
 * travelled with us. Every one is portrait 9:16 (478×850) with the pilgrim's
 * own voice on the audio track, which is why they are shown on the reviews page
 * as a tap-to-play reel wall: vertical frames, one full-width card per swipe on
 * a phone, and sound that starts with the tap.
 *
 * To add another clip:
 *   1. drop the file into `public/reviewVideos/`
 *   2. add an entry below with its length in seconds
 *
 * Delivery note for the owner: `review2.mp4`, `review3.mp4` and `review4.mp4`
 * keep their metadata at the END of the file, so a browser has to read the tail
 * before it can paint a first frame. Remuxing each of them once with
 * `ffmpeg -i in.mp4 -c copy -movflags +faststart out.mp4` makes them start as
 * instantly as `buffe_review.mp4` does — no change to this file is needed.
 */

export type Reel = {
  id: string
  /** Public path, served straight out of `public/`. */
  src: string
  /** Length in seconds, read from the file itself. */
  duration: number
}

export const reels: Reel[] = [
  { id: 'buffe-review', src: '/reviewVideos/buffe_review.mp4', duration: 52 },
  { id: 'review-1', src: '/reviewVideos/review1.mp4', duration: 131 },
  { id: 'review-2', src: '/reviewVideos/review2.mp4', duration: 161 },
  { id: 'review-3', src: '/reviewVideos/review3.mp4', duration: 187 },
  { id: 'review-4', src: '/reviewVideos/review4.mp4', duration: 235 },
]

/** `2:41` — a card reads better in clock time than in seconds. */
export function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.round(seconds % 60)
  return `${mins}:${String(secs).padStart(2, '0')}`
}
