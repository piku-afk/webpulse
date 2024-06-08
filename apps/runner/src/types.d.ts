declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      SUPABASE_URL: string;
      SUPABASE_KEY: string;
    }
  }
}
