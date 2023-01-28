import { WrapperProps } from "./Wrapper.interface";
import styles from "./Wrapper.module.scss";
import { AppContextProvider, IAppContext } from "@context/app.context";
import { Footer } from "@layouts/Footer";
import { Header } from "@layouts/Header";
import { Sidebar } from "@layouts/Sidebar";
import { FC } from "react";

export const Wrapper: FC<WrapperProps> = ({ children }) => {
	return (
		<div className={styles.wrapper}>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<main className={styles.body}>{children}</main>
			<Footer className={styles.footer} />
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FC<T>) => {
	return function withLayoutComponent(props: T) {
		return (
			<AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
				<Wrapper>
					<Component {...props} />
				</Wrapper>
			</AppContextProvider>
		);
	};
};
