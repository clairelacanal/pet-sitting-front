import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import apiHandler from "../utils/apiHandler";
import SidebarFiltering from "../components/SIDEBAR/SidebarFiltering";
import Cards from "../components/CARDS/Cards";

function AnnoncePage() {
  const [annonces, setAnnonces] = useState([]);
  const [filters, setFilters] = useState({});
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const city = params.get("city");

    const fetchAnnonces = async () => {
      try {
        const response = city
          ? await apiHandler.getAnnoncesByCity(city)
          : await apiHandler.getAllAnnonces();
        setAnnonces(response.data);
      } catch (error) {
        console.error("Problème pour récupérer les annonces", error);
      }
    };

    fetchAnnonces();
  }, [location.search]);

  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      const fetchAnnonces = async () => {
        try {
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

      fetchAnnonces();
    }
  }, [filters]);

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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container-allAnnonces">
      <SidebarFiltering onFilterChange={handleFilterChange} />
      <div className="annonces-list">
        {annonces.length > 0 ? (
          annonces.map((annonce) => (
            <Cards
              key={annonce._id}
              annonce={annonce}
              handleFavorite={handleFavorite}
              isFavorite={favorites.includes(annonce._id)}
            />
          ))
        ) : (
          <p>Aucune annonce trouvée pour les critères sélectionnés.</p>
        )}
      </div>
    </div>
  );
}

export default AnnoncePage;
