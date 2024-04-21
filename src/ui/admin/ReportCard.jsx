import { formatDate } from "../../utils/helpers";
import { useContext } from "react";
import AppContext from "../../contexts/AppContext";

function ReportCard({ data }) {
  const { dispatch } = useContext(AppContext);
  const setSingleComplaint = () => {
    dispatch({ type: "SET_SINGLE_COMPLAINT", payload: data });
  };
  return (
    <button
      onClick={setSingleComplaint}
      className="w-full text-left bg-white border border-gray-200 shadow rounded-xl p-4"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-4 items-center">
          <img
            src={
              data?.user.imageUrl ||
              "https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
            }
            alt="avatar"
            className="rounded-full w-12 h-12 object-cover"
          />
          <div>
            <p>
              {data.user.lastName} {data.user.firstName}
            </p>
            <p className="text-gray-400">{data.user.email}</p>
          </div>
        </div>
        <span className="text-gray-400">{formatDate(data.createdAt)}</span>
      </div>
      <div>
        <div className="mb-2">
          <h1 className="text-4xl font-semibold">{data.title}</h1>
          <h2 className="">{data.complaintType}</h2>
        </div>
        <p>{data.description}</p>
      </div>
    </button>
  );
}

export default ReportCard;
