import { useQuery } from "@tanstack/react-query";
import { getAllComplaint } from "../../services/complaint";

function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["getAllComplaint"],
    queryFn: getAllComplaint,
  });
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-10">
        <div className="w-full bg-white border border-gray-200 shadow rounded-xl p-10">
          <h2 className="text-2xl font-semibold mb-4">Total Report</h2>
          <p className="text-2xl font-semibold">9</p>
        </div>
        <div className="w-full bg-white border border-gray-200 shadow rounded-xl p-10">
          <h2 className="text-2xl font-semibold mb-4">Total User</h2>
          <p className="text-2xl font-semibold">9</p>
        </div>
        <div className="w-full bg-white border border-gray-200 shadow rounded-xl p-10">
          <h2 className="text-2xl font-semibold mb-4">Total </h2>
          <p className="text-2xl font-semibold">9</p>
        </div>
        <div className="w-full bg-white border border-gray-200 shadow rounded-xl p-10">
          <h2 className="text-2xl font-semibold mb-4">Total User</h2>
          <p className="text-2xl font-semibold">9</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
