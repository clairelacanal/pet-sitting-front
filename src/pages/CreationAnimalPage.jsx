import { useState } from "react";
import apiHandler from "../utils/apiHandler";
import { useNavigate } from "react-router-dom";
import "./CreationAnimalPage.css";

function CreationAnimalPage() {
  const [animalForm, setAnimalForm] = useState({
    name: "",
    photoPet: "",
    kindAnimal: "",
    breed: "",
    age: "",
    gender: "",
    healthStatus: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setAnimalForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("mon animal:", animalForm);

    try {
      const response = await apiHandler.createAnnoncePet(animalForm);
      console.log("API response", response);
      navigate("/mon-profile/mes-animaux");
    } catch (error) {
      console.error("API error", error);
      setError(error.message);
    }
  }
  return (
    <div className="container-form">
      {error && <div>{error}</div>}
      <form
        method="post"
        onSubmit={handleSubmit}
        className="creation-formulaire"
      >
        <label htmlFor="name">
          Nom de l'animal
          <input type="text" name="name" id="name" onChange={handleChange} />
        </label>
        <label htmlFor="kindAnimal">
          Catégorie
          <select
            name="kindAnimal"
            id="kindAnimal"
            onChange={handleChange}
            value={animalForm.kindAnimal}
          >
            <option value="">Sélectionnez...</option>
            <option value="chien">Chien</option>
            <option value="chat">Chat</option>
            <option value="reptile">Reptile</option>
            <option value="oiseau">Oiseau</option>
            <option value="rongeur">Rongeur</option>
          </select>
        </label>
        <label htmlFor="photoPet">
          Image
          <input
            type="text"
            name="photoPet"
            id="photoPet"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="breed">
          Race
          <input type="text" name="breed" id="breed" onChange={handleChange} />
        </label>
        <label htmlFor="age">
          age
          <input
            type="number"
            name="age"
            id="age"
            min="0"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="gender">
          Genre
          <select
            name="gender"
            id="gender"
            onChange={handleChange}
            value={animalForm.gender}
          >
            <option value="">Sélectionnez...</option>
            <option value="Male">Mâle</option>
            <option value="Femelle">Femelle</option>
          </select>
        </label>
        <label htmlFor="healthStatus">
          Etat de santé
          <select
            name="healthStatus"
            id="healthStatus"
            onChange={handleChange}
            value={animalForm.healthStatus}
          >
            <option value="">Sélectionnez...</option>
            <option value="sain">Sain</option>
            <option value="en rétablissement">En rétablissement</option>
            <option value="malade">Malade</option>
          </select>
        </label>
        <input type="submit" value="Valider" className="submit" />
      </form>
    </div>
  );
}

export default CreationAnimalPage;
