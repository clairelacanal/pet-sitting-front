import { Link } from "react-router-dom";

function MyProfilePage() {
  return (
    <>
      <h1>Je suis sur mon profile</h1>
      <Link to="/mon-profile/creer-une-annonce">Créer une annonce</Link>
      <Link to="/mon-profile/mes-annonces-preferees">
        Mes annonces preferees
      </Link>
      <Link to="/mon-profile/mes-propres-annonces">Mes propres annonces</Link>
    </>
  );
}

export default MyProfilePage;
