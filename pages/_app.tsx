import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }: AppProps) {
	return (
		<AnimatePresence mode='wait' initial={false}>
			<Head>
				<link rel='icon' href='/favicon.ico' />
				<link rel='preconnect' href='https://fonts.gstatic.com' />
				<link rel='preconnect' href='https://mc.yandex.ru' />
				<meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
				<meta property='og:locale' content='ru_RU' />
				<title>MyTop - наш лучший топ</title>
			</Head>
			<Component {...pageProps} key={router.asPath} />
		</AnimatePresence>
	);
}

export default MyApp;
