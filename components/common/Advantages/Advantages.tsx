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
				<>
					{a.title || a.description ? (
						<div key={a._id} className={styles.advantage}>
							<MarkIcon className={styles.icon} />
							<div className={styles.title}>{a.title}</div>
							<hr className={styles.vline} />
							<Paragraph size='L'>{a.description}</Paragraph>
						</div>
					) : (
						<div key={a._id}>Ошибка</div>
					)}
				</>
			))}
		</div>
	);
};
