import { createTheme } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import bgImage from './assets/images/hordeBackground.png';


const theme = createTheme({

	palette: {
		mode: "dark",
		primary: {
			light: "#5c67a3",
			main: "#8C1616",
			dark: "#2F5BFF",
			constrastText: "#fff",
		},
		secondary: {
			light: "#2F5BFF",
			main: "#8C1616",
			dark: "#c60055",
			contrastText: "#000",
		},
	},
	typography: {
	
	},

	custom: {
		openTitle: "#8C1616",
		protecteTitle: pink[400],
	},

	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundImage: `url(${bgImage})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					backgroundAttachment: 'fixed',
					minHeight: '100vh',
				},
			},
		},
	},
});

export default theme;
