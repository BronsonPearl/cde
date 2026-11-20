import { createTheme } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			light: "#5c67a3",
			main: "#8FA8FF",
			dark: "#2F5BFF",
			constrastText: "#fff",
		},
		secondary: {
			light: "#2F5BFF",
			main: "#8FA8FF",
			dark: "#c60055",
			contrastText: "#000",
		},
	},
	typography: {
	
	},

	custom: {
		openTitle: "#3f4771",
		protecteTitle: pink[400],
	},
});

export default theme;
