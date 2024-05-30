import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NAVBAR/Navbar";
import Footer from "./components/FOOTER/Footer";
import HomePage from "./pages/HomePage";
import AnnoncePage from "./pages/AnnoncePage";
import DetailsAnnoncePage from "./pages/DetailsAnnoncePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" Component={HomePage}></Route>
        <Route path="/annonces" Component={AnnoncePage}></Route>
        <Route path="/signup" Component={SignupPage}></Route>
        <Route path="/login" Component={LoginPage}></Route>

        <Route
          path="/annonces/:annonceId"
          Component={DetailsAnnoncePage}
        ></Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
