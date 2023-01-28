import { hhDataProps } from "./HhData.interface";
import styles from "./HhData.module.scss";
import RateIcon from "./rate.svg";
import { Card } from "@components/common";
import { priceRu } from "@helpers/helpers";
import { FC } from "react";

export const HhData: FC<hhDataProps> = ({ count, juniorSalary, middleSalary, seniorSalary }) => {
	return (
		<div className={styles.hh}>
			<Card className={styles.count}>
				<div className={styles.title}>Всего вакансий</div>
				<div className={styles.countValue}>{count}</div>
			</Card>
			<Card className={styles.salary}>
				<div>
					<div className={styles.title}>Начальный</div>
					<div className={styles.salaryValue}>{priceRu(juniorSalary)}</div>
					<div className={styles.rate}>
						<RateIcon className={styles.field} />
						<RateIcon className={styles.field} />
						<RateIcon />
					</div>
				</div>
				<div>
					<div className={styles.title}>Средний</div>
					<div className={styles.salaryValue}>{priceRu(middleSalary)}</div>
					<div className={styles.rate}>
						<RateIcon className={styles.field} />
						<RateIcon className={styles.field} />
						<RateIcon />
					</div>
				</div>
				<div>
					<div className={styles.title}>Профессионал</div>
					<div className={styles.salaryValue}>{priceRu(seniorSalary)}</div>
					<div className={styles.rate}>
						<RateIcon className={styles.field} />
						<RateIcon className={styles.field} />
						<RateIcon className={styles.field} />
					</div>
				</div>
			</Card>
		</div>
	);
};
