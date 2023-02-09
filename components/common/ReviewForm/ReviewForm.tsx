import { Button, Input, Rating, TextArea } from "@components/common";
import { API } from "@helpers/api";
import axios, { AxiosError } from "axios";
import cn from "classnames";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CloseIcon from "./close.svg";
import { IReviewForm, IReviewSendResponse, ReviewFormProps } from "./ReviewForm.interface";
import styles from "./ReviewForm.module.scss";

export const ReviewForm: FC<ReviewFormProps> = ({ productId, isOpened, className }) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		clearErrors
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
					tabIndex={isOpened ? 0 : -1}
					placeholder='Имя'
					aria-placeholder='Имя'
					aria-invalid={errors.name ? true : false}
				/>
				<Input
					className={styles.title}
					{...register("title", { required: { value: true, message: "Заполните заголовок" } })}
					error={errors.title}
					tabIndex={isOpened ? 0 : -1}
					placeholder='Заголовок отзыва'
					aria-placeholder='Заголовок отзыва'
					aria-invalid={errors.title ? true : false}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						name='rating'
						control={control}
						rules={{ required: { value: true, message: "Выберите рейтинг" } }}
						render={({ field }) => (
							<Rating
								isEditable
								error={errors.rating}
								rating={field.value}
								ref={field.ref}
								setRating={field.onChange}
								tabIndex={isOpened ? 0 : -1}
							/>
						)}
					/>
				</div>
				<TextArea
					{...register("description", { required: { value: true, message: "Заполните описание" } })}
					error={errors.description}
					className={styles.description}
					tabIndex={isOpened ? 0 : -1}
					placeholder='Текст отзыва'
					aria-placeholder='Текст отзыва'
					aria-label='Текст отзыва'
					aria-invalid={errors.description ? true : false}
				/>
				<div className={styles.submit}>
					<Button appearance='primary' tabIndex={isOpened ? 0 : -1} onClick={() => clearErrors()}>
						Отправить
					</Button>
					<span className={styles.info}>
						* Перед публикацией отзыв пройдет предварительную модерацию и проверку
					</span>
				</div>
			</div>
			{isSuccess && (
				<div role='alert' className={cn(styles.success, styles.panel)}>
					<div className={styles.successTitle}>Ваш отзыв отправлен</div>
					<div>Спасибо, ваш отзыв будет отправлен после проверки</div>
					<button
						className={styles.close}
						onClick={() => setIsSuccess(false)}
						aria-label='Закрыть оповещение'
					>
						<CloseIcon />
					</button>
				</div>
			)}
			{error && (
				<div role='alert' className={cn(styles.error, styles.panel)}>
					Что-то пошло не так, попробуйте обновить страницу
					<button
						className={styles.close}
						onClick={() => setError("")}
						aria-label='Закрыть оповещение'
					>
						<CloseIcon />
					</button>
				</div>
			)}
		</form>
	);
};
