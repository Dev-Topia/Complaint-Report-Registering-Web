import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllComplaint } from "../../services/complaint";
import AppContext from "../../contexts/AppContext";
import ReportCard from "../../ui/admin/ReportCard";
import ReportContent from "../../ui/admin/ReportContent";

function AdminReport() {
  const { singleComplaint } = useContext(AppContext);
  const { data, isLoading } = useQuery({
    queryKey: ["getAllComplaint"],
    queryFn: getAllComplaint,
  });
  if (isLoading) {
    return <h1>loading</h1>;
  }
  return (
    <div className="flex gap-4">
      <div className="w-full md:w-1/2 flex flex-col md:overflow-y-auto md:h-[90vh] gap-4 p-4 md:pt-4 md:pl-4 md:pr-0">
        {!isLoading && data?.data.data.length !== 0 ? (
          data?.data.data.map((complaint, index) => (
            <ReportCard key={index} data={complaint} />
          ))
        ) : (
          <div className="h-full text-xl flex justify-center items-center">
            <h1>No Report</h1>
          </div>
        )}
      </div>
      <div className="hidden md:block md:w-1/2 md:overflow-y-auto md:h-[90vh] py-4 pr-4">
        <div className="h-full bg-white border border-gray-200 shadow rounded-xl">
          {singleComplaint.complaintId ? (
            <ReportContent data={singleComplaint} />
          ) : (
            <h1 className="text-xl flex justify-center items-center h-full">
              No Report Selected
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminReport;
