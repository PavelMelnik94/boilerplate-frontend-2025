import { tryit } from '@/utils/functions/try-it'
import { logger } from '@/utils/logger'

/**
 * Extended animation options that include AbortSignal
 */
type ExtendedKeyframeAnimationOptions = KeyframeAnimationOptions & {
  /**
   * Signal for aborting the animation
   */
  signal?: AbortSignal
}

type StyleObject = Partial<CSSStyleDeclaration>
type ChainOperation<T extends HTMLElement> = (element: T) => void
interface ChainConfig { silent?: boolean }

const SAFE_CSS_PROPERTIES = new Set([
  'alignContent',
  'alignItems',
  'alignSelf',
  'animation',
  'background',
  'backgroundColor',
  'border',
  'borderRadius',
  'bottom',
  'color',
  'cursor',
  'display',
  'flex',
  'flexBasis',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'font',
  'fontSize',
  'fontWeight',
  'gap',
  'grid',
  'height',
  'justifyContent',
  'left',
  'margin',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'opacity',
  'order',
  'outline',
  'overflow',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'position',
  'right',
  'textAlign',
  'textDecoration',
  'top',
  'transform',
  'transition',
  'visibility',
  'width',
  'zIndex',
])

interface ChainMethods<T extends HTMLElement> {
  addClass: (...classNames: string[]) => ChainMethods<T>
  removeClass: (...classNames: string[]) => ChainMethods<T>
  toggleClass: (className: string) => ChainMethods<T>
  setStyles: (styles: StyleObject) => ChainMethods<T>
  setAttribute: (name: string, value: string) => ChainMethods<T>
  removeAttribute: (name: string) => ChainMethods<T>
  addEventListener: <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (event: HTMLElementEventMap[K]) => void,
    options?: AddEventListenerOptions & { signal?: AbortSignal },
  ) => ChainMethods<T>
  setContent: (content: string | Node) => ChainMethods<T>
  setHtml: (html: string) => ChainMethods<T>
  hide: () => ChainMethods<T>
  show: (display?: string) => ChainMethods<T>
  setSize: (width: string | number, height: string | number) => ChainMethods<T>
  setPosition: (position: 'relative' | 'absolute' | 'fixed') => ChainMethods<T>
  setCoords: (top: string | number, left: string | number) => ChainMethods<T>

  /**
   * Animates the element using the Web Animations API
   * @param keyframes - Array of keyframes that define the animation
   * @param options - Animation options including duration, easing, etc.
   * @returns Chain instance for method chaining
   */
  animate: (keyframes: Keyframe[], options?: ExtendedKeyframeAnimationOptions) => ChainMethods<T>

  transition: (properties: string, duration: string) => ChainMethods<T>
  append: (...nodes: (string | Node)[]) => ChainMethods<T>
  prepend: (...nodes: (string | Node)[]) => ChainMethods<T>
  empty: () => ChainMethods<T>
  setData: (key: string, value: string) => ChainMethods<T>
  getData: (key: string) => string | null
  hasClass: (className: string) => boolean
  replaceClass: (oldClass: string, newClass: string) => ChainMethods<T>
  apply: () => T

  withAbortController: (controller?: AbortController) => ChainMethods<T>
  abort: () => ChainMethods<T>
}

