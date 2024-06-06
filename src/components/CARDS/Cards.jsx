import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Cards.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

function Cards({
  annonce,
  handleFavorite,
  isFavorite,
  showFavoriteIcon = true,
  showDeleteButton = false,
  onDelete,
}) {
  return (
    <div key={annonce._id} className="card">
      <h3>{annonce.kind}</h3>
      <p>{annonce.pet?.petPhoto || annonce.photo}</p>
      <p>{annonce.city}</p>
      <p>{annonce.description}</p>
      <p>
        Du {annonce.startDate} au {annonce.endDate}
      </p>
      {showFavoriteIcon && (
        <p>
          <FontAwesomeIcon
            icon={faHeartSolid}
            onClick={() => handleFavorite && handleFavorite(annonce._id)}
            style={{ color: isFavorite ? "red" : "grey" }}
          />
          Mon annonce préférée
        </p>
      )}
      <Link to={`/annonces/${annonce._id}`}>Voir +</Link>
      {showDeleteButton && (
        <button onClick={() => onDelete(annonce._id)}>Supprimer</button>
      )}
    </div>
  );
}

export default Cards;
