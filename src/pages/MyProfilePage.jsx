import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "./MyProfilePage.css";

function MyProfilePage() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>; // Affichage d'un message de chargement
  }

  return (
    <div className="mon-profile">
      <h1>Salut {user.userName}!</h1>
      <p>
        Bienvenue dans ton espace personnel. Gére ici tout ce qui concerne ton
        activité.
      </p>

      <div className="links-section">
        <Link className="profile-link" to="/mon-profile/creer-un-animal">
          Créer un animal
        </Link>
        <Link className="profile-link" to="/mon-profile/mes-animaux">
          Ma liste d'animaux
        </Link>
        <Link className="profile-link" to="/mon-profile/creer-une-annonce">
          Créer une annonce Sitter
        </Link>
        <Link className="profile-link" to="/mon-profile/mes-annonces-preferees">
          Mes annonces préférées
        </Link>
        <Link className="profile-link" to="/mon-profile/mes-propres-annonces">
          Mes propres annonces
        </Link>
      </div>
    </div>
  );
}

export default MyProfilePage;
