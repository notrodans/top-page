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
