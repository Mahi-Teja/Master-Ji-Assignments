import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChaiCodeLogo } from "../ChaiCodeLogo";
import "../../assets/jokebg.png";

// "https://api.freeapi.app/api/v1/public/randomjokes/joke/random"

export const JokeTweet = () => {
  const [joke, setJoke] = useState("");
  const [date, setDate] = useState({});
  const [analytics, setAnalytics] = useState({});

  const formatAnalytics = (parameter) => {
    if (parameter >= 1000000)
      parameter = (parameter / 1000000).toFixed(1) + "M";
    else if (parameter >= 1000 && parameter < 1000000)
      parameter = (parameter / 1000).toFixed() + "K";

    return parameter;
  };

  const Random = (min, max) => {
    if (!min) {
      min = 100;
    }
    if (!max) {
      max = 1000000;
    }
    const v = Math.floor(Math.random() * (max - min + 1)) + min;
    // console.log("Random Number is: ",v);
    return Math.round(v);
  };
  const randomDate = () => {
    const minDate = new Date("2005-11-11");
    const maxDate = new Date();
    const ms = Random(minDate.getTime(), maxDate.getTime());
    const d = new Date(ms).toDateString();
    const time = new Date(ms).toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const month = d.split(" ").splice(1, 1).join();
    const dateString = d.split(" ").splice(2).join();
    // console.log(time, month, dateString);
    setDate({
      time: time,
      month: month,
      date: dateString,
    });
    return { time, month, dateString };
  };

  const randomAnalytics = () => {
    let views = Random(5000, 50000000);
    let likes = Random(100, views);
    let Rt = Random(likes * 0.4, views * 0.5);
    let comments = Random(likes * 0.7, views * 0.4);
    let bm = Random(Rt - 0.5, views * 0.2);
    // console.log({ views, likes, Rt, comments, bm });
    views = formatAnalytics(views);
    likes = formatAnalytics(likes);
    Rt = formatAnalytics(Rt);
    comments = formatAnalytics(comments);
    bm = formatAnalytics(bm);
    setAnalytics({
      views,
      likes,
      Rt,
      comments,
      bm,
    });
  };

  useEffect(() => {
    const getJoke = async () => {
      try {
        const response = await axios.get(
          "https://api.freeapi.app/api/v1/public/randomjokes/joke/random"
        );
        // console.log(response.data.data.content);
        setJoke(response.data.data.content);
      } catch (error) {
        console.log(error);
        setJoke("error loading the joke");
      }
    };
    getJoke();
    randomDate();
    randomAnalytics();
  }, []);

  return (
    <main className="flex justify-center h-screen items-center relative tweetBg  ">
      <section className="w-[40rem] m-px bg-black rounded-xl p-6 font-inter  text-white">
        <nav className="flex items-center ">
          <div className="p-2">
            <svg
              width="15"
              height="12"
              viewBox="0 0 15 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.7713 5.63915L1.32133 5.63915M1.32133 5.63915L5.99008 10.3539M1.32133 5.63915L5.99008 0.924416"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="p-2 font-bold">Post</div>
        </nav>
        <Profile />
        {/* Joke */}
        <div className="text-sm lg:text-xl w-full py-2 m-2">
          {!joke ? <p className="text-center ">Loading...</p> : joke}
        </div>
        {/* timestamp */}
        <section className="flex text-[#71767B] p-2 text-[10px] md:text-sm">
          <div className="mx-1">{date.time}</div>
          <p>·</p>

          <div className="mx-1">
            {date.month} {date.date}
          </div>
          <p>·</p>
          <div className="mx-1">
            <span className="font-bold text-white mx-1">{analytics.views}</span>
            Views
          </div>
        </section>
        {/* Analytics */}
        <Analytics analytics={analytics} />
        <footer className=" text-[#71767B] text-xs mt-3 text-center align-middle  ">
          <p className=""> © chai aur code</p>
        </footer>
      </section>
      <div className="absolute right-4 bottom-14">
        <ChaiCodeLogo />
      </div>
    </main>
  );
};

