import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Spinner from "./Spinner";
import { createComplaintType } from "@/services/complaint.js";

const wait = () => new Promise((resolve) => setTimeout(resolve, 3000));

function ComplaintTypeCreateDialog() {
  const [open, setOpen] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [inputData, setInputData] = useState("");
  const onChange = (e) => {
    setInputData(e.target.value);
    // e.preventDefault();
    // setInputData((prevState) => ({
    //   ...prevState,
    //   [e.target.id]: e.target.value,
    //   console.log(e.target.value)
    // }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (inputData === "") {
      setAlertMessage("Please fill in the field");
      setOpenAlertDialog(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    const res = await createComplaintType(inputData);
    if (res.status === 200) {
      setOpenAlertDialog(true);
      setAlertMessage(res.data?.msg);
      wait().then(() => setOpenAlertDialog(false));
    } else {
      setOpenAlertDialog(true);
      setAlertMessage(res.data.msg);
      wait().then(() => setOpenAlertDialog(false));
    }
    setLoading(false);

    // try {
    //   await createComplaintType({ complaintType: inputData });
    //   setAlertMessage("Complaint type created successfully");
    // } catch (error) {
    //   setAlertMessage("Failed to create complaint type");
    // } finally {
    //   setOpenAlertDialog(true);
    //   setLoading(false);
    // }
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
          <Button className="bg-blue-500 hover:bg-blue-700">Create</Button>
        </DialogTrigger>
        <DialogContent>
          {loading ? (
            <div className="flex justify-center p-10">
              <Spinner />
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Create complaint type</DialogTitle>
              </DialogHeader>
              {/* <form onSubmit={onSubmit}> */}
              <div>
                <div className="flex flex-col gap-4">
                  <Label>Type Name</Label>
                  <Input
                    id="name"
                    type="text"
                    onChange={onChange}
                    placeholder="Type Name"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  className="bg-blue-500 hover:bg-blue-700"
                  type="submit"
                  onClick={onSubmit}
                >
                  Save
                </Button>
              </DialogFooter>
              {/* </form> */}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ComplaintTypeCreateDialog;
