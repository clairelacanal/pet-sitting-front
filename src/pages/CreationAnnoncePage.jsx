import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import apiHandler from "../utils/apiHandler";

function CreationAnnoncePage() {
  const [annonceForm, setAnnonceForm] = useState({
    kind: "",
    photo: "",
    city: "",
    description: "",
    date: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setAnnonceForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await apiHandler.createAnnonce(annonceForm);

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
          <input type="text" name="kind" id="kind" onChange={handleChange} />
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
        <label htmlFor="date">
          Date
          <textarea name="date" id="date" onChange={handleChange}></textarea>
        </label>
        <input type="submit" value="Valider" />
      </form>
    </div>
  );
}

export default CreationAnnoncePage;
