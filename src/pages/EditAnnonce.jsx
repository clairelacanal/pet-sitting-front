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

  
  const toLocalDateTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().slice(0, 16); 
  };

  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        const response = await apiHandler.getAnnonceById(annonceId);
        const data = response.data;
        setAnnonce({
          ...data,
          startDate: toLocalDateTime(data.startDate),
          endDate: toLocalDateTime(data.endDate)
        });
      } catch (error) {
        console.error("Impossible d'afficher les détails", error);
        setError(error.message);
      }
    };

    fetchAnnonce();
  }, [annonceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnonce(prevAnnonce => ({ ...prevAnnonce, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiHandler.updateAnnonce(annonceId, {
        ...annonce,
        startDate: new Date(annonce.startDate).toISOString(),
        endDate: new Date(annonce.endDate).toISOString()
      });
      navigate("/mon-profile/mes-propres-annonces");
    } catch (error) {
      setError("Erreur lors de la mise à jour: " + error.message);
    }
  };

  return (
    <div>
      <h1>Modifier une annonce</h1>
      {error && <div>{error}</div>}
      <FormAnnonce
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={annonce}
        title="Modifier une annonce" 
      />
    </div>
  );
}

export default EditAnnonce;
