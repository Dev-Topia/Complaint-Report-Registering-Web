import { useQuery } from "@tanstack/react-query";
import { getAllComplaint, getAllComplaintType } from "@/services/complaint";
import { getAllDepartment } from "@/services/department";
import {
  getDepartmentsReport,
  getTotalComplaintByCategory,
  getTotalComplaintByDepartment,
} from "@/services/report";
import { getUsers } from "@/services/user";
import format from "date-fns/format";
import Spinner from "@/components/Spinner";
import ReportTable from "@/components/ReportTable";
import ReportDepartmentTable from "@/components/ReportDepartmentTable";
import ReportTotalEachDepartment from "@/components/ReportTotalEachDepartment";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpenText } from "lucide-react";
import { Trash } from "lucide-react";

function Dashboard() {
  const { data: complaints, isLoading } = useQuery({
    queryKey: ["allComplaints"],
    queryFn: getAllComplaint,
  });
  const { data: complaintTypes, isLoading: complaintTypeLoading } = useQuery({
    queryKey: ["getAllComplaintTypeKey"],
    queryFn: getAllComplaintType,
  });
  const { data: users, isLoading: userLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const { data: departments, isLoading: departmentLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: getAllDepartment,
  });
  if (isLoading || userLoading || complaintTypeLoading || departmentLoading) {
    return <Spinner fullScreenSpinner={true} />;
  }
  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <div>
            <div>
              <CardTitle>Complaint Reports</CardTitle>
              <CardDescription>Manage and view complaints.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="unRead">
            <div className="flex justify-between">
              <TabsList>
                <TabsTrigger value="unRead">Unread</TabsTrigger>
                <TabsTrigger value="read">Read</TabsTrigger>
              </TabsList>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <TabsContent value="unRead">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      ID
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      <Select>
                        <SelectTrigger className="w-[150px] border-none">
                          <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {departments.data.map((department) => (
                              <SelectItem
                                key={department.departmentId}
                                value={department.departmentId}
                              >
                                {department.departmentName}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableHead>
                    <TableHead>
                      <Select>
                        <SelectTrigger className="w-[100px] border-none">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {complaintTypes.data.data.map((type) => (
                              <SelectItem
                                key={type.complaintTypeId}
                                value={type.complaintTypeId}
                              >
                                {type.complaintType}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="hidden md:table-cell">
                      <Select>
                        <SelectTrigger className="w-[75px] border-none p-0">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Reporter
                    </TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complaints.data.data.length !== 0 ? (
                    complaints.data.data.map((complaint) => (
                      <TableRow key={complaint.complaintId}>
                        <TableCell className="hidden sm:table-cell">
                          {complaint.complaintId}
                        </TableCell>
                        <TableCell className="font-medium hidden md:table-cell">
                          {complaint.department}
                        </TableCell>
                        <TableCell>{complaint.complaintType}</TableCell>
                        <TableCell>
                          {format(new Date(complaint.createdAt), "PPpp")}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline">{complaint.status}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {complaint.user.firstName} {complaint.user.lastName}
                        </TableCell>
                        <TableCell>
                          <div className="space-x-2">
                            <Button
                              variant="outline"
                              className="bg-blue-500 text-white"
                            >
                              <BookOpenText className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              className="bg-red-500 text-white"
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <>No Complaint</>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> complaints
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Dashboard;
