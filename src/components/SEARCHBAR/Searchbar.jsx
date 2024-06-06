import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../../utils/apiHandler";
import "./Searchbar.css";

function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // useHistory n'existe plus, je remplace par useNavigate

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); //ma nouvelle valeur rentrée dans l'input change mon state
  };

  // Fonction pour effectuer la recherche
  const handleSearch = async () => {
    try {
      await apiHandler.getAnnoncesByCity(searchTerm);
      navigate(`/annonces?city=${encodeURIComponent(searchTerm)}`); // Remplace history.push et m'envoie sur la page Annonces
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Recherche par ville..."
        className="search-input"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearch} className="search">
        Rechercher
      </button>
    </div>
  );
}

export default Searchbar;