const Profile = () => {
  return (
    <section className="flex text-xs m-1">
      <img
        className="h-10 w-10 md:h-14 md:w-14 mx-1 object-cover rounded-full"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbI3NcVlpsW3HwnkmkQbM3BmaWoAjlhN35fQ&s"
        alt="elon-profile-pic"
        srcSet=""
      />
      <section>
        <div className="flex items-center justify-center text-sm font-semibold">
          <div className=" mx-1 md:text-xl">Elon Musk</div>
          <div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.79018 0.857425C7.38173 0.358559 6.61885 0.358561 6.21046 0.857425L5.63187 1.5641C5.59221 1.61254 5.52606 1.63027 5.4675 1.60815L4.6131 1.28543C4.00996 1.05762 3.34929 1.43905 3.245 2.0753L3.09729 2.97659C3.08716 3.03837 3.03874 3.08679 2.97696 3.09692L2.07567 3.24463C1.43943 3.34892 1.05798 4.00959 1.2858 4.61273L1.60851 5.46713C1.63063 5.5257 1.61291 5.59185 1.56447 5.6315L0.857793 6.21006C0.358928 6.61851 0.358929 7.3814 0.857793 7.78985L1.56447 8.3684C1.61291 8.40806 1.63063 8.47421 1.60851 8.53278L1.2858 9.38719C1.05799 9.9903 1.43942 10.651 2.07567 10.7553L2.97696 10.903C3.03874 10.9131 3.08716 10.9615 3.09729 11.0233L3.245 11.9246C3.34929 12.5608 4.00996 12.9423 4.6131 12.7145L5.4675 12.3918C5.52606 12.3697 5.59221 12.3873 5.63187 12.4358L6.21046 13.1425C6.61885 13.6413 7.38173 13.6413 7.79018 13.1425L8.36873 12.4358C8.4084 12.3873 8.47455 12.3697 8.53312 12.3918L9.38753 12.7145C9.99069 12.9423 10.6514 12.5608 10.7556 11.9246L10.9034 11.0233C10.9135 10.9615 10.9619 10.9131 11.0237 10.903L11.925 10.7553C12.5612 10.651 12.9427 9.9903 12.7149 9.38719L12.3921 8.53278C12.37 8.47421 12.3877 8.40806 12.4361 8.3684L13.1429 7.78985C13.6417 7.3814 13.6417 6.61851 13.1429 6.21006L12.4361 5.6315C12.3877 5.59185 12.37 5.5257 12.3921 5.46713L12.7149 4.61273C12.9427 4.00959 12.5612 3.34892 11.925 3.24463L11.0237 3.09692C10.9619 3.08679 10.9135 3.03837 10.9034 2.97659L10.7556 2.0753C10.6514 1.43906 9.99069 1.05761 9.38753 1.28543L8.53312 1.60815C8.47455 1.63027 8.4084 1.61254 8.36873 1.5641L7.79018 0.857425Z"
                fill="#1C9BEF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.5177 4.64914C10.6885 4.81999 10.6885 5.097 10.5177 5.26785L6.43434 9.35117C6.35232 9.43324 6.24102 9.47933 6.12499 9.47933C6.00897 9.47933 5.89767 9.43324 5.81564 9.35117L3.4823 7.01784C3.31145 6.84698 3.31145 6.57001 3.4823 6.39915C3.65315 6.22829 3.93017 6.22829 4.10102 6.39915L6.12499 8.42309L9.89899 4.64914C10.0698 4.47828 10.3468 4.47828 10.5177 4.64914Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
        <p className="text-[#71767B] mx-1 md:text-lg">@elonmusk</p>
      </section>
    </section>
  );
};

