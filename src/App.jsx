import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NAVBAR/Navbar";
import Footer from "./components/FOOTER/Footer";
import HomePage from "./pages/HomePage";
import AnnoncePage from "./pages/AnnoncePage";
import DetailsAnnoncePage from "./pages/DetailsAnnoncePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MyProfilePage from "./pages/MyProfilePage";
import MyFavoritePage from "./pages/MyFavoritesPage";
import CreationAnnoncePage from "./pages/CreationAnnoncePage";
import MesPropresAnnonces from "./pages/MesPropresAnnonces";
import IsPublicLayout from "./components/IsPublicLayout";
import IsPrivateLayout from "./components/IsPrivateLayout";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route Component={IsPublicLayout}>
          <Route path="/creer-un-compte" Component={SignupPage}></Route>
          <Route path="/connexion" Component={LoginPage}></Route>
          <Route path="/" Component={HomePage}></Route>
        </Route>

        <Route Component={IsPrivateLayout}>
          <Route path="/annonces" Component={AnnoncePage}></Route>
          <Route
            path="/annonces/:annonceId"
            Component={DetailsAnnoncePage}
          ></Route>
          <Route path="/mon-profile" Component={MyProfilePage}></Route>
          <Route
            path="/mon-profile/mes-annonces-preferees"
            Component={MyFavoritePage}
          ></Route>
          <Route
            path="/mon-profile/creer-une-annonce"
            Component={CreationAnnoncePage}
          ></Route>
          <Route
            path="/mon-profile/mes-propres-annonces"
            Component={MesPropresAnnonces}
          ></Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
