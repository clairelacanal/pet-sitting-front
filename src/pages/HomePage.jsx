import Searchbar from "../components/SEARCHBAR/Searchbar";
import SidebarFiltering from "../components/SIDEBAR/SidebarFiltering";

function HomePage() {
  return (
    <>
      <h1>Je suis la homepage</h1>
      <SidebarFiltering />
      <Searchbar />
    </>
  );
}

export default HomePage;
