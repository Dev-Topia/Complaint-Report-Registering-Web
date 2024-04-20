import React from "react";
import UserCard from "../../ui/admin/UserCard";

function User() {
  return (
    <div className="flex flex-col p-10 gap-10">
      <h1 className="text-4xl font-bold">User</h1>
      <div className="">
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-4 w-[25%]">Avatar</th>
            <th className="p-4 w-[25%]">User Name</th>
            <th className="p-4 w-[25%]">Email</th>
            <th className="p-4 w-[25%]">Action</th>
          </tr>
        </thead>
      </table>
      <UserCard/>
      </div>
    </div>
  );
}

export default User;
