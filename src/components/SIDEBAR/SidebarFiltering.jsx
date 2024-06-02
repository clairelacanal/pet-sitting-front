import { useState } from "react";
import "./SidebarFiltering.css";

function SidebarFiltering({ onFilterChange }) {
  const [kind, setKind] = useState("");
  const [healthStatus, setHealthStatus] = useState("");
  const [ageCategory, setAgeCategory] = useState("");
  const [gender, setGender] = useState("");

  // fonction pour gérer les filtres et transmettre au parent
  const handleFilterChange = () => {
    onFilterChange({ kind, healthStatus, ageCategory, gender });
  };

  return (
    <div className="container-sidebar">
      <div>
        <label>Type d'animal:</label>
        <select
          value={kind}
          onChange={(e) => {
            setKind(e.target.value);
            handleFilterChange();
          }}
        >
          <option value="">Tous</option>
          <option value="chien">Chien</option>
          <option value="chat">Chat</option>
          <option value="reptile">Reptile</option>
          <option value="oiseau">Oiseau</option>
          <option value="rongeur">Rongeur</option>
        </select>
      </div>
      <div>
        <label>Âge:</label>
        <select
          value={ageCategory}
          onChange={(e) => {
            setAgeCategory(e.target.value);
            handleFilterChange();
          }}
        >
          <option value="">Tous les âges</option>
          <option value="older">Plus de 5 ans</option>
          <option value="younger">5 ans et moins</option>
        </select>
      </div>
      <div>
        <label>Genre:</label>
        <select
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
            handleFilterChange();
          }}
        >
          <option value="">Tous</option>
          <option value="Male">Male</option>
          <option value="Femelle">Femelle</option>
        </select>
      </div>
      <div>
        <label>Statut de santé:</label>
        <select
          value={healthStatus}
          onChange={(e) => {
            setHealthStatus(e.target.value);
            handleFilterChange();
          }}
        >
          <option value="">Tous</option>
          <option value="sain">Sain</option>
          <option value="en rétablissement">En rétablissement</option>
          <option value="malade">Malade</option>
        </select>
      </div>
      <button onClick={handleFilterChange}>Rechercher</button>
    </div>
  );
}

export default SidebarFiltering;
