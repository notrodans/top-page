import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import React, { FC } from "react"
import { MenuItem } from "@interfaces/menu.interface"
import { TopLevelCategory, TopPageModel } from "@interfaces/top-page.interface"
import { ProductModel } from "@interfaces/product.interface"
import { firstLevelMenu } from "@helpers/helpers"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import { withWrapper } from "@layouts/Wrapper"
import { $axiosInstance } from "@axios/instance"

const TopPage: FC<TopPageProps> = ({ firstCategory, page, products }) => {
	return (
		<>
			<Head>
				<title>{page.metaTitle}</title>
				<meta name='description' content={page.metaDescription} />
				<meta property='og:title' content={page.metaTitle} />
				<meta property='og:description' content={page.metaDescription} />
				<meta property='og:type' content='article' />
			</Head>
		</>
	)
}

export default withWrapper(TopPage)

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = []
	for (const m of firstLevelMenu) {
		const { data: menu } = await $axiosInstance.post<MenuItem[]>("top-page/find", {
			firstCategory: m.id
		})
		paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)))
	}
	return {
		paths,
		fallback: true
	}
}

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
	params
}: GetStaticPropsContext<ParsedUrlQuery>) => {
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
	try {
		const { data: menu } = await $axiosInstance.post<MenuItem[]>("top-page/find/", {
			firstCategory: firstCategoryItem.id
		})
		if (menu.length == 0) {
			return {
				notFound: true
			}
		}
		const { data: page } = await $axiosInstance.get<TopPageModel>(
			"top-page/byAlias/" + params.alias
		)
		const { data: products } = await $axiosInstance.post<ProductModel[]>("top-page/find/", {
			category: page.category,
			limit: 10
		})

		return {
			props: {
				menu,
				firstCategory: firstCategoryItem.id,
				page,
				products
			}
		}
	} catch {
		return {
			notFound: true
		}
	}
}

interface TopPageProps extends Record<string, unknown> {
	menu: MenuItem[]
	firstCategory: TopLevelCategory
	page: TopPageModel
	products: ProductModel[]
}
