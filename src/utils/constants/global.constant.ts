import { ENV_MODES } from '@/types/common.enum'

export const DEBUG_DOMAIN_WHITELIST = new Set(['localhost']) as ReadonlySet<string>

export const IS_DEV_ENV = import.meta.env.NODE_ENV === ENV_MODES.DEV
export const IS_PROD_ENV = import.meta.env.NODE_ENV === ENV_MODES.PROD
export const IS_TEST_ENV = import.meta.env.NODE_ENV === ENV_MODES.TEST

export const IS_DEBUG_ENABLED = DEBUG_DOMAIN_WHITELIST.has(window.location.hostname) && IS_DEV_ENV
