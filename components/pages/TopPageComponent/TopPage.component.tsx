import { Advantages, HhData, Htag, Product, Sort, Tag } from "@components/common";
import { SortEnum } from "@components/Sort/Sort.interface";
import { TopLevelCategory } from "@interfaces/top-page.interface";
import { FC, useEffect, useReducer } from "react";
import { sortReducer } from "./sort.reducer";
import { TopPageComponentProps } from "./TopPage.interface";
import styles from "./TopPage.module.scss";

export const TopPageComponent: FC<TopPageComponentProps> = ({ firstCategory, page, products }) => {
	const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, {
		products,
		sort: SortEnum.Rating
	});

	const setSort = (sort: SortEnum) => {
		dispatchSort({ type: sort });
	};

	useEffect(() => {
		dispatchSort({ type: "reset", initialState: products });
	}, [products]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag='h2'>{page.title}</Htag>
				{products && (
					<Tag size='s' color='gray'>
						{products.length}
					</Tag>
				)}
				<Sort sort={sort} setSort={setSort} />
			</div>
			{sortedProducts && sortedProducts.map(p => <Product key={p._id} product={p} />)}
			<div className={styles.hhTitle}>
				<Htag tag='h2'>Вакансии - {page.category}</Htag>
				<Tag color='red' size='m'>
					hh.ru
				</Tag>
			</div>
			{firstCategory === TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
			{page.advantages && page.advantages.length > 0 && (
				<>
					<Htag tag='h2'>Преимущества</Htag>
					<div className={styles.advantages}>
						<Advantages advantages={page.advantages} />
					</div>
				</>
			)}
			{page.seoText && (
				<div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />
			)}
			<Htag tag='h2'>Получаемые навыки</Htag>
			{page.tags.map(t => (
				<Tag key={t} color='primary'>
					{t[0].toUpperCase() + t.slice(1)}
				</Tag>
			))}
		</div>
	);
};
