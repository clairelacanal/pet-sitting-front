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
          <NavLink to="/creer-un-compte" className="nav-link">
            Créer un compte
          </NavLink>
          <NavLink to="/connexion" className="nav-link">
            Se connecter
          </NavLink>
        </>
      )}
      {user && (
        <>
          <NavLink to="/annonces" className="nav-link">
            Les annonces
          </NavLink>
          <NavLink to="/mon-profile" className="nav-link">
            Mon profile
          </NavLink>
          <button onClick={logOut} className="logout">
            Se déconnecter
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
