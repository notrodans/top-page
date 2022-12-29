import { $axiosInstance } from "@axios/instance"
import { firstLevelMenu } from "@helpers/helpers"
import { MenuItem } from "@interfaces/menu.interface"
import { withWrapper } from "@layouts/Wrapper"
import type { GetStaticPaths, GetStaticProps, NextPage } from "next"

const Type: NextPage<CoursesProps> = ({ firstCategory }) => {
	return <>Type: {firstCategory}</>
}

export default withWrapper(Type)

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = firstLevelMenu.map(m => "/" + m.route)
	return {
		paths,
		fallback: true
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	if (!params) {
		return {
			notFound: true
		}
	}
	const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type)
	if (!firstCategoryItem) {
		return {
			notFound: true
		}
	}
	const { data: menu } = await $axiosInstance.post<MenuItem[]>("top-page/find", {
		firstCategory: firstCategoryItem.id
	})
	return {
		props: {
			menu,
			firstCategory: firstCategoryItem.id
		}
	}
}

export interface CoursesProps extends Record<string, unknown> {
	menu: MenuItem[]
	firstCategory: number
}
