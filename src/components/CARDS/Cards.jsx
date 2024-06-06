import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
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
    <Card key={annonce._id}>
      <CardMedia
        component="img"
        alt={`Photo de ${annonce.kind}`}
        height="140"
        image={
          annonce.pet?.petPhoto || annonce.photo || "../../assets/logo.jpg"
        }
        title={annonce.kind}
      />
      <CardContent>
        <h3>{annonce.kind}</h3>
        <p>{annonce.city}</p>
        <p>{annonce.description}</p>
        <p>
          Du {annonce.startDate} au {annonce.endDate}
        </p>
      </CardContent>
      <CardActions>
        {showFavoriteIcon && (
          <FontAwesomeIcon
            icon={faHeartSolid}
            onClick={() => handleFavorite && handleFavorite(annonce._id)}
            style={{ color: isFavorite ? "red" : "grey" }}
          />
        )}
        <Link to={`/annonces/${annonce._id}`}>Voir +</Link>
        {showDeleteButton && (
          <Button color="secondary" onClick={() => onDelete(annonce._id)}>
            Supprimer
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Cards;
