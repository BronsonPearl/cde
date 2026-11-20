import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import WT6 from "./../assets/images/WT6.png";

const Home = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 5,
      }}
    >
      <Typography
        component="h1"
        variant="h2"
        sx={{
          px: { xs: 3, sm: 10 },
          fontSize: { xs: "2.5rem", sm: "3.75rem" },
          pt: 3,
          pb: 2,

          color: theme.custom?.openTitle || theme.palette.primary.main,
        }}        
      >
        Home
      </Typography>
      <CardMedia
        sx={{ minHeight: 400 }}
        image={WT6}
        title="Web Team 6"
      />
      <CardContent>
        <Typography variant="body2" component="H3">
          Welcome to Chug.exe
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Home;
