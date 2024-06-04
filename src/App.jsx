import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
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
import CreationAnimalPage from "./pages/CreationAnimalPage";
import AnimauxPage from "./pages/AnimauxPage";
import AnimalDetails from "./pages/AnimalDetails";

function App() {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" Component={HomePage}></Route>
        <Route Component={IsPublicLayout}>
          <Route path="/creer-un-compte" Component={SignupPage}></Route>
          <Route path="/connexion" Component={LoginPage}></Route>
        </Route>

        <Route Component={IsPrivateLayout}>
          <Route path="/annonces" Component={AnnoncePage}></Route>
          <Route
            path="/annonces/:annonceId"
            Component={DetailsAnnoncePage}
          ></Route>
          <Route path="/mon-profile" Component={MyProfilePage}></Route>
          <Route
            path="/mon-profile/creer-un-animal"
            Component={CreationAnimalPage}
          ></Route>
          <Route
            path="/mon-profile/mes-animaux"
            Component={AnimauxPage}
          ></Route>
          <Route
            path="/mon-profile/mes-animaux/:petId"
            Component={AnimalDetails}
          ></Route>
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
