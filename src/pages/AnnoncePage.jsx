import { useState, useEffect } from "react";
import apiHandler from "../utils/apiHandler";

function AnnoncePage() {
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const response = await apiHandler.getAllAnnonces();
        console.log(response);
        setAnnonces(response.data);
      } catch (error) {
        console.error("Failed to fetch annonces", error);
      }
    };

    fetchAnnonces();
  }, []);

  return (
    <div>
      {annonces.map((annonce) => (
        <div key={annonce.id}>
          <h3>{annonce.kind}</h3>
          <p>{annonce.photo}</p>
          <p>{annonce.city}</p>
          <p>{annonce.description}</p>
          <p>
            Du {annonce.startDate} au {annonce.endDate}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AnnoncePage;
