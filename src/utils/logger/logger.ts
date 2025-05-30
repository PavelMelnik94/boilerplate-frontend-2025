import { IS_DEBUG_ENABLED } from '../constants/global.constant'

class Logger {
  private static instance: Logger
  private isEnabled: boolean

  private constructor() {
    this.isEnabled = IS_DEBUG_ENABLED || false
  }

  public static getInstance(): Logger {
    if (Logger.instance === undefined || Logger.instance === null) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled
  }

  public info = (message: string, ...optionalParams: never[]): void => {
    if (this.isEnabled) {
      // eslint-disable-next-line no-console
      console.info(
        `%cINFO: ${message}`,
        'background: #2C528C; padding: 0.2rem; border-radius: 0.1rem',
        ...optionalParams,
      )
    }
  }

  public log = (message: string, ...optionalParams: never[]): void => {
    if (this.isEnabled) {
      // eslint-disable-next-line no-console
      console.info(
        `%cLOG: ${message}`,
        'font-weight: bold; background:rgb(44, 140, 92); padding: 0.2rem; border-radius: 0.1rem',
        ...optionalParams,
      )
    }
  }

  public warn = (message: string, ...optionalParams: never[]): void => {
    if (this.isEnabled) {
      console.warn(`%cWARN: ${message}`, 'color: orange;', ...optionalParams)
    }
  }

  public error = (message: string, ...optionalParams: unknown[]): void => {
    if (this.isEnabled) {
      console.error(`%cERROR: ${message}`, 'color: red', ...optionalParams)
    }
  }
}

function withLogging<T extends (...args: unknown[]) => unknown>(fn: T): T {
  return ((...args: Parameters<T>): ReturnType<T> | undefined => {
    try {
      return fn(...args) as ReturnType<T>
    }
    catch (error) {
      const logger = Logger.getInstance()
      logger.error(`🚨🚨🚨 FIRE!!! An error occurred.`, error)
      return undefined
    }
  }) as T
}

const logger = Logger.getInstance()

export { logger, Logger, withLogging }
