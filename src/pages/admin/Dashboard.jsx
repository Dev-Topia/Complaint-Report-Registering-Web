import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAllComplaint,
  getAllComplaintType,
  getComplaintByDepartment,
} from "@/services/complaint";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { BookOpenText } from "lucide-react";
import { Trash } from "lucide-react";
import ComplaintViewDialog from "@/components/ComplaintViewDialog";

function Dashboard() {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentDepartmentId, setCurrentDepartmentId] = useState(5);
  const { data: departments, isLoading: departmentLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: getAllDepartment,
  });
  const { data: complaints, isLoading } = useQuery({
    queryKey: ["allComplaints", currentDepartmentId, pageIndex, pageSize],
    queryFn: () =>
      getComplaintByDepartment(currentDepartmentId, pageIndex, pageSize),
  });
  const getAbbreviation = (name) => {
    return name
      .split(" ")
      .filter((word) => /[a-zA-Z0-9]/.test(word))
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };
  if (departmentLoading) {
    return (
      <>
        <Spinner fullScreenSpinner={true} />
      </>
    );
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
        {isLoading || departmentLoading ? (
          <div className="flex justify-center px-10 pb-10">
            <Spinner />
          </div>
        ) : (
          <>
            <CardContent>
              <Tabs defaultValue={currentDepartmentId.toString()}>
                <div className="flex justify-between">
                  <TabsList>
                    {departments.data.map((department) => (
                      <TabsTrigger
                        key={department.departmentId}
                        value={department.departmentId.toString()}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentDepartmentId(department.departmentId);
                        }}
                      >
                        {getAbbreviation(department.departmentName)}
                      </TabsTrigger>
                    ))}
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
                <TabsContent value={currentDepartmentId.toString()}>
                  {complaints.data.data.length !== 0 ? (
                    <>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                              ID
                            </TableHead>
                            {/* <TableHead className="hidden md:table-cell">
                              Department
                            </TableHead> */}
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="hidden md:table-cell">
                              Status
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Reporter
                            </TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {complaints.data.data.map((complaint) => (
                            <TableRow key={complaint.complaintId}>
                              <TableCell className="hidden sm:table-cell">
                                {complaint.complaintId}
                              </TableCell>
                              {/* <TableCell className="font-medium hidden md:table-cell">
                                {complaint.department.deparmentName}
                              </TableCell> */}
                              <TableCell>{complaint.complaintType}</TableCell>
                              <TableCell>
                                {format(new Date(complaint.createdAt), "PPpp")}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <Badge variant="outline">
                                  {complaint.status.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {complaint.user.firstName}{" "}
                                {complaint.user.lastName}
                              </TableCell>
                              <TableCell>
                                <div className="space-x-2">
                                  <ComplaintViewDialog complaint={complaint} />
                                  <Button
                                    variant="outline"
                                    className="bg-red-500 text-white"
                                  >
                                    <Trash className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </>
                  ) : (
                    <div className="flex justify-center px-10 pb-10">
                      No Complaint
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> complaints
              </div>
              <div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setPageIndex((prevPageIndex) =>
                            Math.max(1, prevPageIndex - 1)
                          )
                        }
                      />
                    </PaginationItem>
                    {Array.from({ length: complaints.data.totalPages }).map(
                      (_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            onClick={() => setPageIndex(index + 1)}
                            isActive={pageIndex === index + 1}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setPageIndex((prevPageIndex) =>
                            Math.min(
                              complaints.data.totalPages,
                              prevPageIndex + 1
                            )
                          )
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}

export default Dashboard;
