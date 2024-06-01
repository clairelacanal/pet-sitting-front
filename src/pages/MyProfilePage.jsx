import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function MyProfilePage() {
  const { authName } = useContext(AuthContext); // Utilisation directe de authName

  return (
    <>
      <h1>Salut {authName}</h1>
      <Link to="/mon-profile/creer-une-annonce">Créer une annonce</Link>
      <Link to="/mon-profile/mes-annonces-preferees">
        Mes annonces préférées
      </Link>
      <Link to="/mon-profile/mes-propres-annonces">Mes propres annonces</Link>
    </>
  );
}

export default MyProfilePage;
