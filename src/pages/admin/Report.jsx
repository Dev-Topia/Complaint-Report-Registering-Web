import ReportCard from "../../ui/admin/ReportCard";

function Report() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-10">Report</h1>
      <div className="flex gap-4">
        <div className="w-full flex flex-col gap-4">
          <ReportCard />
          <ReportCard />
          <ReportCard />
        </div>
        <div className="w-full h-[70vh] hidden xl:flex justify-center items-center bg-white border border-gray-200 shadow rounded-xl">
          <h1 className="text-2xl font-bold">No Report Selected</h1>
        </div>
      </div>
    </div>
  );
}

export default Report;
