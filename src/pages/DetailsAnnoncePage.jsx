import {  Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiHandler from "../utils/apiHandler";


function DetailsAnnoncePage() {
  const { annonceId } = useParams();
  const [annonce, setAnnonce] = useState(null);

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
      <h1>Détails de mon annonce</h1>
      <div className="card">
      <h2>{annonce.kind}</h2>
      <p>{annonce.photo}</p>
      <p>{annonce.city}</p>
      <p>{annonce.description}</p>
      <p>
        Du {annonce.startDate} au {annonce.endDate}
      </p>
      <Link to={`/mon-profile/mes-propres-annonces/editer/${annonceId}`}>Edit annonce</Link>
    </div>
    </div>
    
  );
}

export default DetailsAnnoncePage;
