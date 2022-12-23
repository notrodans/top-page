import { $axiosInstance } from "@axios/instance"
import { Button, Htag, Paragraph, Rating, Tag } from "@components"
import { withWrapper } from "@layouts/Wrapper"
import type { GetStaticProps, NextPage } from "next"
import { useState } from "react"

const Home: NextPage = () => {
	const [rating, setRating] = useState(3)
	return (
		<>
			<Htag tag='h1'>Hello</Htag>
			<Button appearance='primary' arrow='right'>
				Кнопка 1
			</Button>
			<Button appearance='ghost' arrow='right'>
				Кнопка 2
			</Button>
			<Button appearance='primary' arrow='down'>
				Кнопка 3
			</Button>
			<Button appearance='ghost' arrow='down'>
				Кнопка 4
			</Button>
			<Paragraph size='L'>Large</Paragraph>
			<Paragraph size='M'>Medium</Paragraph>
			<Paragraph>Small</Paragraph>
			<Tag size='s'>Ghost</Tag>
			<Tag size='m' color='green'>
				Ghost
			</Tag>
			<Tag size='s' color='red'>
				Ghost
			</Tag>
			<Tag size='s' color='primary'>
				Ghost
			</Tag>
			<Rating rating={rating} setRating={setRating} isEditable />
		</>
	)
}

export default withWrapper(Home)

export const getStaticProps: GetStaticProps = async () => {
	const firstCategory = 0
	const { data: menu } = await $axiosInstance.post("top-page/find")
	return {
		props: {
			menu,
			firstCategory
		}
	}
}
