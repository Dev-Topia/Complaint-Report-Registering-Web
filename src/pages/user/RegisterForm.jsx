import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createComplaint, getAllComplaintType } from "../../services/complaint";
import Input from "../../ui/shared/Input";
import Button from "../../ui/shared/Button";
import Spinner from "../../ui/components/Spinner";
import Modal from "../../ui/components/Modal";

function RegisterForm() {
  const { data: complaintType, isLoading } = useQuery({
    queryKey: ["getAllComplaintTypeKey"],
    queryFn: getAllComplaintType,
  });
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [file, setFile] = useState("");
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const [inputData, setInputData] = useState({
    title: "",
    complaintTypeId: 0,
    statusTypeId: 1,
    description: "",
    fileUrl: "",
  });
  const onChange = (e) => {
    e.preventDefault();
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await createComplaint(inputData, file);
    if (res.status == 200) {
      setModalMessage(res.data?.msg);
      setOpenModal(!openModal);
    }
    setLoading(false);
  };
  const handleModal = (state) => {
    setOpenModal(state);
  };
  if (isLoading || loading) {
    return <Spinner fullScreenSpinner={true} />;
  }
  return (
    <>
      {openModal && (
        <Modal handleModal={handleModal}>
          <h2 className="text-lg font-semibold">{modalMessage}</h2>
        </Modal>
      )}
      <div className="p-4 md:p-10 xl:px-0">
        <form
          onSubmit={onSubmit}
          className="bg-white border border-gray-200 shadow flex flex-col items-center p-10 gap-4"
        >
          {loading && <Spinner fullScreenSpinner={true} />}
          <h1 className="font-bold text-2xl md:text-4xl mb-4 md:mb-10">
            Register Complaint
          </h1>
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
            <div className="w-full md:w-1/2">
              <Input
                title="Title"
                id="title"
                placeholder="Title"
                onChange={onChange}
                type="text"
                isRequired={true}
              />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="complaintType">Type</label>
              <select
                id="complaintTypeId"
                className="form-select block rounded-xl w-full py-2 px-4 border-2"
                required
                onChange={onChange}
              >
                <option value="">Select</option>
                {complaintType?.data.data.map((type, index) => (
                  <option key={index} value={type.complaintTypeId}>
                    {type.complaintType}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label>Description</label>
            <textarea
              name="description"
              id="description"
              rows="5"
              onChange={onChange}
              className="p-4 border-2 rounded-xl"
              required
            ></textarea>
          </div>
          <div className="w-full">
            <Input
              title="Image && Proof"
              id="file"
              type="file"
              onChange={onFileChange}
              isRequired={true}
              // customClass="h-[200px] bg-[#ffffff]"
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
}

export default RegisterForm;
