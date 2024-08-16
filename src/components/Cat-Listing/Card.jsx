import React from "react";

export const Card = ({ data }) => {
  // const data = {
  //   name: "CATname",
  //   image: "https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg",
  //   description: "losdjkahd jkdh asd asdjkas djkas djhd blassjadsd asjk d",
  //   origin: "Egypt",
  //   temperament: "Active, Energetic, Independent, Intelligent, Gentle",
  //   life_span: "15-20",
  // };
  //   console.log(data);
  return (
    <section className="Card flex flex-col flex-nowrap min-w-full md:min-w-[495px] h-[600px] relative pb-3 rounded-xl mx-4 shadow-md bg-white">
      <div className="img h-[40%] rounded-t-lg  overflow-hidden">
        <img
          className="h-full w-full min-w-fit object-cover"
          src={data?.image}
          alt="cat-image"
          srcSet=""
        />
      </div>
      <div className="h-[60%]">
        <div className="content px-3">
          <div className="title text-2xl font-semibold my-2">{data?.name}</div>
          <div className="description text-sm">{data?.description}</div>
        </div>
        <div className="extraInfo mb-2 p-3 flex flex-col">
          <div className="origin flex m-1 w-2/3 justify-between">
            <div className="font-semibold">Origin</div>
            <div className="">{data?.origin}</div>
          </div>
          <div className="tempermen m-1 flex flex-col ">
            <div className=" font-semibold">Temperament </div>
            <div className="flex justify-start text-sm items-center flex-wrap">
              {data?.temperament?.split(",").map((item, i) => {
                return <TemperamentItem key={i} item={item} />;
              })}
            </div>
          </div>
          <div className="lifespan flex m-1 w-2/3 justify-between ">
            <div className="font-semibold">Life Span </div>
            <div className="">{data?.life_span} years</div>
          </div>
        </div>
        <p className="text-blue-500 p-2 left-2  absolute bottom-0">
          <a
            href={data?.wikipedia_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </p>
      </div>
    </section>
  );
};

const TemperamentItem = ({ item }) => {
  return (
    <div className="p-1 px-2 m-1 bg-[#EFEFEF] cursor-pointer rounded-full hover:bg-[#D482DB] hover:text-white">
      {item}
    </div>
  );
};
