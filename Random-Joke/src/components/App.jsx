import { BrowserRouter } from "react-router-dom";
import { JokeTweet } from "./JokeTweet";

function App() {
  return (
    <>
      <BrowserRouter>
        <JokeTweet />
      </BrowserRouter>
    </>
  );
}

export default App;
