import { useState } from "react";
import "./SidebarFiltering.css";

function SidebarFiltering({ onFilterChange }) {
  const [kindAnimal, setKindAnimal] = useState("");
  const [healthStatus, setHealthStatus] = useState("");
  const [ageCategory, setAgeCategory] = useState("");
  const [gender, setGender] = useState("");

  const handleFilterChange = () => {
    onFilterChange({ kindAnimal, healthStatus, ageCategory, gender });
  };

  return (
    <div className="sidebar-container">
      <div className="filter-group">
        <label htmlFor="animal-type">Type:</label>
        <select
          id="animal-type"
          className="select-input"
          value={kindAnimal}
          onChange={(e) => {
            setKindAnimal(e.target.value);
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
      <div className="filter-group">
        <label htmlFor="age-category">Âge:</label>
        <select
          id="age-category"
          className="select-input"
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
      <div className="filter-group">
        <label htmlFor="gender">Genre:</label>
        <select
          id="gender"
          className="select-input"
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
            handleFilterChange();
          }}
        >
          <option value="">Tous</option>
          <option value="Male">Mâle</option>
          <option value="Femelle">Femelle</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="health-status">Statut:</label>
        <select
          id="health-status"
          className="select-input"
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
      <button className="search-button">Rechercher</button>
    </div>
  );
}

export default SidebarFiltering;
