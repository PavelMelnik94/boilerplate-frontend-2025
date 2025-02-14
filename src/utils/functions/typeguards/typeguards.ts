export const isString = (value: unknown): value is string => typeof value === 'string';

export const isNumber = (value: unknown): value is number => typeof value === 'number' && !Number.isNaN(value);

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

export const isArray = <T = unknown>(value: unknown): value is Array<T> => Array.isArray(value);

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const isFunction = (value: unknown): value is Function => typeof value === 'function';

export const isDate = (value: unknown): value is Date => value instanceof Date && !Number.isNaN(value.getTime());

export const isPromise = <T = unknown>(value: unknown): value is Promise<T> =>
  value instanceof Promise || (isObject(value) && isFunction((value as any).then));

export const isNull = (value: unknown): value is null => value === null;

export const isUndefined = (value: unknown): value is undefined => value === undefined;

export const isNullOrUndefined = (value: unknown): value is null | undefined => isNull(value) || isUndefined(value);

export const hasProperty = <T extends object, K extends PropertyKey>(obj: T, prop: K): obj is T & Record<K, unknown> =>
  Object.prototype.hasOwnProperty.call(obj, prop);

export const isRecord = (value: unknown): value is Record<PropertyKey, unknown> =>
  isObject(value) && Object.getPrototypeOf(value) === Object.prototype;
