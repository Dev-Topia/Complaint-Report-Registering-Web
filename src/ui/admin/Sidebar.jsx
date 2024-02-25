import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="hidden xl:block sticky h-screen top-0 left-0 bottom-0 bg-white border-r-2">
      <div className="w-[230px] p-4 h-screen flex flex-col gap-4">
        <Link to="/" className="w-full flex justify-center">
          <img src={Logo} alt="Logo" className="w-28" />
        </Link>
        <dix className="flex flex-col text-lg font-semibold gap-4">
          <Link to="/" className="font-semibold flex gap-2 items-center">
            <svg
              version="1.0"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="20px"
              height="20px"
              viewBox="0 0 64 64"
              enable-background="new 0 0 64 64"
              xml:space="preserve"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill="#231F20"
                  d="M32,0C14.355,0,0,14.355,0,32s14.355,32,32,32s32-14.355,32-32S49.645,0,32,0z M15.023,15.023 c1.57-1.57,4.102-1.559,5.66,0c1.566,1.57,1.582,4.105,0.012,5.664c-1.559,1.566-4.078,1.582-5.633,0.023l-0.035-0.031 C13.469,19.121,13.469,16.586,15.023,15.023z M8.102,32c0-2.211,1.77-4,3.977-4h0.043c2.207,0,4,1.789,4,4s-1.793,4-4,4 C9.91,36,8.102,34.211,8.102,32z M20.711,48.93l-0.027,0.039c-1.566,1.555-4.094,1.559-5.66,0.008 c-1.57-1.574-1.555-4.105,0.004-5.664c1.566-1.562,4.105-1.578,5.66-0.012C22.258,44.859,22.266,47.375,20.711,48.93z M36,32 c0,2.211-1.789,4-4,4s-4-1.789-4-4V12c0-2.211,1.789-4,4-4s4,1.789,4,4V32z M43.285,15.059l0.031-0.031 c1.559-1.559,4.094-1.562,5.656,0c1.566,1.566,1.559,4.098,0,5.656c-1.566,1.566-4.105,1.578-5.668,0.012 C41.742,19.133,41.727,16.617,43.285,15.059z M48.977,48.977c-1.574,1.566-4.102,1.551-5.66-0.008 c-1.566-1.562-1.582-4.109-0.02-5.664c1.566-1.566,4.078-1.578,5.637-0.02l0.039,0.027C50.523,44.875,50.531,47.406,48.977,48.977z M52,36c-2.211,0-4.02-1.789-4.02-4s1.77-4,3.977-4H52c2.207,0,4,1.789,4,4S54.207,36,52,36z"
                ></path>{" "}
              </g>
            </svg>
            Dashboard
          </Link>
          <Link to="/report" className="font-semibold flex gap-2 items-center">
            <svg
              fill="#000000"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="m20 8-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM9 19H7v-9h2v9zm4 0h-2v-6h2v6zm4 0h-2v-3h2v3zM14 9h-1V4l5 5h-4z"></path>
              </g>
            </svg>
            Report
          </Link>
        </dix>
      </div>
    </aside>
  );
}

export default Sidebar;
