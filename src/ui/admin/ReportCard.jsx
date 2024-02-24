import { Link } from "react-router-dom";

function ReportCard({ reportId }) {
  return (
    <Link to={`/report/${reportId}`}>
      <div className="w-full bg-white border border-gray-200 shadow rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4 items-center">
            <div className="w-[48px] h-[48px] bg-[#d9d9d9] rounded-full"></div>
            <p>Sodara Sou</p>
          </div>
          <span className="text-gray-400">Mon, 12 Mar - 12:00 AM</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Title</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat
            quis ipsam suscipit adipisci deserunt amet atque quam blanditiis
            explicabo voluptatibus commodi, sequi non. Molestias aliquam omnis
            sit labore quisquam rerum?
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ReportCard;
