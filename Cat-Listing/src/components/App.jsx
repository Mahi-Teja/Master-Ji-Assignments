import { useState } from "react";
import { CatListing } from "./CatListing";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CatListing />
    </>
  );
}

export default App;
