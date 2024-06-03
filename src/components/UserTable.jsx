import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/user";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import UserDeleteDialog from "./UserDeleteDialog";
import UserEditDialog from "./UserEditDialog";
import Spinner from "./Spinner";

function UserTable() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["getAllUserKey"],
    queryFn: getUsers,
  });
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="flex justify-between">
          <div>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage users</CardDescription>
          </div>
        </div>
      </CardHeader>
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          <CardContent>
            {users.data.data.length === 0 ? (
              <div className="h-full flex justify-center items-center gap-4">
                <h1 className="text-2xl font-semibold">No users</h1>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Logo</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.data.data.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{index}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <img
                          alt="profile image"
                          className="aspect-square rounded-full object-cover"
                          height="64"
                          src={user.imageUrl || "https://github.com/shadcn.png"}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {user.firstName}
                      </TableCell>
                      <TableCell>{user.role[0]}</TableCell>
                      <TableCell>{user.role[0]}</TableCell>
                      <TableCell>{user.phone || "XXX-XXX-XXX"}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UserEditDialog />
                          <UserDeleteDialog user={user} />
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

export default UserTable;
