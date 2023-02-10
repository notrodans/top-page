import { Button, Card, Divider, Rating, Review, ReviewForm, Tag } from "@components/common";
import { declOfNumber, priceRu } from "@helpers/helpers";
import cn from "classnames";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { forwardRef, useRef, useState } from "react";
import { ProductProps } from "./Product.interface";
import styles from "./Product.module.scss";

export const Product = motion(
	forwardRef<HTMLDivElement, ProductProps>(({ product, className, ...props }, ref) => {
		const [isReviewOpened, setIsReviewOpen] = useState<boolean>(false);
		const reviewRef = useRef<HTMLDivElement>(null);

		const scrollToReview = () => {
			setIsReviewOpen(true);
			reviewRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
			reviewRef.current?.focus();
		};

		const variants: Variants = {
			visible: {
				height: "auto",
				opacity: 1,
				pointerEvents: "auto"
			},
			hidden: {
				opacity: 0,
				height: 0,
				pointerEvents: "none"
			}
		};

		return (
			<div className={className} {...props} ref={ref}>
				<Card className={styles.product}>
					<div className={styles.logo}>
						<Image
							src={
								product.image.includes("/uploads")
									? process.env.NEXT_PUBLIC_DOMAIN + product.image
									: product.image
							}
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
						<span>
							<span className='visuallyHidden'>цена</span>
							{priceRu(product.price)}
						</span>
						{product.oldPrice && (
							<Tag className={styles.oldPrice} color='green'>
								<span className='visuallyHidden'>скидка</span>
								{priceRu(product.price - product.oldPrice)}
							</Tag>
						)}
					</div>
					<div className={styles.credit}>
						<span>
							<span className='visuallyHidden'>кредит</span>
							{priceRu(product.credit)}
						</span>
						/мес
					</div>
					<div className={styles.rating}>
						<span className='visuallyHidden'>
							{"рейтинг" + (product.reviewAvg ?? product.initialRating)}
						</span>
						<Rating rating={product.reviewAvg ?? product.initialRating} />
					</div>
					<div className={styles.tags}>
						{product.categories.map(c => (
							<Tag key={c} color='ghost'>
								{c}
							</Tag>
						))}
					</div>
					<div aria-hidden='true' className={styles.priceTitle}>
						цена
					</div>
					<div className={styles.creditTitle}>кредит</div>
					<div className={styles.rateTitle}>
						<a href='#ref' onClick={scrollToReview}>
							{product.reviewCount}&nbsp;
							{declOfNumber(product.reviewCount, ["отзыв", "отзыва", "отзывов"])}
						</a>
					</div>
					<div className={styles.hr}>
						<Divider className={styles.hr} />
					</div>
					<div className={styles.description}>{product.description}</div>
					<div className={styles.features}>
						<div className={styles.characteristics}>
							{product.characteristics.map(c => (
								<div className={styles.characteristic} key={c.value}>
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
						<Divider className={cn(styles.hr, styles.hr2)} />
					</div>
					<div className={styles.actions}>
						<Button className={styles.button} appearance='primary'>
							Узнать подробнее
						</Button>
						<Button
							aria-expanded={isReviewOpened}
							className={styles.button}
							appearance='ghost'
							arrow={isReviewOpened ? "down" : "right"}
							onClick={() => setIsReviewOpen(prev => !prev)}
						>
							Читать отзывы
						</Button>
					</div>
				</Card>
				<motion.div
					variants={variants}
					initial={isReviewOpened ? "visible" : "hidden"}
					animate={isReviewOpened ? "visible" : "hidden"}
				>
					<Card
						color='blue'
						ref={reviewRef}
						tabIndex={isReviewOpened ? 0 : -1}
						className={cn(styles.reviews, {
							[styles.closed]: !isReviewOpened,
							[styles.opened]: isReviewOpened
						})}
					>
						{product.reviews.map(r => (
							<div key={r._id}>
								<Review review={r} />
								<Divider />
							</div>
						))}
						<ReviewForm productId={product._id} isOpened={isReviewOpened} />
					</Card>
				</motion.div>
			</div>
		);
	})
);
