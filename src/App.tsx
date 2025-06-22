import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { theme } from "./theme";
import { HeaderSimple } from "./components/HeaderSimple";
import { Footer } from "./components/Footer";
import DatabasePage from "./pages/DatabasePage";
import DocsPage from "./pages/DocsPage";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Router>
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column' 
        }}>
          <HeaderSimple />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<DatabasePage />} />
              <Route path="/docs" element={<DocsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </MantineProvider>
  );
}