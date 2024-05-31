import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function MyProfilePage() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("username");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);
  return (
    <>
      <h1>Salut {userName}</h1>
      <Link to="/mon-profile/creer-une-annonce">Créer une annonce</Link>
      <Link to="/mon-profile/mes-annonces-preferees">
        Mes annonces preferees
      </Link>
      <Link to="/mon-profile/mes-propres-annonces">Mes propres annonces</Link>
    </>
  );
}

export default MyProfilePage;
