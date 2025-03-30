import type { RouterOptions } from './types'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Router } from './router'

describe('router', () => {
  let router: Router
  const mockRoutes = [
    { path: '/', id: 'home' },
    { path: '/about', id: 'about' },
    { path: '/users/:id', id: 'user' },
    { path: '/products/:category/:id', id: 'product' },
  ]

  const mockOptions: RouterOptions = {
    routes: mockRoutes,
    mode: 'history',
    baseUrl: '',
  }

  beforeEach(() => {
    // Mock window.location and history
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/',
        search: '',
        hash: '',
        replace: vi.fn(),
      },
      writable: true,
    })

    window.history.pushState = vi.fn()
    window.history.replaceState = vi.fn()
    window.addEventListener = vi.fn()

    router = Router.getInstance(mockOptions)
  })

  beforeEach(() => {
    vi.spyOn(window.history, 'pushState')
    vi.spyOn(window.history, 'replaceState')
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('initialization', () => {
    it('should create a singleton instance', () => {
      const router1 = Router.getInstance(mockOptions)
      const router2 = Router.getInstance()
      expect(router1).toBe(router2)
    })

    it('should initialize with default path', () => {
      const state = router.getState()
      expect(state.currentPath).toBe('/')
    })
  })

  describe('navigation', () => {
    it('should handle push navigation', async () => {
      const pushFn = router.push.bind(router)
      const success = await pushFn('/about')
      expect(success).toBe(true)
      // eslint-disable-next-line ts/unbound-method
      expect(window.history.pushState).toHaveBeenCalled()

      const state = router.getState()
      expect(state.currentPath).toBe('/about')
    })

    it('should handle replace navigation', async () => {
      const replaceFn = router.replace.bind(router)
      const success = await replaceFn('/about')
      expect(success).toBe(true)
      // eslint-disable-next-line ts/unbound-method
      expect(window.history.replaceState).toHaveBeenCalled()

      const state = router.getState()
      expect(state.currentPath).toBe('/about')
    })

    it('should extract route params', async () => {
      await router.push('/users/123')
      const state = router.getState()
      expect(state.params).toEqual({ id: '123' })
    })

    it('should handle multiple route params', async () => {
      await router.push('/products/electronics/456')
      const state = router.getState()
      expect(state.params).toEqual({
        category: 'electronics',
        id: '456',
      })
    })
  })

  describe('subscription', () => {
    it('should notify subscribers of state changes', async () => {
      const mockSubscriber = vi.fn()
      const unsubscribe = router.subscribe(mockSubscriber)

      await router.push('/about')
      expect(mockSubscriber).toHaveBeenCalledWith(expect.any(Object))

      unsubscribe()
      await router.push('/')
      expect(mockSubscriber).toHaveBeenCalledTimes(1)
    })
  })

  describe('event Handlers', () => {
    it('should call beforeRouteChange handler', async () => {
      const beforeRouteChange = vi.fn().mockResolvedValue(true)
      router.setEventHandler({ beforeRouteChange })

      await router.push('/about')
      expect(beforeRouteChange).toHaveBeenCalledWith('/about', '/')
    })

    it('should call onError handler when navigation fails', async () => {
      const error = new Error('Navigation error')
      const beforeRouteChange = vi.fn().mockRejectedValue(error)
      const onError = vi.fn()

      router.setEventHandler({ beforeRouteChange, onError })

      const success = await router.push('/about')
      expect(success).toBe(false)
      expect(onError).toHaveBeenCalledWith(error)
    })
  })

  describe('query Parameters', () => {
    it('should handle empty query parameters', () => {
      Object.defineProperty(window.location, 'search', {
        value: '',
      })

      const router = Router.getInstance(mockOptions)
      const state = router.getState()
      expect(state.query).toEqual({})
    })
  })
})
