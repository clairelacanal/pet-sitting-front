import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiHandler from "../utils/apiHandler";

function CreationAnnoncePage({ kind }) {
  const { petId } = useParams();
  console.log(petId, "===");
  const [annonceForm, setAnnonceForm] = useState({
    petId: petId,
    kind: kind,
    city: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setAnnonceForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await apiHandler.createAnnonce({
        ...annonceForm,
        startDate: new Date(annonceForm.startDate),
        endDate: new Date(annonceForm.endDate),
      });
      navigate("/mon-profile/mes-propres-annonces");
    } catch (error) {
      console.error("Failed to create annonce", error);
      setError(error.message);
    }
  }

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="city">
          Ville
          <input type="text" name="city" id="city" onChange={handleChange} />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            onChange={handleChange}
          ></textarea>
        </label>
        <label htmlFor="startDate">
          Date de début
          <input
            type="datetime-local"
            name="startDate"
            id="startDate"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="endDate">
          Date de fin
          <input
            type="datetime-local"
            name="endDate"
            id="endDate"
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Valider" />
      </form>
    </div>
  );
}

export default CreationAnnoncePage;
