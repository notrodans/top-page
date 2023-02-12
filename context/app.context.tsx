import { MenuItem } from "../interfaces/menu.interface";
import { TopLevelCategory } from "../interfaces/top-page.interface";
import { createContext, FC, PropsWithChildren, useState } from "react";

export interface IAppContext extends PropsWithChildren {
	menu: MenuItem[];
	firstCategory: number;
	setMenu?: (newMenu: MenuItem[]) => void;
}

export const AppContext = createContext<IAppContext>({
	menu: [],
	firstCategory: TopLevelCategory.Courses
});

export const AppContextProvider: FC<IAppContext> = ({ menu, firstCategory, children }) => {
	const [menuState, setMenuState] = useState<MenuItem[]>(menu);
	const setMenu = (newMenu: MenuItem[]) => {
		setMenuState(newMenu);
	};

	return (
		<AppContext.Provider value={{ menu: menuState, firstCategory, setMenu }}>{children}</AppContext.Provider>
	);
};
