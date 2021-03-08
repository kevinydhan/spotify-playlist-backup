/**
 * Recursively makes all properties optional.
 *
 * @template BaseRecord - Base object.
 * @template Key - Object's key.
 *
 * @see https://stackoverflow.com/a/40076355/11715889
 */
export type DeepPartial<BaseRecord> = {
  [Key in keyof BaseRecord]?: BaseRecord[Key] extends Record
    ? DeepPartial<BaseRecord[Key]>
    : BaseRecord[Key]
}

/**
 * Extracts the member type of a promise.
 *
 * @example
 * type ExamplePromise = Promise<string>
 * type Data = PromiseData<ExamplePromise>
 * // type Data = string
 *
 * @template BasePromise
 * @template Data - Data returned from the promise.
 */
export type PromiseData<BasePromise> = BasePromise extends Promise<infer Data>
  ? Data
  : unknown

/**
 * Modifies the existing properties' types from `BaseType`.
 *
 * @template BaseType
 * @template PropertiesToModify - Set of properties with updated types.
 */
export type Modify<BaseType, PropertiesToModify> = Omit<
  BaseType,
  keyof PropertiesToModify
> &
  PropertiesToModify
