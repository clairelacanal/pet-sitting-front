import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../utils/apiHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

function AnnoncePage() {
  const [annonces, setAnnonces] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const response = await apiHandler.getAllAnnonces();
        console.log(response);
        setAnnonces(response.data);
      } catch (error) {
        console.error("Failed to fetch annonces", error);
      }
    };

    fetchAnnonces();
  }, []);

  const handleFavorite = (id) => {
    let newFavorites = [...favorites];
    if (favorites.includes(id)) {
      newFavorites = newFavorites.filter((item) => item !== id);
    } else {
      newFavorites.push(id);
    }
    setFavorites(newFavorites);
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
