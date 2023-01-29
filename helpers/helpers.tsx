import { FirstLevelMenuItem } from "../interfaces/menu.interface";
import { TopLevelCategory } from "../interfaces/top-page.interface";
import BooksIcon from "@assets/books.svg";
import CoursesIcon from "@assets/courses.svg";
import ProductsIcon from "@assets/products.svg";
import ServicesIcon from "@assets/services.svg";

export const firstLevelMenu: FirstLevelMenuItem[] = [
	{ route: "courses", name: "Курсы", icon: <CoursesIcon />, id: TopLevelCategory.Courses },
	{ route: "services", name: "Сервисы", icon: <ServicesIcon />, id: TopLevelCategory.Services },
	{ route: "books", name: "Книги", icon: <BooksIcon />, id: TopLevelCategory.Books },
	{ route: "products", name: "Товары", icon: <ProductsIcon />, id: TopLevelCategory.Products }
];

export const priceRu = (price: number): string =>
	price
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/, " ")
		.concat(" ₽");

export const declOfNumber = (number: number, titles: [string, string, string]): string => {
	const cases = [2, 0, 1, 1, 1, 2];
	return titles[
		number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
	];
};
