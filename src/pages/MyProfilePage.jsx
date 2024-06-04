import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function MyProfilePage() {
  const { user, isLoading } = useContext(AuthContext); // Utilisation directe de authName
  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <h1>Salut {user.userName}</h1>
      <Link to="/mon-profile/creer-un-animal">Créer un animal</Link>
      <Link to="/mon-profile/mes-animaux">Ma liste d'animaux</Link>
      <Link to="/mon-profile/creer-une-annonce">Créer une annonce Sitter</Link>
      <Link to="/mon-profile/mes-annonces-preferees">
        Mes annonces préférées
      </Link>
      <Link to="/mon-profile/mes-propres-annonces">Mes propres annonces</Link>
    </>
  );
}

export default MyProfilePage;
