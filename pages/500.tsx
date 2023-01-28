import { Htag } from "../components";
import { withWrapper } from "@layouts/Wrapper";
import React, { FC } from "react";

const Error500: FC = () => {
	return (
		<>
			<Htag tag='h1'>Ошибка 500</Htag>
		</>
	);
};

export default withWrapper(Error500);
