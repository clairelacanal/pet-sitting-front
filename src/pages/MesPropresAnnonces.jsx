import { useEffect, useState } from "react";
import apiHandler from "../utils/apiHandler";

function MesPropresAnnonces() {
  const [mesAnnonces, setMesAnnonces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMesAnnonces = async () => {
    try {
      const response = await apiHandler.getMyAnnonces();
      if (response.data) {
        setMesAnnonces(response.data);
      } else {
        console.log("Aucune donnée reçue", response);
      }
    } catch (error) {
      console.error("Erreur lors du chargement de mes annonces", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMesAnnonces();
  }, []);

  if (isLoading) return <div>Loading...</div>; // Affichage pendant le chargement

  const deleteAnnonce = async (annonceId) => {
    try {
      await apiHandler.deleteAnnonceById(annonceId);
      fetchMesAnnonces();
    } catch (error) {
      console.log("erreur lors de la suppression de l'annonce", error);
    }
  };

  return (
    <>
      <h1>Mes propres annonces</h1>
      <div>
        {mesAnnonces.map((annonce) => (
          <div key={annonce._id}>
            <h3>{annonce.kind}</h3>
            <p>{annonce.photo}</p>
            <p>{annonce.city}</p>
            <p>{annonce.description}</p>
            <p>
              Du {annonce.startDate} au {annonce.endDate}
            </p>
            <button onClick={() => deleteAnnonce(annonce._id)}>
              Supprimer
            </button>
            <button>Editer</button>
          </div>
        ))}
        {mesAnnonces.length === 0 && <p>Aucune annonce disponible.</p>}
      </div>
    </>
  );
}

export default MesPropresAnnonces;