const Analytics = ({ analytics }) => {
  return (
    <section className="flex justify-evenly items-center text-[8px] md:text-sm text-[#71767B] border-t border-b border-b-[#71767B] border-t-[#71767B] p-3">
      {/* comments */}
      <div className="flex items-center justify-center">
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 4.09653C0 1.83319 1.79873 0 4.01753 0H6.20873C8.46216 0 10.2885 1.86392 10.2885 4.16309C10.2885 5.67881 9.48198 7.07163 8.18262 7.80388L4.14049 10.0877V8.19817H4.10687C1.85344 8.24938 0 6.40082 0 4.09653ZM4.01753 1.02413C2.3528 1.02413 1.00376 2.40159 1.00376 4.09653C1.00376 5.82219 2.39396 7.20988 4.08428 7.17404L4.26044 7.16892H5.14425V8.34667L7.6973 6.90777C8.67647 6.35473 9.28474 5.305 9.28474 4.16309C9.28474 2.42719 7.90759 1.02413 6.20873 1.02413H4.01753Z"
            fill="#71767B"
          />
        </svg>
        <p className="px-1">{analytics.comments}</p>
      </div>

      {/* ReTweets */}
      <div className="flex items-center justify-center">
        <svg
          width="12"
          height="9"
          viewBox="0 0 12 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.93171 0L4.99998 2.10842L4.36344 2.85197L3.39837 1.86906V6.17249C3.39837 6.7327 3.81651 7.19105 4.33171 7.19105H6.89838V8.20961H4.33171C3.30084 8.20961 2.46504 7.298 2.46504 6.17249V1.86906L1.49997 2.85197L0.863434 2.10842L2.93171 0ZM8.53172 1.07968H5.96505V0.0611137H8.53172C9.56259 0.0611137 10.3984 0.972727 10.3984 2.09824V6.40166L11.3635 5.41875L12 6.1623L9.93172 8.27073L7.86345 6.1623L8.49999 5.41875L9.46505 6.40166V2.09824C9.46505 1.53803 9.04692 1.07968 8.53172 1.07968Z"
            fill="#71767B"
          />
        </svg>

        <p className="px-1">{analytics.Rt}</p>
      </div>

      {/* likes  */}
      <div className="flex items-center justify-center">
        <svg
          width="12"
          height="11"
          viewBox="0 0 12 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.81811 1.15068C8.08494 1.11613 7.21076 1.44437 6.48419 2.39453L6.0012 3.02222L5.51762 2.39453C4.79044 1.44437 3.91566 1.11613 3.18249 1.15068C2.43671 1.19099 1.77313 1.59985 1.43654 2.25057C1.10535 2.89553 1.05675 3.85146 1.72393 5.02621C2.36831 6.16065 3.67807 7.48512 6.0012 8.83263C8.32313 7.48512 9.63229 6.16065 10.2767 5.02621C10.9432 3.85146 10.8946 2.89553 10.5629 2.25057C10.2263 1.59985 9.56329 1.19099 8.81811 1.15068ZM11.3302 5.57903C10.5197 7.00716 8.92971 8.52743 6.30299 9.99587L6.0012 10.1686L5.69881 9.99587C3.07149 8.52743 1.48154 7.00716 0.669765 5.57903C-0.14621 4.13938 -0.176209 2.78036 0.361374 1.73805C0.893558 0.707267 1.94953 0.0623056 3.12189 0.00471975C4.11246 -0.0471075 5.14263 0.327201 6.0006 1.1622C6.85797 0.327201 7.88814 -0.0471075 8.87811 0.00471975C10.0505 0.0623056 11.1064 0.707267 11.6386 1.73805C12.1762 2.78036 12.1462 4.13938 11.3302 5.57903Z"
            fill="#71767B"
          />
        </svg>

        <p className="px-1">{analytics.likes}</p>
      </div>

      {/* bookmarks */}
      <div className="flex items-center justify-center">
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.14032 1.33006C0.14032 0.595869 0.661894 0 1.30559 0H6.43277C7.07647 0 7.59804 0.595869 7.59804 1.33006V11.1406L3.86918 8.10275L0.14032 11.1406V1.33006ZM1.30559 1.06405C1.17694 1.06405 1.07253 1.1811 1.07253 1.33006V9.07636L3.86918 6.79397L6.66583 9.07636V1.33006C6.66583 1.1811 6.56142 1.06405 6.43277 1.06405H1.30559Z"
            fill="#71767B"
          />
        </svg>

        <p className="px-1">{analytics.comments}</p>
      </div>
      {/* share */}
      <div className="flex mx-2">
        <svg
          width="10"
          height="9"
          viewBox="0 0 10 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.58829 0L7.49421 2.78653L6.77538 3.48072L5.0981 1.86746V6.55568H4.07848V1.86746L2.39611 3.48072L1.67727 2.78653L4.58829 0ZM9.17658 6.06681L9.16638 7.78273C9.16638 8.45736 8.5954 9 7.89186 9H1.27453C0.565889 9 0 8.45247 0 7.77784V6.06681H1.01962V7.77784C1.01962 7.91472 1.13178 8.02227 1.27453 8.02227H7.89186C8.03461 8.02227 8.14676 7.91472 8.14676 7.77784L8.15696 6.06681H9.17658Z"
            fill="#71767B"
          />
        </svg>
      </div>
    </section>
  );
};
