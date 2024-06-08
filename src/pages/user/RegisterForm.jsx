import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createComplaint, getAllComplaintType } from "../../services/complaint";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Spinner from "../../components/Spinner";

const wait = () => new Promise((resolve) => setTimeout(resolve, 3000));

function RegisterForm() {
  const { data: complaintType, isLoading } = useQuery({
    queryKey: ["getAllComplaintTypeKey"],
    queryFn: getAllComplaintType,
  });
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [file, setFile] = useState("");
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const [inputData, setInputData] = useState({
    title: "",
    complaintTypeId: 0,
    statusTypeId: 1,
    description: "",
    file: "",
  });
  const onChange = (e) => {
    e.preventDefault();
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const [open, setOpen] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      inputData.title === "" &&
      inputData.complaintTypeId === 0 &&
      inputData.description === "" &&
      file === ""
    ) {
      setOpen(true);
      setAlertMessage("All fields are required!");
      wait().then(() => setOpen(false));
      setLoading(false);
      return;
    }
    const res = await createComplaint(inputData, file);
    if (res.status === 200) {
      setOpen(true);
      setAlertMessage(res.data?.msg);
      wait().then(() => setOpen(false));
    } else {
      setOpen(true);
      setAlertMessage(res.message);
      wait().then(() => setOpen(false));
    }
    setLoading(false);
  };
  if (isLoading || loading) {
    return <Spinner fullScreenSpinner={true} />;
  }
  return (
    <section className="p-6 md:p-10">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertMessage}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">
            Register Complaint
          </CardTitle>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="w-full space-y-2">
                <Label>Title</Label>
                <Input
                  type="text"
                  id="title"
                  onChange={onChange}
                  placeholder="Title"
                />
              </div>
              <div className="w-full space-y-2">
                <Label>Type</Label>
                <Select
                  onValueChange={(id) => {
                    setInputData((prevState) => ({
                      ...prevState,
                      complaintTypeId: parseInt(id),
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {complaintType?.data.data.map((type, index) => (
                        <SelectItem
                          key={index}
                          value={type.complaintTypeId.toString()}
                        >
                          {type.complaintType}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <Label>Description</Label>
              <Textarea
                type="text"
                id="description"
                onChange={onChange}
                placeholder="Description"
              />
            </div>
            <div className="space-y-2">
              <Label>File</Label>
              <Input type="file" id="file" onChange={onFileChange} />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="ml-auto bg-[#227F4B] text-white"
              variant="outline"
            >
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}

export default RegisterForm;
