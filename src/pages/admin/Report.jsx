import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllComplaint } from "../../services/complaint";
// import { Separator } from "@/components/ui/separator";
import ReportDisplay from "@/components/ReportDisplay";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TooltipProvider } from "@/components/ui/tooltip";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportList from "@/components/ReportList";
import AppContext from "../../contexts/AppContext";
import Spinner from "../../components/Spinner";
import {
  getDepartmentsReport,
  getTotalComplaintByCategory,
  getTotalComplaintByDepartment,
} from "@/services/report";
import ReportTable from "@/components/ReportTable";
import ReportDepartmentTable from "@/components/ReportDepartmentTable";
import ReportTotalEachDepartment from "@/components/ReportTotalEachDepartment";

function Report() {
  const { singleComplaint } = useContext(AppContext);
  const { data, isLoading } = useQuery({
    queryKey: ["getAllComplaint"],
    queryFn: getAllComplaint,
  });
  const { data: reportDepartments, isLoading: reportDepartmentLoading } =
    useQuery({
      queryKey: ["reportDepartments"],
      queryFn: getDepartmentsReport,
    });
  const {
    data: reportComplaintByCategory,
    isLoading: reportComplaintByCategoryLoading,
  } = useQuery({
    queryKey: ["reportComplaintByCategory"],
    queryFn: getTotalComplaintByCategory,
  });
  const {
    data: reportComplaintByDepartment,
    isLoading: reportComplaintByDepartmentLoading,
  } = useQuery({
    queryKey: ["reportComplaintByDepartment"],
    queryFn: getTotalComplaintByDepartment,
  });
  if (
    isLoading ||
    reportDepartmentLoading ||
    reportComplaintByCategoryLoading ||
    reportComplaintByDepartmentLoading
  ) {
    return <Spinner fullScreenSpinner={true} />;
  }
  return (
    <div className="p-4 space-y-4">
      <ReportDepartmentTable list={reportDepartments} />
      <ReportTable list={reportComplaintByCategory} />
      <ReportTotalEachDepartment list={reportComplaintByDepartment} />
    </div>
    // <TooltipProvider delayDuration={0}>
    //   <ResizablePanelGroup
    //     direction="horizontal"
    //     className="h-full items-stretch"
    //   >
    //     <ResizablePanel>
    //       <ReportList reports={data} />
    //       {/* <Tabs defaultValue="all" className="h-screen">
    //         <div className="flex items-center px-4 py-2 bg-white">
    //           <h1 className="text-xl font-bold">Inbox</h1>
    //           <TabsList className="ml-auto">
    //             <TabsTrigger
    //               value="all"
    //               className="text-zinc-600 dark:text-zinc-200"
    //             >
    //               All report
    //             </TabsTrigger>
    //             <TabsTrigger
    //               value="unread"
    //               className="text-zinc-600 dark:text-zinc-200"
    //             >
    //               Unread
    //             </TabsTrigger>
    //           </TabsList>
    //         </div>
    //         <Separator />
    //         <TabsContent value="all" className="m-0">
    //           <ReportList reports={data} />
    //         </TabsContent>
    //         <TabsContent value="unread" className="m-0">
    //           <ReportList reports={data} />
    //         </TabsContent>
    //       </Tabs> */}
    //     </ResizablePanel>
    //     <ResizableHandle withHandle />
    //     <ResizablePanel>
    //       <ReportDisplay report={singleComplaint} />
    //     </ResizablePanel>
    //   </ResizablePanelGroup>
    // </TooltipProvider>
  );
}

export default Report;
