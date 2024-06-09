import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllStatus, updateComplaint } from "@/services/complaint";
import { BookOpenText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Spinner from "./Spinner";

const wait = () => new Promise((resolve) => setTimeout(resolve, 3000));

function ComplaintViewDialog({ complaint }) {
  const { data: statuses, isLoading } = useQuery({
    queryKey: ["allStatuses"],
    queryFn: getAllStatus,
  });
  const [inputData, setInputData] = useState({
    title: complaint.title,
    complaintTypeId: complaint.status.id,
    description: complaint.description,
    fileUrl: complaint.fileUrl,
    departmentId: complaint.department.deparmentId,
    statusId: complaint.status.id,
    isRead: complaint.isRead,
    validatorResponse: complaint.validatorResponse,
  });
  const onChange = (e) => {
    e.preventDefault();
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const isImage =
    complaint.fileUrl &&
    complaint.fileUrl.match(/\.(jpeg|jpg|gif|png)(\?.*)?$/i);
  const isPdf = complaint.fileUrl && complaint.fileUrl.match(/\.pdf(\?.*)?$/i);
  const [open, setOpen] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      inputData.statusId === complaint.status.id ||
      inputData.validatorResponse === null
    ) {
      setOpenAlertDialog(true);
      setAlertMessage("Update Status and message required!");
      wait().then(() => setOpenAlertDialog(false));
      setLoading(false);
      return;
    }
    setLoading(true);
    const response = await updateComplaint(complaint.complaintId, inputData);
    console.log(response);
    if (response.status === 200) {
      setOpenAlertDialog(true);
      setAlertMessage(response.data?.mgs);
      wait().then(() => setOpenAlertDialog(false));
    } else {
      setOpenAlertDialog(true);
      setAlertMessage(response.data.mgs);
      wait().then(() => setOpenAlertDialog(false));
    }
    setLoading(false);
  };
  return (
    <>
      <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertMessage}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button className="bg-[#227f4b]">Ok</Button>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 hover:bg-blue-700">
            <BookOpenText className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          {loading || isLoading ? (
            <div className="flex justify-center p-10">
              <Spinner />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold">
                  Complaint Details
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <Label>Complaint Status</Label>
                  <Select
                    defaultValue={inputData.statusId.toString()}
                    onValueChange={(id) => {
                      setInputData((prevState) => ({
                        ...prevState,
                        statusId: parseInt(id),
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {statuses.data.map((status) => (
                          <SelectItem
                            key={status.statusId}
                            value={status.statusId.toString()}
                          >
                            {status.type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Complaint Type</Label>
                  <Input
                    placeholder="Complaint Type"
                    disabled
                    value={complaint.complaintType}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Complaint Description</Label>
                  <Textarea
                    placeholder="Type your message here."
                    disabled
                    value={complaint.description}
                  />
                </div>
                <div className="space-y-2">
                  <Label>File</Label>
                  <div>
                    {isImage && (
                      <a href={complaint.fileUrl} target="_blank">
                        <img
                          src={complaint.fileUrl}
                          alt="File"
                          className="w-72"
                        />
                      </a>
                    )}
                    {isPdf && (
                      <a
                        href={complaint.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-72 relative block overflow-hidden"
                      >
                        <span className="absolute inset-0"></span>
                        <object data={complaint.fileUrl} type="application/pdf">
                          <embed
                            src={complaint.fileUrl}
                            type="application/pdf"
                          />
                        </object>
                      </a>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Admin Progress Note</Label>
                    <Textarea
                      type="text"
                      placeholder="Type your message here."
                      id="validatorResponse"
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  variant="outline"
                  className="bg-blue-500 text-white"
                >
                  Send
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ComplaintViewDialog;
