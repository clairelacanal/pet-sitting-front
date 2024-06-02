import "../components/CARDS/Cards.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import apiHandler from "../utils/apiHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import SidebarFiltering from "../components/SIDEBAR/SidebarFiltering";

function AnnoncePage() {
  const [annonces, setAnnonces] = useState([]);
  const [filters, setFilters] = useState({});
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

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        // Construire l'URL avec les filtres
        const query = new URLSearchParams(filters).toString();
        const response = await apiHandler.getAnnoncesByFilters(query);
        setAnnonces(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des annonces filtrées",
          error
        );
      }
    };

    if (Object.keys(filters).length > 0) {
      fetchAnnonces();
    }
  }, [filters]); // Dépendance sur les filtres pour recharger lorsqu'ils changent

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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Faire une requête au serveur ici si nécessaire
  };

  return (
    <div className="container-allAnnonces">
      <div>
        <SidebarFiltering onFilterChange={handleFilterChange} />
      </div>
      <div className="annonces-list">
        {annonces.length > 0 ? (
          annonces.map((annonce) => (
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
          ))
        ) : (
          <p>Aucune annonce trouvée pour les critères sélectionnés.</p>
        )}
      </div>
    </div>
  );
}

export default AnnoncePage;
