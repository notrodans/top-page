import { Button, Input, Rating, TextArea } from "@components/common";
import { API } from "@helpers/api";
import axios, { AxiosError } from "axios";
import cn from "classnames";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CloseIcon from "./close.svg";
import { IReviewForm, IReviewSendResponse, ReviewFormProps } from "./ReviewForm.interface";
import styles from "./ReviewForm.module.scss";

export const ReviewForm: FC<ReviewFormProps> = ({ productId, className }) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IReviewForm>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSendResponse>(API.review.createDemo, {
				...formData,
				productId
			});
			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setError("Что-то пошло не так");
			}
		} catch (err) {
			if (err instanceof AxiosError) setError(err.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)}>
				<Input
					{...register("name", { required: { value: true, message: "Заполните имя" } })}
					error={errors.name}
					placeholder='Имя'
				/>
				<Input
					{...register("title", { required: { value: true, message: "Заполните заголовок" } })}
					error={errors.title}
					placeholder='Заголовок отзыв'
					className={styles.title}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						name='rating'
						control={control}
						rules={{ required: { value: true, message: "Выберите рейтинг" } }}
						render={({ field }) => (
							<Rating
								error={errors.rating}
								rating={field.value}
								isEditable
								ref={field.ref}
								setRating={field.onChange}
							/>
						)}
					/>
				</div>
				<TextArea
					{...register("description", { required: { value: true, message: "Заполните описание" } })}
					error={errors.description}
					className={styles.description}
					placeholder='Текст отзыва'
				/>
				<div className={styles.submit}>
					<Button appearance='primary'>Отправить</Button>
					<span className={styles.info}>
						* Перед публикацией отзыв пройдет предварительную модерацию и проверку
					</span>
				</div>
			</div>
			{isSuccess && (
				<div className={cn(styles.success, styles.panel)}>
					<div className={styles.successTitle}>Ваш отзыв отправлен</div>
					<div>Спасибо, ваш отзыв будет отправлен после проверки</div>
					<CloseIcon className={styles.close} onClick={() => setIsSuccess(false)} />
				</div>
			)}
			{error && (
				<div className={cn(styles.error, styles.panel)}>
					Что-то пошло не так, попробуйте обновить страницу
					<CloseIcon className={styles.close} onClick={() => setError("")} />
				</div>
			)}
		</form>
	);
};
