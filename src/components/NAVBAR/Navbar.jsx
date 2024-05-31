import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, updateToken } = useContext(AuthContext);

  function logOut() {
    updateToken(null);
  }

  return (
    <nav>
      <NavLink to="/">Accueil</NavLink>
      {!user && (
        <>
          <NavLink to="/creer-un-compte">Créer un compte</NavLink>
          <NavLink to="/connexion">Se connecter</NavLink>
        </>
      )}
      {user && (
        <>
          <NavLink to="/annonces">Les annonces</NavLink>
          <NavLink to="/mon-profile">Mon profile</NavLink>
          <button onClick={logOut}>Se déconnecter</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
