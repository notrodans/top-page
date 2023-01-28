import { Htag } from "../components/common";
import { withLayout } from "@layouts/Wrapper";

function Error500() {
	return (
		<>
			<Htag tag='h1'>Ошибка 500</Htag>
		</>
	);
}

export default withLayout(Error500);
