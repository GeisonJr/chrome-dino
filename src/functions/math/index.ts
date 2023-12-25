/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * @version 1.0.0
 * @since 1.0.0
 * @author GeisonJr
 */
export function randomInt(min: number, max: number) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}
