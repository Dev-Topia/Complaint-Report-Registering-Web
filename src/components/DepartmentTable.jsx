import { useQuery } from "@tanstack/react-query";
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
import DepartmentCreateDialog from "./DepartmentCreateDialog";
import DepartmentEditDialog from "./DepartmentEditDialog";
import DepartmentDeleteDialog from "./DepartmentDeleteDialog";
import Spinner from "./Spinner";
import { getAllDepartment } from "@/services/department";

function DepartmentTable() {
  const { data: departments, isLoading } = useQuery({
    queryKey: ["allDepartments"],
    queryFn: getAllDepartment,
  });
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="flex justify-between">
          <div>
            <CardTitle>Departments</CardTitle>
            <CardDescription>Manage departments</CardDescription>
          </div>
          <DepartmentCreateDialog />
        </div>
      </CardHeader>
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          <CardContent>
            {departments.data.length === 0 ? (
              <div className="h-full flex justify-center items-center gap-4">
                <h1 className="text-2xl font-semibold">No departments</h1>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.data.map((department, index) => (
                    <TableRow key={index}>
                      <TableCell>{department.departmentId}</TableCell>
                      <TableCell className="font-medium">
                        {department.departmentName}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <DepartmentEditDialog />
                          <DepartmentDeleteDialog department={department}/>
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

export default DepartmentTable;
