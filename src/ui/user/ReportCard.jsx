import { Link } from "react-router-dom";
import { formatDate } from "../../utils/helpers";

function ReportCard({ data, userData }) {
  return (
    <Link
      to={`/report/${data.id}`}
      className="w-full p-4 flex flex-col gap-4 bg-white border border-gray-200 shadow rounded-xl"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#d9d9d9] rounded-full"></div>
          <span>
            {userData.data.firstName} {userData.data.lastName}
          </span>
        </div>
        <span className="text-gray-400">{formatDate(data.createdAt)}</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{data.title}</h2>
          <span className="bg-yellow-400 px-2 py-1 rounded-full font-semibold">
            {data.status}
          </span>
        </div>
        <div className="border h-[1px]"></div>
        <p>{data.description}</p>
      </div>
    </Link>
  );
}

export default ReportCard;
