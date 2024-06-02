import { useState } from "react";
import apiHandler from "../../utils/apiHandler";

function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  // Fonction pour gérer les changements de la barre de recherche
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Fonction pour effectuer la recherche
  const handleSearch = async () => {
    if (!searchTerm) {
      alert("Veuillez entrer un terme de recherche.");
      return;
    }
    try {
      const response = await apiHandler.getAnnoncesByCity(searchTerm);
      setResults(response.data); // Stocker les résultats de la recherche dans l'état
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      alert("Erreur lors de la recherche");
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Recherche par ville..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearch}>Rechercher</button>
      {results.length > 0 && (
        <ul>
          {results.map((annonce, index) => (
            <li key={index}>
              {annonce.city} - {annonce.description}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Searchbar;
