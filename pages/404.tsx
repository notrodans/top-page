import { Htag } from "../components/common";
import { withLayout } from "@layouts/Wrapper";

export function Error404() {
	return (
		<>
			<Htag tag='h1'>Ошибка 404</Htag>
		</>
	);
}

export default withLayout(Error404);
