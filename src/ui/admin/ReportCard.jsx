import { formatDate } from "../../utils/helpers";
import { useContext } from "react";
import AppContext from "../../contexts/AppContext";

function ReportCard({ data }) {
  const {dispatch} = useContext(AppContext);
  const setSingleComplaint = () => {
    dispatch({type: "SET_SINGLE_COMPLAINT", payload: data})
  }
  return (
    <button onClick={setSingleComplaint} className="w-full text-left bg-white border border-gray-200 shadow rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4 items-center">
            <div className="w-[48px] h-[48px] bg-[#d9d9d9] rounded-full"></div>
            <p>{data.user.lastName}{" "}{data.user.firstName}</p>
          </div>
          <span className="text-gray-400">{formatDate(data.createdAt)}</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <p>
            {data.description}
          </p>
        </div>
      </button>
  );
}

export default ReportCard;
