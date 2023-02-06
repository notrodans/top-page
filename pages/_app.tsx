import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }: AppProps) {
	return (
		<AnimatePresence mode='wait' initial={false}>
			<Head>
				<title>MyTop - наш лучший топ</title>
			</Head>
			<Component {...pageProps} key={router.asPath} />
		</AnimatePresence>
	);
}

export default MyApp;
