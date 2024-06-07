import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <Link to="https://github.com/clairelacanal/pet-sitting-front">
        Fait avec <span>♥</span> et une touche de créativité par Claire Lacanal
      </Link>
    </footer>
  );
}

export default Footer;
