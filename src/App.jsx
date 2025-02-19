import { BrowserRouter, Route, Routes } from "react-router";

import MainLayout from "./layouts/MainLayout";

import ListOfSuc from "./pages/ListOfSuc";
import Dashboard from "./pages/Dashboard";

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
