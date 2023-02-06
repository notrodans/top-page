import Logo from "@assets/logo.svg";
import { ButtonIcon } from "@components/common";
import { Sidebar } from "@layouts/Sidebar";
import cn from "classnames";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { HeaderProps } from "./Header.interface";
import styles from "./Header.module.scss";

export const Header: FC<HeaderProps> = ({ className, ...props }) => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		setIsOpened(false);
	}, [router]);

	const variants: Variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: {
				stiffness: 500
			}
		},
		closed: {
			transition: {
				stiffness: 300,
				power: 0.8,
				mass: 1
			},
			x: "100%"
		}
	};

	return (
		<header className={cn(className, styles.header)} {...props}>
			<Logo />
			<ButtonIcon appearance='white' icon='menu' onClick={() => setIsOpened(true)} />
			<motion.div
				variants={variants}
				initial={"closed"}
				animate={isOpened ? "opened" : "closed"}
				exit={"closed"}
				className={styles.mobileMenu}>
				<Sidebar />
				<ButtonIcon
					className={styles.menuClose}
					appearance='white'
					icon='close'
					onClick={() => setIsOpened(false)}
				/>
			</motion.div>
		</header>
	);
};
