import { describe, expect } from 'vitest'

import {
  hasProperty,
  isArray,
  isBoolean,
  isDate,
  isFunction,
  isNull,
  isNullOrUndefined,
  isNumber,
  isObject,
  isPromise,
  isRecord,
  isString,
  isUndefined,
} from './typeguards'

describe('type Guards', () => {
  describe('isString', () => {
    it('should return true for strings', () => {
      expect(isString('')).toBe(true)
      expect(isString('test')).toBe(true)
    })

    it('should return false for non-strings', () => {
      expect(isString(123)).toBe(false)
      expect(isString({})).toBe(false)
      expect(isString(null)).toBe(false)
    })
  })

  describe('isNumber', () => {
    it('should return true for numbers', () => {
      expect(isNumber(123)).toBe(true)
      expect(isNumber(0)).toBe(true)
      expect(isNumber(-1)).toBe(true)
    })

    it('should return false for NaN and non-numbers', () => {
      expect(isNumber(Number.NaN)).toBe(false)
      expect(isNumber('123')).toBe(false)
      expect(isNumber(null)).toBe(false)
    })
  })

  describe('isBoolean', () => {
    it('should return true for booleans', () => {
      expect(isBoolean(true)).toBe(true)
      expect(isBoolean(false)).toBe(true)
    })

    it('should return false for non-booleans', () => {
      expect(isBoolean(1)).toBe(false)
      expect(isBoolean('true')).toBe(false)
      expect(isBoolean(null)).toBe(false)
    })
  })

  describe('isArray', () => {
    it('should return true for arrays', () => {
      expect(isArray([])).toBe(true)
      expect(isArray([1, 2, 3])).toBe(true)
    })

    it('should return false for non-arrays', () => {
      expect(isArray({})).toBe(false)
      expect(isArray(null)).toBe(false)
      expect(isArray('array')).toBe(false)
    })
  })

  describe('isObject', () => {
    it('should return true for objects', () => {
      expect(isObject({})).toBe(true)
      expect(isObject({ key: 'value' })).toBe(true)
    })

    it('should return false for non-objects', () => {
      expect(isObject(null)).toBe(false)
      expect(isObject([])).toBe(false)
      expect(isObject('object')).toBe(false)
    })
  })

  describe('isFunction', () => {
    it('should return true for functions', () => {
      expect(isFunction(() => {})).toBe(true)
      expect(isFunction(() => {})).toBe(true)
    })

    it('should return false for non-functions', () => {
      expect(isFunction({})).toBe(false)
      expect(isFunction(null)).toBe(false)
      expect(isFunction('function')).toBe(false)
    })
  })

  describe('isDate', () => {
    it('should return true for valid dates', () => {
      expect(isDate(new Date())).toBe(true)
      expect(isDate(new Date('2023-01-01'))).toBe(true)
    })

    it('should return false for invalid dates and non-dates', () => {
      expect(isDate(new Date('invalid'))).toBe(false)
      expect(isDate('2023-01-01')).toBe(false)
      expect(isDate(null)).toBe(false)
    })
  })

  describe('isPromise', () => {
    it('should return true for promises', () => {
      expect(isPromise(Promise.resolve())).toBe(true)
      expect(isPromise(new Promise(() => {}))).toBe(true)
    })

    it('should return false for non-promises', () => {
      expect(isPromise({})).toBe(false)
      expect(isPromise(null)).toBe(false)
      expect(isPromise(() => {})).toBe(false)
    })
  })

  describe('isNull', () => {
    it('should return true for null', () => {
      expect(isNull(null)).toBe(true)
    })

    it('should return false for non-null values', () => {
      expect(isNull(undefined)).toBe(false)
      expect(isNull(0)).toBe(false)
      expect(isNull('')).toBe(false)
    })
  })

  describe('isUndefined', () => {
    it('should return true for undefined', () => {
      expect(isUndefined(undefined)).toBe(true)
    })

    it('should return false for non-undefined values', () => {
      expect(isUndefined(null)).toBe(false)
      expect(isUndefined(0)).toBe(false)
      expect(isUndefined('')).toBe(false)
    })
  })

  describe('isNullOrUndefined', () => {
    it('should return true for null and undefined', () => {
      expect(isNullOrUndefined(null)).toBe(true)
      expect(isNullOrUndefined(undefined)).toBe(true)
    })

    it('should return false for non-null/undefined values', () => {
      expect(isNullOrUndefined(0)).toBe(false)
      expect(isNullOrUndefined('')).toBe(false)
      expect(isNullOrUndefined({})).toBe(false)
    })
  })

  describe('hasProperty', () => {
    it('should return true for objects with the specified property', () => {
      const obj = { key: 'value' }
      expect(hasProperty(obj, 'key')).toBe(true)
    })

    it('should return false for objects without the specified property', () => {
      const obj = { key: 'value' }
      expect(hasProperty(obj, 'nonexistent')).toBe(false)
    })
  })

  describe('isRecord', () => {
    it('should return true for plain objects', () => {
      expect(isRecord({})).toBe(true)
      expect(isRecord({ key: 'value' })).toBe(true)
    })

    it('should return false for non-plain objects', () => {
      expect(isRecord([])).toBe(false)
      expect(isRecord(new Date())).toBe(false)
      expect(isRecord(null)).toBe(false)
    })
  })
})
