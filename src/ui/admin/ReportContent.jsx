import Button from "../shared/Button";

function ReportContent() {
  return (
    <div className="h-full flex flex-col gap-4 p-4 justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="w-[48px] h-[48px] bg-[#d9d9d9] rounded-full"></div>
            <p>Sodara Sou</p>
          </div>
          <span className="text-gray-400">Mon, 12 Mar - 12:00 AM</span>
        </div>
        <h1 className="text-4xl font-bold">Title</h1>
        <div className="border h-[1px]"></div>
        <div className="flex flex-col gap-4">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat
            quis ipsam suscipit adipisci deserunt amet atque quam blanditiis
            explicabo voluptatibus commodi, sequi non. Molestias aliquam omnis
            sit labore quisquam rerum?
          </p>
          <div className="w-[200px] h-[100px] bg-[#d9d9d9] rounded-xl"></div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-end">
        <textarea
          className="p-4 border rounded-xl w-full"
          placeholder="Reply"
          name=""
          id=""
          rows="4"
        ></textarea>
        <Button>Send</Button>
      </div>
    </div>
  );
}

export default ReportContent;
