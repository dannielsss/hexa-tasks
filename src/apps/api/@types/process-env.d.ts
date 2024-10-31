declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      NODE_ENV: string;

      DATABASE_USER: string;
      DATABASE_HOST: string;
      DATABASE_NAME: string;
      DATABASE_PASSWORD: string;
      DATABASE_URL: string;
    }
  }
}

export {};
