import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const API_BASE_URL = "http://localhost:3005/api";

function App() {
  const [storeName, setStoreName] = useState<string>("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/store-name`)
      .then((res) => res.json())
      .then((data: { name: string }) => setStoreName(data.name))
      .catch((err) => console.error("Failed to fetch store name:", err));
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1">
            {storeName}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Product Library will go here
        </Typography>
      </Container>
    </Box>
  );
}

export default App;
