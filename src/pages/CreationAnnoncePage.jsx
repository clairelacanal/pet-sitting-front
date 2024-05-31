import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../utils/apiHandler";

function CreationAnnoncePage() {
  const [annonceForm, setAnnonceForm] = useState({
    kind: "",
    photo: "",
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
      navigate("/annonces");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      {error && <div>{error}</div>}
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="kind">
          Catégorie
          <select
            name="kind"
            id="kind"
            onChange={handleChange}
            value={annonceForm.kind}
          >
            <option value="">Sélectionnez...</option>
            <option value="Owner">Propriétaire</option>
            <option value="Sitter">Gardien</option>
          </select>
        </label>
        <label htmlFor="photo">
          Image
          <input type="text" name="photo" id="photo" onChange={handleChange} />
        </label>
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
