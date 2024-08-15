import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import axios from "axios";

// https://api.freeapi.app/api/v1/public/cats?page=1&limit=4
export const CatListing = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);

  const Catss = async (page) => {
    setLoading(true);
    try {
      const CatsUrl = `https://api.freeapi.app/api/v1/public/cats?page=${page}&limit=4`;
      const response = await axios.get(CatsUrl);
      const data = response.data.data.data;
      setCats((pre) => data);
    } catch (error) {
      console.log("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    Catss();
  }, []);
  //   console.log(cats);

  return (
    <div className="min-h-screen scroll-smooth   bg-slate-600">
      <button onClick={() => Catss(2)}>next</button>
      {/* <div className="text-4xl text-white p-3">Cats Around us</div> */}
      <div className="flex overflow-auto">
        {cats.length &&
          cats.map((cat, i) => {
            return (
              <>
                {!loading ? (
                  <Card key={i} data={cat} />
                ) : (
                  <div className="flex justify-center items-center">
                    Loading...
                  </div>
                )}
                ;
              </>
            );
          })}
      </div>
    </div>
  );
};

/*
    image
    name
    description
    origin
    Temperment
    Lifespan
    learnmore
*/
