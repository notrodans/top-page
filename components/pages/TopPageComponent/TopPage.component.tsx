import { AdvantagesData, HhData, Htag, Tag } from "@components/common";
import { FC } from "react";
import { TopPageComponentProps } from "./TopPage.interface";
import styles from "./TopPage.module.scss";

export const TopPageComponent: FC<TopPageComponentProps> = ({ firstCategory, page, products }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag='h2'>{page.title}</Htag>
				{products && (
					<Tag size='s' color='gray'>
						{products.length}
					</Tag>
				)}
				<span>Сортировка</span>
			</div>
			<div>{products && products.map(p => <div key={p._id}>{p.title}</div>)}</div>
			<div className={styles.hhTitle}>
				<Htag tag='h2'>Вакансии - {page.category}</Htag>
				<Tag color='red' size='m'>
					hh.ru
				</Tag>
			</div>
			<HhData {...page.hh} />
			<AdvantagesData advantages={page.advantages} />
			<div className={styles.tags}>
				<Htag tag='h2'>Получаемые навыки</Htag>
				{page.tags.map(tag => (
					<Tag color='primary' key={tag}>
						{tag[0].toUpperCase() + tag.slice(1)}
					</Tag>
				))}
			</div>
		</div>
	);
};
