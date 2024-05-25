import { useContext } from "react";
import { Badge } from "@/components/ui/badge";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import AppContext from "@/contexts/AppContext";

function ReportCard({ data }) {
  const { dispatch } = useContext(AppContext);
  const setSingleComplaint = () => {
    dispatch({ type: "SET_SINGLE_COMPLAINT", payload: data });
  };
  return (
    <button
      onClick={setSingleComplaint}
      className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all bg-white hover:bg-accent"
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">
              {data.user.firstName} {data.user.lastName}
            </div>
          </div>
          <div className="ml-auto text-xs">
            {formatDistanceToNow(new Date(data.createdAt), {
              addSuffix: true,
            })}
          </div>
        </div>
        <div className="text-xs font-medium">{data.title}</div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {data.description.substring(0, 300)}
      </div>
      <Badge variant="outline">{data.complaintType}</Badge>
    </button>
  );
}

export default ReportCard;
