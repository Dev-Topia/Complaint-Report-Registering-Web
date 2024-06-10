import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ReportTotalEachDepartment({ list }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total complaints for each departments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-center">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.data.map((deparment, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium w-[100px]">
                  {deparment.departmentId}
                </TableCell>
                <TableCell className="font-medium">
                  {deparment.departmentName}
                </TableCell>
                <TableCell className="text-center">{deparment.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ReportTotalEachDepartment;
