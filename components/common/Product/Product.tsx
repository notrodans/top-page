import { Button, Card, Rating, Tag } from "@components/common";
import { Divider } from "@components/Divider/Divider";
import { declOfNumber, priceRu } from "@helpers/helpers";
import Image from "next/image";
import { FC } from "react";
import { ProductProps } from "./Product.interface";
import styles from "./Product.module.scss";

export const Product: FC<ProductProps> = ({ product, className, ...props }) => {
	return (
		<Card className={styles.product}>
			<div className={styles.logo}>
				<Image
					src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
					alt={product.title}
					width={70}
					height={70}
					quality={70}
					loading='lazy'
					unoptimized={false}
				/>
			</div>
			<div className={styles.title}>{product.title}</div>
			<div className={styles.price}>
				<span>{priceRu(product.price)}</span>
				{product.oldPrice && (
					<Tag className={styles.oldPrice} color='green'>
						{priceRu(product.price - product.oldPrice)}
					</Tag>
				)}
			</div>
			<div className={styles.credit}>
				<span>{priceRu(product.credit)}</span>/мес
			</div>
			<div className={styles.rating}>
				<Rating rating={product.reviewAvg ?? product.initialRating} />
			</div>
			<div className={styles.tags}>
				{product.categories.map(c => (
					<Tag key={c} color='ghost'>
						{c}
					</Tag>
				))}
			</div>
			<div className={styles.priceTitle}>цена</div>
			<div className={styles.creditTitle}>кредит</div>
			<div className={styles.rateTitle}>
				{product.reviewCount} {declOfNumber(product.reviewCount, ["отзыв", "отзыва", "отзывов"])}
			</div>
			<div className={styles.hr}>
				<Divider className={styles.hr} />
			</div>
			<div className={styles.description}>{product.description}</div>
			<div className={styles.features}>
				<div className={styles.characteristics}>
					{product.characteristics.map(c => (
						<div className={styles.characteristic} key={c.name}>
							<span className={styles.characteristicName}>{c.name}</span>
							<span className={styles.characteristicDots}></span>
							<span className={styles.characteristicValue}>{c.value}</span>
						</div>
					))}
				</div>
			</div>
			<div className={styles.advBlock}>
				<div className={styles.advantages}>
					<div className={styles.advTitle}>Преимущества</div>
					<div>{product.advantages}</div>
				</div>
				<div className={styles.disAdvantages}>
					<div className={styles.advTitle}>Недостатки</div>
					<div>{product.disadvantages}</div>
				</div>
			</div>
			<div className={styles.hr}>
				<Divider className={styles.hr} />
			</div>
			<div className={styles.actions}>
				<Button className={styles.button} appearance='primary'>
					Узнать подробнее
				</Button>
				<Button className={styles.button} appearance='ghost' arrow='right'>
					Читать отзывы
				</Button>
			</div>
		</Card>
	);
};
