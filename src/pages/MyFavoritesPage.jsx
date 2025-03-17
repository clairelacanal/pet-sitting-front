import { useEffect, useState } from "react";
import apiHandler from "../utils/apiHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

function MyFavoritePage() {
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const allAnnonces = await apiHandler.getAllAnnonces();
        const filteredAnnonces = allAnnonces.data.filter((annonce) =>
          favorites.includes(annonce._id)
        );
        setAnnonces(filteredAnnonces);
      } catch (error) {
        console.error("Erreur pour afficher les annonces favorites", error);
      }
    };

    fetchFavorites();
  }, [favorites]);

  const handleRemoveFavorite = (id) => {
    const newFavorites = favorites.filter((favId) => favId !== id);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <>
      <h1>Mes annonces favorites</h1>
      <div className="card">
        {annonces.map((annonce) => (
          <div key={annonce._id}>
            <h3>{annonce.kind}</h3>
            <p>{annonce.photo}</p>
            <p>{annonce.city}</p>
            <p>{annonce.description}</p>
            <p>
              Du {annonce.startDate} au {annonce.endDate}
            </p>
            <FontAwesomeIcon
              icon={faHeartSolid}
              onClick={() => handleRemoveFavorite(annonce._id)}
              style={{ color: "red", cursor: "pointer" }}
            />
          </div>
        ))}
        {annonces.length === 0 && <p>Aucune annonce favorite sélectionnée.</p>}
      </div>
    </>
  );
}

export default MyFavoritePage;
