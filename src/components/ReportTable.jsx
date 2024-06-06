import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ReportTable({ list }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total complaints for each categories</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.data.map((report, index) => (
              <TableRow key={index}>
                <TableCell className="w-[100px]">
                  {report.complaintTypeId}
                </TableCell>
                <TableCell className="font-medium">
                  {report.typeName}
                </TableCell>
                <TableCell className="text-center">{report.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ReportTable;
