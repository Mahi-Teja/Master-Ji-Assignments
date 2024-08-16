import React, { useEffect, useRef, useState } from "react";
import { Card } from "./Card";
import axios from "axios";
import { ChaiCodeLogo } from "../ChaiCodeLogo";

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
      // setTimeout(() => {
      setHaveMore(response?.data?.data?.nextPage);
      setCats((pre) => [...pre, ...data]);
      // }, 10000);
      // console.log("data: ", data);
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
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
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

  // console.log(cats);

  return (
    <div className="h-screen scroll-smooth bg-[#00000067] overflow-hidden catsBg backdrop:opacity-50">
      <div className=" bg-dimmed   "></div>
      {/* <div className="bd-dimmed h-full"></div> */}
      <div className="md:text-[3rem] max-h-fit text-xl font-bold z-10 relative px-3 m-3 text-[#ffffff]">
        Cats around us
      </div>

      <div className="absolute right-4 top-3 z-20">
        <ChaiCodeLogo />
      </div>
      <div ref={currentScroll} className="flex overflow-x-auto p-5 h-full">
        {cats?.length
          ? cats.map((cat, i) => {
              return <Card key={i} data={cat} loading={loading} />;
            })
          : loading && <div className=" translate-x-1/2">loading...</div>}
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
