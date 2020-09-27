export default function cap(min: number, val: number, max: number): number {
    return Math.min(Math.max(min, val), max);
}
