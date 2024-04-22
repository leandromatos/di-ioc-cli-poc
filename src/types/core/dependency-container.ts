/**
 * A constructable class.
 *
 * @param T - The type of the class.
 * @returns The constructable class.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- This is a generic type, so we need to use `any`.
export type Constructable<T> = new (...args: any[]) => T

/**
 * A provider can be a constructable class or a function that returns a value.
 *
 * @param T - The type of the provider.
 * @returns The provider.
 */
export type Provider<T> = Constructable<T> | (() => T)
