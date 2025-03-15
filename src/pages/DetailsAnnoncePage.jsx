import {  useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiHandler from "../utils/apiHandler";


function DetailsAnnoncePage() {
  const { annonceId } = useParams();
  const [annonce, setAnnonce] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnonceDetail = async () => {
      try {
        const response = await apiHandler.getAnnonceById(annonceId);
        setAnnonce(response.data);
      } catch (error) {
        console.error("impossible d'afficher les détails", error);
      }
    };

    fetchAnnonceDetail();
  }, [annonceId]);

  if (!annonce) return <div>Loading...</div>;

  return (
    <div>
      <h1>{annonce.kind}</h1>
      <p>{annonce.photo}</p>
      <p>{annonce.city}</p>
      <p>{annonce.description}</p>
      <p>
        Du {annonce.startDate} au {annonce.endDate}
      </p>
      <button onClick={() => navigate(`/mon-profile/mes-propres-annonces/editer/${annonceId}`)}>
        Edit Annonce
      </button>
    </div>
  );
}

export default DetailsAnnoncePage;
