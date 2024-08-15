import React, { useEffect, useRef, useState } from "react";
import { Card } from "./Card";
import axios from "axios";

// https://api.freeapi.app/api/v1/public/cats?page=1&limit=4
export const CatListing = () => {
  const currentScroll = useRef(null);
  const [cats, setCats] = useState([]);
  const [haveMore, setHaveMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const Catss = async (page = 1) => {
    setLoading(true);
    try {
      const CatsUrl = `https://api.freeapi.app/api/v1/public/cats?page=${page}&limit=4`;
      const response = await axios.get(CatsUrl);
      const data = response.data.data.data;

      setHaveMore(response?.data?.data?.nextPage);
      setCats((pre) => [...pre, ...data]);
      console.log("data: ", data);
    } catch (error) {
      console.log("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  //   console.log(page);
  const handleScroll = () => {
    if (currentScroll.current) {
      const { scrollLeft, scrollWidth, clientWidth } = currentScroll.current;
      if (scrollLeft + clientWidth >= scrollWidth - 200) {
        if (!loading && haveMore) {
          const nextPage = Math.ceil(cats.length / 4) + 1;
          Catss(nextPage);
        }
      }
    }
  };
  useEffect(() => {
    Catss();
  }, []);

  useEffect(() => {
    const container = currentScroll.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [cats, loading, haveMore]);

  console.log(cats);

  return (
    <div className="max-h-screen scroll-smooth py-3  bg-slate-600">
      {/* <div className="text-4xl text-white p-3">Cats Around us</div> */}
      <div ref={currentScroll} className="flex overflow-auto h-[80%">
        {cats.length &&
          cats.map((cat, i) => {
            return <Card key={i} data={cat} loading={loading} />;
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
