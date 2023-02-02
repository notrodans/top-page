import { Paragraph } from "@components/common";
import cn from "classnames";
import { FC } from "react";
import { advantagesDataProps } from "./Advantages.interface";
import styles from "./Advantages.module.scss";
import MarkIcon from "./mark.svg";

export const Advantages: FC<advantagesDataProps> = ({ advantages }) => {
	return (
		<div className={cn(styles.advantages)}>
			{advantages.map(a => (
				<div key={a._id}>
					<div className={styles.advantage} style={{ display: !a.title ? "none" : "" }}>
						<MarkIcon className={styles.icon} />
						<div className={styles.title}>{a.title}</div>
						<hr className={styles.vline} style={{ opacity: !a.description ? "0" : "1" }} />
						<Paragraph size='L'>{a.description}</Paragraph>
					</div>
				</div>
			))}
		</div>
	);
};
