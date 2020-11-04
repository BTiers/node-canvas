import type { AppProps /*, AppContext */ } from 'next/app';
import '../styles/index.css';

function Canvas({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default Canvas;
