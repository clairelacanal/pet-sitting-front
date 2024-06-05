import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiHandler from "../utils/apiHandler";
import FormAnnonce from "../components/FORM/Form";

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
      <FormAnnonce
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={annonce}
      />
    </div>
  );
}

export default EditAnnonce;
