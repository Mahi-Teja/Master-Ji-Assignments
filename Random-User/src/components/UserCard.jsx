import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <main className="bg-[#B6B3F3] px-6 h-screen">
      <div className=" max-w-md mx-auto  ">
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
            <li className="text-content">Profile Overview</li>
            <li onClick={handleRefresh}>
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
        <section className="flex justify-center p-2  border-t-[#00000014] border-b-[#00000014] mx-auto  m-2">
          <div className="flex p-2 mx-2">
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
          <div className="flex p-2 mx-2">
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
        <section className="grid grid-cols-2 ">
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
      {/* <svg
        width="60"
        height="62"
        viewBox="0 0 60 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <rect width="60" height="62" rx="12" fill="url(#pattern0_37_38)" />
        <defs>
          <pattern
            id="pattern0_37_38"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlink:href="#image0_37_38"
              transform="matrix(0.00430556 0 0 0.00416667 -0.0166667 0)"
            />
          </pattern>
          <image
            id="image0_37_38"
            width="240"
            height="240"
            xlink:href="data:image/png;base64,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"
          />
        </defs>
      </svg> */}
      <Link target="blank" to={"https://chaicode.com"}>
        <div className="absolute right-4 bottom-14">
          <img
            className="h-14  w-14 object-cover rounded-lg"
            src="data:image/png;base64,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"
            alt=""
            srcSet=""
          />
        </div>
      </Link>

      <footer className="flex justify-center absolute translate-x-full bottom-1 align-middle text-center ">
        <p className=""> © chai aur code</p>
      </footer>
    </main>
  );
}
export default UserCard;

export const Field = ({ lable, content, img }) => {
  return (
    <div className="text-left m-2 relative">
      <p className="text-xs">{lable}</p>
      <div className="font-normal text-lg flex  items-center text-content ">
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
