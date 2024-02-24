import { Link } from "react-router-dom";
import ReportCard from "../../../ui/user/ReportCard";

function Home() {
  return (
    <div className="p-10 xl:px-0">
      <h1 className="text-2xl md:text-4xl font-bold mb-10">
        Report & Complaint System
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <ReportCard />
        <Link
          to="/registerform"
          className="w-full bg-white border border-gray-200 shadow rounded-xl h-[300px] flex flex-col justify-center items-center gap-4"
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M4 12H20M12 4V20"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
          <span className="font-medium text-lg">Add Report</span>
        </Link>
      </div>
    </div>
  );
}

export default Home;
