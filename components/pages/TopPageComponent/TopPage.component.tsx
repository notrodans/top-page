import { TopPageComponentProps } from "./TopPage.interface";
import { FC } from "react";

export const TopPageComponent: FC<TopPageComponentProps> = ({ firstCategory, page, products }) => {
	return <div>{products && products.length}</div>;
};
