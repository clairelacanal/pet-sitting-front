import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiHandler from "../utils/apiHandler";

function AnimalDetails() {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPetDetail = async () => {
      try {
        const response = await apiHandler.getAnnoncePetById(petId);
        setPet(response.data);
      } catch (error) {
        console.error("impossible d'afficher les détails de l'animal", error);
      }
    };

    fetchPetDetail();
  }, [petId]);

  if (!pet) return <div>Loading...</div>;

  return (
    <div>
      <h1>{pet.name}</h1>
      <p>{pet.photoPet}</p>
      <p>{pet.kindAnimal}</p>
      <p>{pet.breed}</p>
      <p>{pet.age}</p>
      <p>{pet.gender}</p>
      <p>{pet.healthStatus}</p>
      <button>Créer une annonce</button>
    </div>
  );
}

export default AnimalDetails;
