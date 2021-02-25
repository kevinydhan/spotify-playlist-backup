/**
 * @see https://stackoverflow.com/a/40076355/11715889
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Record ? DeepPartial<T[P]> : T[P]
}
