/**
 * Return a number as close as possible to `val` while being at least `min` at
 * at most `max`
 *
 * @param min - minimum
 * @param val - target value
 * @param max - maximum
 * @returns `val`, if it's between `min` and `max`, `min` if `val < min`, and
 * `max` if `val > max`
 * @example
 * ```ts
 * cap(0, 3, 5) // 3
 * cap(0, -2, 5) // 0
 * cap(0, 7, 5) // 5
 * ```
 */
export default function cap(min: number, val: number, max: number): number {
	return Math.min(Math.max(min, val), max);
}
