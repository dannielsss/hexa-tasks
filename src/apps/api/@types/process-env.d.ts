declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;

      DATABASE_USER: string;
      DATABASE_HOST: string;
      DATABASE_NAME: string;
      DATABASE_PASSWORD: string;
    }
  }
}

export {};
