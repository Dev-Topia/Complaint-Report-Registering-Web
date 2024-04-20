import React from "react";
import Button from "../shared/Button";

function UserCard() {
  return (
    <table className="w-full text-sm">
      <thead className="border-2">
        <tr>
          <th className="w-[25%]">
            <div className="w-full flex justify-center">
              <div className="w-[30px] h-[30px] rounded-full bg-black"></div>
            </div>
          </th>
          <th className="p-4 w-[25%]">BC</th>
          <th className="p-4 w-[25%]">Email@gmail.com</th>
          <th className="w-[25%]">
            <div className="flex gap-2">
            <Button customClass={"bg-blue-500 hover:bg-blue-400"}>
            Edit
            </Button>
            <Button customClass={"bg-red-500 hover:bg-red-400"}>
              Delete
            </Button>
            </div>
          </th>
        </tr>
      </thead>
    </table>
  );
}

export default UserCard;
