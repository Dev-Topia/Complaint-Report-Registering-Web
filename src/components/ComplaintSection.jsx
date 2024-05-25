import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/services/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import AppContext from "@/contexts/AppContext";
import ReportCard from "@/ui/user/ReportCard";
import Spinner from "@/components/Spinner";

function ComplaintSection() {
  const { userId } = useContext(AppContext);
  const { data, isLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => getUserProfile(userId),
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-4xl font-bold">My Complaint</CardTitle>
      </CardHeader>
      <CardContent>
        {!data && isLoading ? (
          <div className="flex justify-center p-6">
            <Spinner />
          </div>
        ) : (
          <>
            {data.complaints.length === 0 ? (
              <div className="flex justify-center">
                <h1 className="text-xl font-semibold p-10">No Complaints</h1>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {data?.complaints.map((complaint, index) => (
                  <ReportCard key={index} data={complaint} userData={data} />
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
      <CardFooter>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}

export default ComplaintSection;
