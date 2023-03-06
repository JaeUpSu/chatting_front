import { useEffect } from "react";

function Home() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return <div>Home</div>;
}

export default Home;
