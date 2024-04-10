import { useQuery } from "@tanstack/react-query";
import ReportCard from "../../ui/admin/ReportCard";
import ReportContent from "../../ui/admin/ReportContent";
import { getAllComplaint } from "../../services/complaint";
import { useContext } from "react";
import AppContext from "../../contexts/AppContext";

function AdminReport() {
  const { singleComplaint } = useContext(AppContext);
  const { data, isLoading } = useQuery({
    queryKey: ["getAllComplaint"],
    queryFn: getAllComplaint,
  });
  console.log(data);
  if (isLoading) {
    return <h1>loading</h1>;
  }
  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col xl:overflow-y-auto xl:h-[90vh] gap-4 p-4">
        {!isLoading &&
          data &&
          data.complaints.map((complaint, index) => (
            <ReportCard key={index} data={complaint} />
          ))}
      </div>
      <div className="hidden md:block md:w-1/2 xl:overflow-y-auto xl:h-[90vh] p-4">
        <div className="bg-white border border-gray-200 shadow rounded-xl">
          {singleComplaint.id ? (
            <div>
              <ReportContent data={singleComplaint} />
            </div>
          ) : (
            <div className="h-[400px] w-full flex items-center justify-center">
              <h1 className="text-xl font-bold">No Report Yet</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminReport;
