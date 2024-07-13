import "@/styles/globals.css";
import type { AppProps } from "next/app";

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
