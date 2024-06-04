import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiHandler from "../utils/apiHandler";

function EditAnnonce() {
  const { annonceId } = useParams();
  const navigate = useNavigate();
  const [annonce, setAnnonce] = useState({
    city: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        const response = await apiHandler.getAnnonceById(annonceId);
        setAnnonce(response.data);
      } catch (error) {
        console.error("impossible d'afficher les détails", error);
      }
    };

    fetchAnnonce();
  }, [annonceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnonce((prevAnnonce) => ({ ...prevAnnonce, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(annonce);
    try {
      await apiHandler.updateAnnonce(annonceId, annonce);
      navigate("/mon-profile/mes-propres-annonces");
    } catch (error) {
      setError("Erreur lors de la mise à jour: " + error.message);
    }
  };

  return (
    <div>
      <h1>Modifier Annonce</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="city">
          Ville
          <input
            type="text"
            name="city"
            id="city"
            value={annonce.city}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            value={annonce.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <label htmlFor="startDate">
          Date de début
          <input
            type="datetime-local"
            name="startDate"
            id="startDate"
            value={annonce.startDate.slice(0, 16)}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="endDate">
          Date de fin
          <input
            type="datetime-local"
            name="endDate"
            id="endDate"
            value={annonce.endDate.slice(0, 16)}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Mettre à jour" />
      </form>
    </div>
  );
}

export default EditAnnonce;
