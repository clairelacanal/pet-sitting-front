import { useState } from "react";
import FormAnnonce from "../components/FORM/Form";
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
      <FormAnnonce
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={annonceForm}
      />
    </div>
  );
}

export default CreationAnnoncePage;
