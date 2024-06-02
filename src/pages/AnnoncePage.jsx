import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import apiHandler from "../utils/apiHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

function AnnoncePage() {
  const [annonces, setAnnonces] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const city = params.get("city"); // Je récupère le paramètre de la ville

    const fetchAnnonces = async () => {
      try {
        const response = city
          ? await apiHandler.getAnnoncesByCity(city) //je filtre par ville
          : await apiHandler.getAllAnnonces(); // si rien n'est précisé je retourne tout
        console.log(response);
        setAnnonces(response.data);
      } catch (error) {
        console.error("problème pour recupérer les annonces", error);
      }
    };

    fetchAnnonces();
  }, [location.search]); // Dépendance sur location.search pour recharger lors du changement de paramètres

  // fonction pour obtenir les annonces favorites
  const handleFavorite = (id) => {
    let newFavorites = [...favorites];
    if (favorites.includes(id)) {
      newFavorites = newFavorites.filter((item) => item !== id); // les annonces qui ne sont pas cliquées ne sont pas pushées
    } else {
      newFavorites.push(id); // dès qu'une annonce est cliquée, elle est pushée dans newFavorites
    }
    setFavorites(newFavorites); //le state change
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <div>
      {annonces.map((annonce) => (
        <div key={annonce._id}>
          <h3>{annonce.kind}</h3>
          <p>{annonce.photo}</p>
          <p>{annonce.city}</p>
          <p>{annonce.description}</p>
          <p>
            Du {annonce.startDate} au {annonce.endDate}
          </p>
          <p>
            <FontAwesomeIcon
              icon={faHeartSolid}
              onClick={() => handleFavorite(annonce._id)}
              style={{
                color: favorites.includes(annonce._id) ? "red" : "grey",
              }}
            />
            Mon annonce préférée
          </p>
          <Link to={`/annonces/${annonce._id}`}>Voir +</Link>
        </div>
      ))}
    </div>
  );
}

export default AnnoncePage;
