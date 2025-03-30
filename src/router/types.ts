export interface RouteParams {
  [key: string]: string | number | boolean
}

export interface RouteConfig {
  path: string
  id: string
  parent?: string
  children?: RouteConfig[]
}

export interface RouterOptions {
  routes: RouteConfig[]
  baseUrl?: string
  mode?: 'hash' | 'history'
}

export interface RouterState {
  currentPath: string
  params: RouteParams
  query: RouteParams
}

export interface RouterEventHandlers {
  beforeRouteChange?: (to: string, from: string) => boolean | Promise<boolean>
  afterRouteChange?: (to: string, from: string) => Promise<void>
  onError?: (error: Error) => void
}

export interface RouterEvent {
  type: 'NAVIGATE' | 'PUSH' | 'REPLACE' | 'POP'
  path: string
  state?: any
}

export type RouterSubscriber = (state: RouterState) => void
