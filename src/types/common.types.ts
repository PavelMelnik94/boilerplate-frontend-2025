// Type alias for an object with string keys and values of type T
export type ObjectType<T> = Record<string, T>

// Type alias for a tuple with two elements of types T1 and T2
export type TupleType<T1, T2> = [T1, T2]

// Type alias for extracting the keys of an object as a union of string literals
export type KeysType<T> = keyof T

// Type alias for extracting the values of an object as a union
export type ValuesType<T> = T[keyof T]
