import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ReportDepartmentTable({ list }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Total complaints from students in each departments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-center">
                Grading and Assessment
              </TableHead>
              <TableHead className="text-center">
                Special Education Services
              </TableHead>
              <TableHead className="text-center">Safety and Security</TableHead>
              <TableHead className="text-center">Teacher Conduct</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.data.map((department, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {department.departmentId}
                </TableCell>
                <TableCell>{department.deparmentName}</TableCell>
                <TableCell className="text-center">
                  {department.gradingAndAssessmentCount}
                </TableCell>
                <TableCell className="text-center">
                  {department.specialEducationServicesCount}
                </TableCell>
                <TableCell className="text-center">
                  {department.safetyAndSecurityCount}
                </TableCell>
                <TableCell className="text-center">
                  {department.teacherConductCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ReportDepartmentTable;
