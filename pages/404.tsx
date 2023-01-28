import { Htag } from "../components";
import { withWrapper } from "@layouts/Wrapper";
import React, { FC } from "react";

export const Error404: FC = () => {
	return (
		<>
			<Htag tag='h1'>Ошибка 404</Htag>
		</>
	);
};

export default withWrapper(Error404);
