import { GetStaticProps } from "next"
import { MenuItem } from "@interfaces/menu.interface"
import { withWrapper } from "@layouts/Wrapper"
import { $axiosInstance } from "@axios/instance"

function Search(): JSX.Element {
	return <>Search</>
}

export default withWrapper(Search)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0
	const { data: menu } = await $axiosInstance.post<MenuItem[]>("top-page/find", {
		firstCategory
	})
	return {
		props: {
			menu,
			firstCategory
		}
	}
}

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[]
	firstCategory: number
}
