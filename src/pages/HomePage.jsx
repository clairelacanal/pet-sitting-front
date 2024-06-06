import "./HomePage.css";
import Searchbar from "../components/SEARCHBAR/Searchbar";
import Image from "../assets/pets-font-final.jpg";

function HomePage() {
  return (
    <div className="container-home">
      <div className="container-presentation">
        <div className="presentation">
          <h1>Pet-sitting</h1>
          <p>Le premier site de garde d'animaux</p>
          <p>0 soucis, partez tranquille !</p>
        </div>
        <div className="container-search">
          <Searchbar />
        </div>
      </div>
      <img
        src={Image}
        className="image-presentation"
        alt="image-presentation"
      />
    </div>
  );
}

export default HomePage;
