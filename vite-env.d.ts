/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SERVER_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
