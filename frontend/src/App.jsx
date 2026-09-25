import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ApplicationProvider } from "./context/ApplicationContext";
import AppShell from "./layouts/AppShell";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";

const App = () => {
  return (
    <BrowserRouter>
      <ApplicationProvider>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="applications" element={<Applications />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </ApplicationProvider>
    </BrowserRouter>
  );
};

export default App;
