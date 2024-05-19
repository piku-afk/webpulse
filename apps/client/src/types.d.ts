/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly WEBPULSE_API_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
