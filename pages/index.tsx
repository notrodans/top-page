import { MenuItem } from "../interfaces/menu.interface";
import { Button, Htag, Input, Paragraph, Rating, Tag, TextArea } from "@components/common";
import { API } from "@helpers/api";
import { withLayout } from "@layouts/Wrapper";
import axios from "axios";
import type { GetStaticProps, NextPage } from "next";
import { useState } from "react";

const Home: NextPage<HomeProps> = ({}) => {
	const [rating, setRating] = useState(3);
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
			<Input placeholder='Тест' />
			<TextArea placeholder='hehe' />
		</>
	);
};

export default withLayout(Home);

export const getStaticProps: GetStaticProps = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem>(API.topPage.find, {
		firstCategory
	});
	return {
		props: {
			menu,
			firstCategory
		}
	};
};

export interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
