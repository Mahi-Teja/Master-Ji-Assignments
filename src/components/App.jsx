import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <p>Click On the below links to navigate</p>
      <Link className="p-2 underline cursor-pointer" to={"/random-user"}>
        Random User
      </Link>
      <Link className="p-2 underline cursor-pointer" to={"/random-joke"}>
        Random joke
      </Link>
      <Link className="p-2 underline cursor-pointer" to={"/cats-listing"}>
        cats-listing
      </Link>
    </>
  );
}

export default App;