// Function overloads
function chain<T extends HTMLElement>(element: T): ChainMethods<T>
function chain<T extends HTMLElement>(element: T, operations: ChainOperation<T>[]): ChainMethods<T>
function chain<T extends HTMLElement>(element: T, config: ChainConfig): ChainMethods<T>
function chain<T extends HTMLElement>(
  element: T,
  operationsOrConfig?: ChainOperation<T>[] | ChainConfig,
): ChainMethods<T> {
  if (element === null || element === undefined) {
    throw new Error('Chain requires a valid HTMLElement')
  }

  const config: ChainConfig = Array.isArray(operationsOrConfig)
    ? { silent: false }
    : { silent: false, ...operationsOrConfig }

  const operations: ChainOperation<T>[] = Array.isArray(operationsOrConfig) ? operationsOrConfig : []

  const addOperation = (operation: ChainOperation<T>, errorMessage: string) => {
    operations.push((el) => {
      const result = tryit(() => operation(el))
      if (result.err && !config.silent) {
        logger.error(errorMessage, result.err)
      }
    })
  }

  let abortController: AbortController | null = null
  const animations: Animation[] = []
  const cleanups: (() => void)[] = []

  const chainMethods: ChainMethods<T> = {
    addClass: (...classNames) => {
      addOperation(el => el.classList.add(...classNames), `Failed to add classes: ${classNames.join(', ')}`)
      return chainMethods
    },

    removeClass: (...classNames) => {
      addOperation(el => el.classList.remove(...classNames), `Failed to remove classes: ${classNames.join(', ')}`)
      return chainMethods
    },

    toggleClass: (className) => {
      addOperation(el => el.classList.toggle(className), `Failed to toggle class: ${className}`)
      return chainMethods
    },

    setStyles: (styles) => {
      addOperation((el) => {
        Object.entries(styles).forEach(([key, value]) => {
          if (value === null || value === undefined) {
            return
          }

          // Convert to camelCase for style property access
          const camelCaseKey = key.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())

          // Additional validation to prevent object injection
          if (typeof camelCaseKey !== 'string' || !camelCaseKey.match(/^[a-z]+$/i)) {
            if (!config.silent) {
              logger.warn(`Invalid CSS property name format: ${key}`)
            }
            return
          }

          // Explicit check against whitelist
          if (!SAFE_CSS_PROPERTIES.has(camelCaseKey)) {
            if (!config.silent) {
              logger.warn(`Invalid CSS property: ${key}`)
            }
            return
          }

          try {
            // Use setProperty instead of direct assignment
            const kebabCaseKey = camelCaseKey.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)
            el.style.setProperty(kebabCaseKey, String(value))
          }
          catch (error) {
            if (!config.silent) {
              logger.error(`Failed to set CSS property ${key}: ${String(value)}`, error)
            }
          }
        })
      }, 'Failed to set styles')
      return chainMethods
    },

    setAttribute: (name, value) => {
      addOperation(el => el.setAttribute(name, value), `Failed to set attribute ${name}=${value}`)
      return chainMethods
    },

    removeAttribute: (name) => {
      addOperation(el => el.removeAttribute(name), `Failed to remove attribute ${name}`)
      return chainMethods
    },

    addEventListener: (type, listener, options = {}) => {
      addOperation((el) => {
        const wrappedListener = (event: HTMLElementEventMap[typeof type]) => {
          try {
            // Type assertion here is safe because we're using the correct event type from HTMLElementEventMap
            listener(event)
          }
          catch (error) {
            if (!config.silent) {
              logger.error('Event listener error', error)
            }
          }
        }

        const finalOptions = {
          ...options,
          signal: abortController?.signal,
        }

        el.addEventListener(type, wrappedListener as EventListener, finalOptions)

        if (!finalOptions.signal) {
          cleanups.push(() => {
            el.removeEventListener(type, wrappedListener as EventListener)
          })
        }
      }, 'Failed to add event listener')
      return chainMethods
    },

    setContent: (content) => {
      addOperation((el) => {
        if (content instanceof Node) {
          el.textContent = ''
          el.appendChild(content)
        }
        else {
          el.textContent = content
        }
      }, 'Failed to set content')
      return chainMethods
    },

    setHtml: (html) => {
      addOperation((el) => {
        el.innerHTML = html
      }, 'Failed to set HTML content')
      return chainMethods
    },

    hide: () => chainMethods.setStyles({ display: 'none' }),

    show: (display = 'block') => chainMethods.setStyles({ display }),

    setSize: (width, height) => {
      addOperation((el) => {
        el.style.width = typeof width === 'number' ? `${width}px` : width
        el.style.height = typeof height === 'number' ? `${height}px` : height
      }, 'Failed to set size')
      return chainMethods
    },

    setPosition: (position) => {
      addOperation((el) => {
        el.style.position = position
      }, 'Failed to set position')
      return chainMethods
    },

    setCoords: (top, left) => {
      addOperation((el) => {
        el.style.top = typeof top === 'number' ? `${top}px` : top
        el.style.left = typeof left === 'number' ? `${left}px` : left
      }, 'Failed to set coordinates')
      return chainMethods
    },

    animate: (keyframes, options = {}) => {
      addOperation((el) => {
        const animation = el.animate(keyframes, {
          ...options,
          ...(abortController?.signal ? { signal: abortController.signal } : {}),
        } as KeyframeAnimationOptions)

        animations.push(animation)

        // Handle animation errors
        animation.finished
          .catch((error) => {
            if (!config.silent) {
              logger.error('Animation failed', error)
            }
            animation.cancel()
          })
          .finally(() => {
            const index = animations.indexOf(animation)
            if (index > -1) {
              animations.splice(index, 1)
            }
          })
      }, 'Failed to start animation')
      return chainMethods
    },

    transition: (properties, duration) => {
      addOperation((el) => {
        el.style.transition = `${properties} ${duration}`
      }, 'Failed to set transition')
      return chainMethods
    },

    append: (...nodes) => {
      addOperation((el) => {
        el.append(...nodes)
      }, 'Failed to append nodes')
      return chainMethods
    },

    prepend: (...nodes) => {
      addOperation((el) => {
        el.prepend(...nodes)
      }, 'Failed to prepend nodes')
      return chainMethods
    },

    empty: () => {
      addOperation((el) => {
        el.innerHTML = ''
      }, 'Failed to empty element')
      return chainMethods
    },

    setData: (key, value) => {
      addOperation((el) => {
        if (/^[a-z0-9]+$/i.test(key)) {
          el.setAttribute(`data-${key}`, value)
        }
        else {
          throw new Error('Invalid data attribute key. Only alphanumeric characters are allowed.')
        }
      }, 'Failed to set data attribute')
      return chainMethods
    },

    getData: (key) => {
      if (/^[a-z0-9]+$/i.test(key)) {
        const value = element.getAttribute(`data-${key}`)
        return value !== null && value !== '' ? value : null
      }
      throw new Error('Invalid data attribute key. Only alphanumeric characters are allowed.')
    },

    hasClass: (className) => {
      return element.classList.contains(className)
    },

    replaceClass: (oldClass, newClass) => {
      addOperation((el) => {
        el.classList.replace(oldClass, newClass)
      }, 'Failed to replace class')
      return chainMethods
    },

    withAbortController: (controller?: AbortController) => {
      abortController = controller || new AbortController()
      return chainMethods
    },

    abort: () => {
      if (abortController) {
        abortController.abort()
        animations.forEach((animation) => {
          try {
            animation.cancel()
          }
          catch (error) {
            if (!config.silent) {
              logger.error('Failed to cancel animation', error)
            }
          }
        })
        animations.splice(0)
        cleanups.forEach((cleanup) => {
          try {
            cleanup()
          }
          catch (error) {
            if (!config.silent) {
              logger.error('Failed to execute cleanup', error)
            }
          }
        })
        cleanups.splice(0)
      }
      return chainMethods
    },

    apply: () => {
      const result = tryit(() => {
        operations.forEach(operation => operation(element))
      })

      if (result.err && !config.silent) {
        logger.error('Chain application failed', result.err)
        // On error, abort all operations
        chainMethods.abort()
      }

      return element
    },
  }

  return chainMethods
}

/**
 * Creates a chainable interface for DOM manipulations
 * @template T - Type of HTMLElement being manipulated
 * @param element - The DOM element to manipulate
 * @param operationsOrConfig - Optional operations array or configuration object
 * @returns A chainable interface for DOM manipulations
 * @throws {Error} When element is null or undefined
 *
 * @example
 * ```typescript
 * chain(document.querySelector('.my-element'))
 *   .addClass('active')
 *   .animate([
 *     { opacity: 0 },
 *     { opacity: 1 }
 *   ], {
 *     duration: 1000,
 *     easing: 'ease-in-out'
 *   })
 *   .apply();
 * ```
 */
export { chain }
export type { ChainMethods, ExtendedKeyframeAnimationOptions }
