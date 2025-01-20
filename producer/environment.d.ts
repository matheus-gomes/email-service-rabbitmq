declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      RABBITMQ_URL: string;
      EXCHANGE_NAME: string;
    }
  }
}

export {};