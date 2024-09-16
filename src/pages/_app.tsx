import "@/styles/globals.css";
import type { AppProps } from "next/app";
// lib
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import "highlight.js/styles/agate.min.css";
// components
import Footer from "@/components/Footer";
// fonts
import { Montserrat, Raleway } from "next/font/google";
// vercel
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-monts",
});

export default function App({ Component, pageProps }: AppProps) {
  hljs.registerLanguage("javascript", javascript);
  hljs.registerLanguage("typescript", typescript);
  hljs.registerLanguage("json", json);
  hljs.registerLanguage("bash", bash);

  return (
    <div className={`${raleway.variable} ${montserrat.variable}`}>
      <Head>
        <meta
          name="og:image"
          content="https://my-blog-one-blue.vercel.app/favicon-bw.png"
        />
        <meta
          name="keywords"
          content="Software Developer, Po Yi Zhi, Software Engineer, Yi Zhi, eazypau"
        />
      </Head>
      <Component {...pageProps} />
      <SpeedInsights />
      <Analytics />
      <Footer />
    </div>
  );
}
