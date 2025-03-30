import type {
  RouteConfig,
  RouteParams,
  RouterEvent,
  RouterEventHandlers,
  RouterOptions,
  RouterState,
  RouterSubscriber,
} from './types'
import { logger } from '@/utils/logger'

export class Router {
  private static instance: Router
  private routes: RouteConfig[]
  private state: RouterState
  private subscribers: Set<RouterSubscriber>
  private handlers: RouterEventHandlers
  private baseUrl: string
  private mode: 'hash' | 'history'

  private constructor(options: RouterOptions) {
    this.routes = options.routes
    this.baseUrl = options.baseUrl ?? ''
    this.mode = options.mode || 'history'
    this.subscribers = new Set()
    this.handlers = {}
    const currentPath = this.getCurrentPath()
    this.state = {
      currentPath,
      params: this.extractRouteParams(currentPath),
      query: this.parseQueryParams(window.location.search),
    }

    this.initializeRouter()
  }

  public static getInstance(options?: RouterOptions): Router {
    if (Router.instance === undefined && options) {
      Router.instance = new Router(options)
    }
    return Router.instance
  }

  private initializeRouter(): void {
    window.addEventListener('popstate', this.handlePopState.bind(this))
    this.notifySubscribers()
  }

  private getCurrentPath(): string {
    if (this.mode === 'hash') {
      return window.location.hash.slice(1) || '/'
    }
    return window.location.pathname.replace(this.baseUrl, '') || '/'
  }

  private parseQueryParams(search: string): RouteParams {
    const params: RouteParams = {}
    if (!search)
      return params

    const searchParams = new URLSearchParams(search)
    for (const [key, value] of searchParams.entries()) {
      params[key] = value
    }
    return params
  }

  private async handleRouteChange(event: RouterEvent): Promise<boolean> {
    const from = this.state.currentPath
    const to = event.path

    try {
      if (this.handlers.beforeRouteChange) {
        const canProceed = await this.handlers.beforeRouteChange(to, from)
        if (!canProceed) {
          return false
        }
      }

      const newState = {
        currentPath: to,
        params: this.extractRouteParams(to),
        query: this.parseQueryParams(window.location.search),
      }

      this.state = newState
      this.notifySubscribers()

      if (this.handlers.afterRouteChange) {
        await this.handlers.afterRouteChange(to, from)
      }

      return true
    }
    catch (error) {
      if (this.handlers.onError && error instanceof Error) {
        this.handlers.onError(error)
      }
      logger.error('Route change error:', error)
      return false
    }
  }

  private handlePopState = (): void => {
    void this.handleRouteChange({
      type: 'POP',
      path: this.getCurrentPath(),
    })
  }

  private extractRouteParams(path: string): RouteParams {
    const params: RouteParams = {}
    const route = this.findMatchingRoute(path)

    if (route) {
      const pathParts = path.split('/')
      const routeParts = route.path.split('/')

      routeParts.forEach((part, index) => {
        if (part.startsWith(':')) {
          const paramName = part.slice(1)
          params[paramName] = pathParts[index]
        }
      })
    }

    return params
  }

  private findMatchingRoute(path: string): RouteConfig | undefined {
    return this.routes.find((route) => {
      const routeRegex = this.createRouteRegex(route.path)
      return routeRegex.test(path)
    })
  }

  private createRouteRegex(path: string): RegExp {
    const pattern = path
      .replace(/:[^/]+/g, '([^/]+)')
      .replace(/\//g, '\\/')
    return new RegExp(`^${pattern}$`)
  }

  private notifySubscribers(): void {
    this.subscribers.forEach(subscriber => subscriber(this.state))
  }

  public subscribe(subscriber: RouterSubscriber): () => void {
    this.subscribers.add(subscriber)
    return () => this.subscribers.delete(subscriber)
  }

  public setEventHandler(handlers: Partial<RouterEventHandlers>): void {
    this.handlers = { ...this.handlers, ...handlers }
  }

  public async push(path: string, state?: unknown): Promise<boolean> {
    const success = await this.handleRouteChange({
      type: 'PUSH',
      path,
      state,
    })

    if (success) {
      if (this.mode === 'hash') {
        window.location.hash = path
      }
      else {
        window.history.pushState(state, '', this.baseUrl + path)
      }
    }
    else {
      // Restore previous state if navigation was prevented
      this.state = {
        ...this.state,
        currentPath: this.state.currentPath,
      }
    }

    return success
  }

  public async replace(path: string, state?: unknown): Promise<boolean> {
    const success = await this.handleRouteChange({
      type: 'REPLACE',
      path,
      state,
    })

    if (success) {
      if (this.mode === 'hash') {
        window.location.replace(`${window.location.pathname}#${path}`)
      }
      else {
        window.history.replaceState(state, '', this.baseUrl + path)
      }
    }

    return success
  }

  public back(): void {
    window.history.back()
  }

  public forward(): void {
    window.history.forward()
  }

  public getState(): RouterState {
    return { ...this.state }
  }
}
