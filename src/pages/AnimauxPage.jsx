import { useEffect, useState } from "react";
import apiHandler from "../utils/apiHandler";

function AnimauxPage() {
  const [annoncesPet, setAnnoncesPet] = useState([]);

  useEffect(() => {
    const fetchAnnoncesPet = async () => {
      try {
        const response = await apiHandler.getAllAnnoncesPet();
        setAnnoncesPet(response.data);
      } catch (error) {
        console.log("Erreur pour récupérer ma liste d'animaux", error);
      }
    };
    fetchAnnoncesPet();
  }, []);

  return (
    <div className="container-pets">
      <div className="list-pets">
        {annoncesPet.length > 0 ? (
          annoncesPet.map((pet) => (
            <div key={pet._id}>
              <p>Nom: {pet.name}</p>
              <p>Photo: {pet.photo}</p>
              <p>Type: {pet.kindAnimal}</p>
              <p>Race: {pet.breed}</p>
              <p>Age: {pet.age}</p>
              <p>Genre: {pet.gender}</p>
              <p>État de santé: {pet.healthStatus}</p>
              <button>Delete</button>
              <button>Details</button>
            </div>
          ))
        ) : (
          <p>Vous n'avez pas encore créé de fiche animal.</p>
        )}
      </div>
    </div>
  );
}

export default AnimauxPage;
