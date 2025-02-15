/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NEXT_PUBLIC_STORAGE_ENCRYPTION_KEY: string
  readonly API_URL: string
  readonly NODE_ENV: string
  readonly PORT: string
  readonly VITE_APP_TITLE: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_ENABLE_ANALYTICS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
