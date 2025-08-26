import "@mantine/core/styles.css";
// import "@mantine/notifications/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
// import { Notifications } from "@mantine/notifications";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { theme } from "./theme";

import { HeaderSimple } from "./components/HeaderSimple";
import { Footer } from "./components/Footer";
import NotFound from "./components/NotFound";

import DatabasePage from "./pages/DatabasePage";
import DocsPage from "./pages/DocsPage";

import { usePageTitle } from "./hooks/usePageTitle";
import { useEffect } from "react";

function AppContent() {
  usePageTitle();

  // Handle admin route redirect
  useEffect(() => {
    if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
      // Redirect to admin with trailing slash to ensure proper loading
      window.location.href = '/admin/';
      return;
    }
  }, []);

  return (
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
          {/* <Route path="/tools" element={<Tools />} /> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider theme={theme} defaultColorScheme="auto">
        {/* <Notifications /> */}
        <Router>
          <AppContent />
        </Router>
      </MantineProvider>
    </>
  );
}