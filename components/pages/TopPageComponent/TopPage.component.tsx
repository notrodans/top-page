import { Advantages, HhData, Htag, Product, Sort, Tag, Up } from "@components/common";
import { SortEnum } from "@components/Sort/Sort.interface";
import { TopLevelCategory } from "@interfaces/top-page.interface";
import { useReducedMotion } from "framer-motion";
import { FC, useEffect, useReducer } from "react";
import { sortReducer } from "./sort.reducer";
import { TopPageComponentProps } from "./TopPage.interface";
import styles from "./TopPage.module.scss";

export const TopPageComponent: FC<TopPageComponentProps> = ({ firstCategory, page, products }) => {
	const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, {
		products,
		sort: SortEnum.Rating
	});
	const shouldReduceMotion = useReducedMotion();

	const setSort = (sort: SortEnum) => {
		dispatchSort({ type: sort });
	};

	useEffect(() => {
		dispatchSort({ type: SortEnum.Reset, initialState: products });
	}, [products]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag='h2'>{page.title}</Htag>
				{products && (
					<Tag size='s' color='gray' aria-label={products.length + " курсов"}>
						{products.length}
					</Tag>
				)}
				<Sort sort={sort} setSort={setSort} />
			</div>
			<div role='list'>
				{sortedProducts &&
					sortedProducts.map(p => (
						<Product
							layout={shouldReduceMotion ? false : true}
							className={styles.product}
							key={p._id}
							product={p}
						/>
					))}
			</div>
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
			{page.tags.length && (
				<div>
					<Htag className={styles.skillHTag} tag='h2'>
						Получаемые навыки
					</Htag>
					<div className={styles.tags}>
						{page.tags.map(t => (
							<Tag className={styles.tag} key={t} color='primary'>
								{t[0].toUpperCase() + t.slice(1)}
							</Tag>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
