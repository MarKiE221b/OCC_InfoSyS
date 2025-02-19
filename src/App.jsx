import { BrowserRouter, Route, Routes } from "react-router";

import MainLayout from "./layouts/MainLayout.jsx";

import ListOfSuc from "./pages/ListOfSuc.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="suc" element={<ListOfSuc />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
