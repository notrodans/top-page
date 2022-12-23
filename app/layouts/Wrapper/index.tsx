import { Footer } from "@layouts/Footer"
import { Header } from "@layouts/Header"
import { Sidebar } from "@layouts/Sidebar"
import { FC } from "react"
import { WrapperProps } from "./Wrapper.interface"
import styles from "./Wrapper.module.scss"

export const Wrapper: FC<WrapperProps> = ({ children }) => {
	return (
		<div className={styles.wrapper}>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<main className={styles.body}>{children}</main>
			<Footer className={styles.footer} />
		</div>
	)
}

export const withWrapper = <T extends Record<string, unknown>>(Component: FC<T>) => {
	return function withWrapperComponent(props: T) {
		return (
			<Wrapper>
				<Component {...props} />
			</Wrapper>
		)
	}
}
