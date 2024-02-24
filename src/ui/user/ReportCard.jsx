import { Link } from "react-router-dom";

function ReportCard({ reportId }) {
  return (
    <Link
      to={`/report/${reportId}`}
      className="w-full bg-white border border-gray-200 shadow rounded-xl h-[300px] flex flex-col justify-center items-center gap-4"
    >
      Report Card
      {/* <svg
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
      <span className="font-medium text-lg">Add Report</span> */}
    </Link>
  );
}

export default ReportCard;
