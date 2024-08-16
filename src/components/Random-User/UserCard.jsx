import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChaiCodeLogo } from "../ChaiCodeLogo";

// https://api.freeapi.app/api/v1/public/randomusers/user/random
function UserCard() {
  const [User, setUser] = useState({});
  const [fetchh, setFetch] = useState(true);
  useEffect(() => {
    fetch(
      "https://api.freeapi.app/api/v1/public/randomusers/user/random",
      {},
      {
        credentials: true,
      }
    ).then((r) => {
      const data = r.json().then((d) => {
        setUser(d.data);
      });
    });
  }, [fetchh]);

  const handleRefresh = (e) => {
    setFetch(!fetchh);
  };
  const handleCall = () => {
    const cell = User?.cell;
    window.location.href = `tel:${cell}`;
  };
  const dateFormatted = (string) => {
    const d = new Date(string);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[d.getMonth()];
    const day = d.getDate();
    const year = d.getFullYear();
    return `${day} ${month},${year}`;
  };

  return (
    <main className="bg-[#B6B3F3] px-6 h-screen flex flex-col items-center">
      <div className="    w-[32rem]">
        <nav className=" p-3">
          <ul className="flex justify-between items-center">
            <li>
              <svg
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 7L1 7M1 7L7 13M1 7L7 1"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </li>
            <li className="font-text-dm">Profile Overview</li>
            <li onClick={handleRefresh} className=" cursor-pointer">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.65 2.35C12.2 0.9 10.21 0 8.00001 0C3.58001 0 0.0100098 3.58 0.0100098 8C0.0100098 12.42 3.58001 16 8.00001 16C11.73 16 14.84 13.45 15.73 10H13.65C12.83 12.33 10.61 14 8.00001 14C4.69001 14 2.00001 11.31 2.00001 8C2.00001 4.69 4.69001 2 8.00001 2C9.66001 2 11.14 2.69 12.22 3.78L9.00001 7H16V0L13.65 2.35Z"
                  fill="black"
                />
              </svg>
            </li>
          </ul>
        </nav>

        <section className="flex flex-col justify-center items-center mt-8">
          <div className="relative">
            <p className="bg-black rounded-xl text-white absolute w-5 h-4 text-[8px] flex items-center justify-center top-0 -right-5 px-1 min-w-min ">
              {User?.name?.title}
            </p>
            <img
              className="rounded-full w-24 h-24 object-cover relative"
              src={User?.picture?.large}
              alt="profile-picture"
              srcSet=""
            />
          </div>
          <div className="">
            <div className="font-donegal text-2xl m-2">
              <span>{User?.name?.first} </span>
              <span>{User?.name?.last}</span>
            </div>
            <p className="text-center m-2">{User?.login?.username}</p>
          </div>
        </section>

        <section className="flex justify-center p-4 border-t border-b border-t-[#00000014] border-b-[#00000014]  ">
          <div className="flex mx-2">
            <Link
              to={`https://www.google.com/maps/?q=${User?.location?.coordinates?.latitude},${User?.location?.coordinates?.longitude}`}
              target="blank"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="11" cy="11" r="11" fill="black" />
                <path
                  d="M11 3.4375C9.54131 3.4375 8.14236 4.01696 7.11091 5.04841C6.07946 6.07986 5.5 7.47881 5.5 8.9375C5.5 12.65 10.3469 16.8438 10.5531 17.0225C10.6777 17.129 10.8361 17.1875 11 17.1875C11.1639 17.1875 11.3223 17.129 11.4469 17.0225C11.6875 16.8438 16.5 12.65 16.5 8.9375C16.5 7.47881 15.9205 6.07986 14.8891 5.04841C13.8576 4.01696 12.4587 3.4375 11 3.4375ZM11 15.5719C9.53562 14.1969 6.875 11.2337 6.875 8.9375C6.875 7.84348 7.3096 6.79427 8.08318 6.02068C8.85677 5.2471 9.90598 4.8125 11 4.8125C12.094 4.8125 13.1432 5.2471 13.9168 6.02068C14.6904 6.79427 15.125 7.84348 15.125 8.9375C15.125 11.2337 12.4644 14.2037 11 15.5719ZM11 6.1875C10.4561 6.1875 9.92442 6.34878 9.47218 6.65096C9.01995 6.95313 8.66747 7.38262 8.45933 7.88512C8.25119 8.38762 8.19673 8.94055 8.30284 9.474C8.40895 10.0074 8.67086 10.4974 9.05546 10.882C9.44005 11.2666 9.93005 11.5286 10.4635 11.6347C10.9969 11.7408 11.5499 11.6863 12.0524 11.4782C12.5549 11.27 12.9844 10.9176 13.2865 10.4653C13.5887 10.0131 13.75 9.4814 13.75 8.9375C13.75 8.20815 13.4603 7.50868 12.9445 6.99296C12.4288 6.47723 11.7293 6.1875 11 6.1875ZM11 10.3125C10.7281 10.3125 10.4622 10.2319 10.2361 10.0808C10.01 9.92968 9.83374 9.71494 9.72967 9.46369C9.6256 9.21244 9.59837 8.93597 9.65142 8.66925C9.70447 8.40253 9.83543 8.15753 10.0277 7.96523C10.22 7.77293 10.465 7.64197 10.7318 7.58892C10.9985 7.53587 11.2749 7.5631 11.5262 7.66717C11.7774 7.77124 11.9922 7.94747 12.1433 8.17359C12.2944 8.39971 12.375 8.66555 12.375 8.9375C12.375 9.30217 12.2301 9.65191 11.9723 9.90977C11.7144 10.1676 11.3647 10.3125 11 10.3125Z"
                  fill="white"
                />
              </svg>
            </Link>
            <p className="mx-2">location</p>
          </div>
          <div className="flex mx-2">
            <svg
              onClick={handleCall}
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="11" fill="black" />
              <path
                d="M15.5409 12.5782L14.5587 11.596C14.2659 11.3056 13.8707 11.1418 13.4583 11.1401C13.0459 11.1383 12.6493 11.2987 12.3541 11.5866C12.1965 11.7451 11.9887 11.8437 11.7663 11.8654C11.5439 11.8872 11.3209 11.8308 11.1357 11.7059C10.4045 11.2179 9.77629 10.5909 9.28688 9.86062C9.16418 9.67329 9.10979 9.4494 9.13289 9.22665C9.15598 9.00391 9.25515 8.79593 9.41368 8.63776C9.69901 8.34223 9.85732 7.94676 9.85473 7.53597C9.85215 7.12519 9.68886 6.73174 9.39984 6.43982L8.41763 5.45761C8.12357 5.16455 7.72534 5 7.31019 5C6.89503 5 6.49681 5.16455 6.20274 5.45761L5.92014 5.74066C4.44682 7.21399 4.5571 10.3115 7.62248 13.3752C9.47082 15.224 11.3312 15.9981 12.8398 15.9981C13.2839 16.0129 13.7265 15.9392 14.1417 15.7812C14.557 15.6232 14.9367 15.3842 15.2587 15.078L15.5418 14.7949C15.8354 14.5007 16.0002 14.102 16 13.6864C15.9998 13.2708 15.8347 12.8722 15.5409 12.5782ZM14.9096 14.1636L14.6265 14.4467C13.4657 15.6075 10.9035 15.3954 8.25288 12.7443C5.60226 10.0932 5.38974 7.52919 6.55054 6.36839L6.83136 6.08578C6.9578 5.9598 7.12902 5.88906 7.30751 5.88906C7.486 5.88906 7.65721 5.9598 7.78365 6.08578L8.76586 7.068C8.89001 7.19276 8.96047 7.36111 8.96223 7.53711C8.96398 7.71311 8.89688 7.88282 8.77524 8.01003C8.47356 8.31364 8.28537 8.7117 8.24221 9.13753C8.19905 9.56336 8.30354 9.99109 8.53817 10.3491C9.09426 11.1812 9.80935 11.8953 10.6423 12.4501C10.9992 12.6848 11.4258 12.7899 11.8509 12.7479C12.2759 12.7059 12.6737 12.5193 12.9778 12.2193C13.1047 12.0962 13.2749 12.0279 13.4517 12.029C13.6286 12.03 13.7979 12.1005 13.9234 12.2251L14.9056 13.2073C14.9689 13.2697 15.0192 13.344 15.0537 13.4259C15.0882 13.5078 15.1061 13.5958 15.1065 13.6846C15.1069 13.7735 15.0897 13.8616 15.0559 13.9438C15.0221 14.026 14.9724 14.1007 14.9096 14.1636Z"
                fill="white"
              />
            </svg>
            <p className="mx-2">callme</p>
          </div>
        </section>

        <section className="grid grid-cols-2 mx-5 gap-4  ">
          <Field lable={"city"} content={User?.location?.city} />

          <Field lable={"Nationality"} content={User?.nat} img={true} />
          <Field
            lable={"Date of birth"}
            content={dateFormatted(User?.dob?.date)}
          />
          <Field lable={"Phone No."} content={User?.phone} />
          <Field
            lable={"Time Zone"}
            content={`${User?.location?.timezone?.offset}(
              ${User?.location?.timezone?.description})
            `}
          />
          <Field
            lable={"Registered Since"}
            content={dateFormatted(User?.registered?.date)}
          />
        </section>
      </div>

      <div className="absolute right-4 bottom-14">
        <ChaiCodeLogo />
      </div>
      <p className="text-center justify-center mt-5 items-center">
        {" "}
        © chai aur code
      </p>
    </main>
  );
}
export default UserCard;

export const Field = ({ lable, content, img }) => {
  return (
    <div className="text-left m-2 relative">
      <p className="text-xs md:text-lg">{lable}</p>
      <div className="font-normal text-lg md:text-2xl flex  items-center font-text-dm ">
        <span>
          {img && (
            <img
              className="h-8 mx-2"
              src={`https://flagsapi.com/${content}/flat/64.png`}
            />
          )}
        </span>
        {content}
      </div>
    </div>
  );
};

/*
  title:r?.data.name.title
  profileImg:
  firstname:r?.data.name.first
  lastname:r?.data.name.last
  username:
  location
  phonenumber
  DOB
  Registered Since
  Nationality
  City
  TimeZone
*/
