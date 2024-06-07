import { useQuery } from "@tanstack/react-query";
import { getAllComplaintType } from "@/services/complaint";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ComplaintTypeCreateDialog from "./ComplaintTypeCreateDialog";
import ComplaintTypeEditDialog from "./ComplaintTypeEditDialog";
import ComplaintTypeDeleteDialog from "./ComplaintTypeDeleteDialog";
import Spinner from "./Spinner";

function ComplaintTypeTable() {
  const { data: complaintTypes, isLoading } = useQuery({
    queryKey: ["getAllComplaintTypeKey"],
    queryFn: getAllComplaintType,
  });
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="flex justify-between">
          <div>
            <CardTitle>Complaint Types</CardTitle>
            <CardDescription>Manage complaint types</CardDescription>
          </div>
          <ComplaintTypeCreateDialog />
        </div>
      </CardHeader>
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          <CardContent>
            {complaintTypes.data.data.length === 0 ? (
              <div className="h-full flex justify-center items-center gap-4">
                <h1 className="text-2xl font-semibold">No complaint types</h1>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complaintTypes.data.data.map((complaintType, index) => (
                    <TableRow key={index}>
                      <TableCell>{index}</TableCell>
                      <TableCell className="font-medium">
                        {complaintType.complaintType}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <ComplaintTypeEditDialog />
                          <ComplaintTypeDeleteDialog complaint={complaintTypes}/>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
}

export default ComplaintTypeTable;
