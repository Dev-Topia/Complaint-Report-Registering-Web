import { ScrollArea } from "@/components/ui/scroll-area";
import ReportCard from "./ReportCard";

function ReportList({ reports }) {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-4">
        {reports?.data.data.length !== 0 ? (
          reports?.data.data.map((complaint, index) => (
            <ReportCard key={index} data={complaint} />
          ))
        ) : (
          <div className="h-full text-xl flex justify-center items-center">
            <h1>No Report</h1>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}

export default ReportList;
