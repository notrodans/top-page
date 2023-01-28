import cn from "classnames";
import { FC } from "react";
import { Htag, Paragraph } from "@components/common";
import { advantagesDataProps } from "./AdvantagesData.interface";
import styles from "./AdvantagesData.module.scss";
import MarkIcon from "./mark.svg";

export const AdvantagesData: FC<advantagesDataProps> = ({ advantages, className, ...props }) => {
	return (
		<>
			<div className={cn(className, styles.advantages)} {...props}>
				{advantages &&
					advantages.map(advantage => (
						<div className={styles.advantage} key={advantage._id}>
							<div className={styles.decor}>
								<MarkIcon className={styles.icon} />
								{advantage.description && <span className={styles.line}></span>}
							</div>
							<div className={styles.content}>
								<Htag tag='h3' className={styles.title}>
									{advantage.title}
								</Htag>
								<Paragraph size='L'>{advantage.description}</Paragraph>
							</div>
						</div>
					))}
			</div>
			<Paragraph size='L' className={styles.conclusion}>
				При завершении очередного проекта над графикой, специалист всегда задает себе вопрос о
				дальнейших перспективах. Отличие профессиональных дизайнеров заключается в том, что они
				гибкие. Сегодня разрабатывается логотип новой компании, а завтра вполне можно переключиться
				на иллюстрацию культовой книги.
			</Paragraph>
		</>
	);
};
