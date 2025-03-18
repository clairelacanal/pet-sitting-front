import { useEffect, useState } from "react";
import apiHandler from "../utils/apiHandler";
import Cards from "../components/CARDS/Cards";

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

  const deleteAnnonce = async (annonceId) => {
    try {
      await apiHandler.deleteAnnonceById(annonceId);
      setMesAnnonces(
        mesAnnonces.filter((annonce) => annonce._id !== annonceId)
      );
    } catch (error) {
      console.log("Erreur lors de la supression de l'annonce", error);
    }
  };

  useEffect(() => {
    fetchMesAnnonces();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h1>Mes propres annonces</h1>
      <div style={{ display: 'flex' }}>
        {mesAnnonces.map((annonce) => (
          <Cards
            key={annonce._id}
            annonce={annonce}
            showFavoriteIcon={false}
            showDeleteButton={true}
            onDelete={deleteAnnonce}
          />
        ))}
        {mesAnnonces.length === 0 && <p>Vous n'avez pas encore d'annonce.</p>}
      </div>
    </>
  );
}

export default MesPropresAnnonces;
