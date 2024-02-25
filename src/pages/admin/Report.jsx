import ReportCard from "../../ui/admin/ReportCard";
import ReportContent from "../../ui/admin/ReportContent";

function Report() {
  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col xl:overflow-y-auto xl:h-[90vh] gap-4 p-4">
        <ReportCard />
        <ReportCard />
        <ReportCard />
        <ReportCard />
        <ReportCard />
      </div>
      <div className="hidden md:block md:w-1/2 xl:overflow-y-auto xl:h-[90vh] p-4">
        <div className="bg-white border border-gray-200 shadow rounded-xl h-full">
          <ReportContent />
        </div>
      </div>
    </div>
  );
}

export default Report;
