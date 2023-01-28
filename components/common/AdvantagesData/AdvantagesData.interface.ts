import { TopPageAdvantage } from "@interfaces/top-page.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface advantagesDataProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	advantages: TopPageAdvantage[];
}
