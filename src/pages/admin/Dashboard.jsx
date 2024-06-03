import { useQuery } from "@tanstack/react-query";
import { getAllComplaint, getAllComplaintType } from "@/services/complaint";
import { getAllDepartment } from "@/services/department";
import { getDepartmentsReport } from "@/services/report";
import { getUsers } from "@/services/user";
import Spinner from "@/components/Spinner";
import ReportTable from "@/components/ReportTable";
import ReportDepartmentTable from "@/components/ReportDepartmentTable";
import ReportTotalEachDepartment from "@/components/ReportTotalEachDepartment";

function Dashboard() {
  const { data: complaints, isLoading } = useQuery({
    queryKey: ["allComplaints"],
    queryFn: getAllComplaint,
  });
  const { data: complaintTypes, isLoading: complaintTypeLoading } = useQuery({
    queryKey: ["getAllComplaintTypeKey"],
    queryFn: getAllComplaintType,
  });
  const { data: users, isLoading: userLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const { data: departments, isLoading: departmentLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: getAllDepartment,
  });
  const { data: reportDepartments, isLoading: reportDepartmentLoading } =
    useQuery({
      queryKey: ["reportDepartments"],
      queryFn: getDepartmentsReport,
    });
  if (
    isLoading ||
    userLoading ||
    complaintTypeLoading ||
    reportDepartmentLoading
  ) {
    return <Spinner fullScreenSpinner={true} />;
  }
  return (
    <div className="p-4 space-y-4">
      <ReportDepartmentTable list={reportDepartments} />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <ReportTable list={complaintTypes} />
        </div>
        <div className="w-full">
          <ReportTotalEachDepartment list={complaintTypes} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
