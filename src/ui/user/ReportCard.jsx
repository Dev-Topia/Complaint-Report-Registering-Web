import { Link } from "react-router-dom";
import { formatDate } from "../../utils/helpers";

function ReportCard({ data, userData }) {
  return (
    <Link
      to={`/report/${data.complaintId}`}
      className="w-full p-4 flex flex-col gap-2 bg-white border border-gray-200 shadow rounded-xl"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* <div className="w-8 h-8 bg-[#d9d9d9] rounded-full"></div> */}
          <img
            src={
              userData.imageUrl ||
              "https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
            }
            alt="Profile Image"
            className="rounded-full w-8 h-8 object-cover"
          />
          <span>
            {userData.firstName} {userData.lastName}
          </span>
        </div>
        <span className="text-gray-400">{formatDate(data.createdAt)}</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">{data.title}</h2>
            <h3 className="text-sm">{data.complaintType}</h3>
          </div>
          <span className="bg-yellow-400 px-4 py-1 rounded-full">
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
