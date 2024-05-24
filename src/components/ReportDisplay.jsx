import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

function ReportDisplay() {
  return (
    <div className="flex h-full flex-col">
      {/* {mail ? ( */}
      <div className="flex flex-1 flex-col bg-white">
        <div className="flex items-start p-4">
          <div className="flex items-start gap-4 text-sm">
            <Avatar>
              <AvatarImage alt="hello" />
              <AvatarFallback>
                {/* {mail.name
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")} */}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-semibold">Hello</div>
              <div className="line-clamp-1 text-xs">Hello</div>
              <div className="line-clamp-1 text-xs">
                <span className="font-medium">Reply-To:</span> Hello
              </div>
            </div>
          </div>
          {/* {mail.date && ( */}
          <div className="ml-auto text-xs text-muted-foreground">
            {/* {format(new Date(mail.date), "PPpp")} */}
            hello
          </div>
          {/* )} */}
        </div>
        <Separator />
        <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
          {/* {mail.text} */}
          hello
        </div>
        <Separator className="mt-auto" />
        <div className="p-4">
          <form>
            <div className="grid gap-4">
              <Textarea
                className="p-4"
                //   placeholder={`Reply ${mail.name}...`}
              />
              <div className="flex items-center">
                {/* <Label
                  htmlFor="mute"
                  className="flex items-center gap-2 text-xs font-normal"
                >
                  <Switch id="mute" aria-label="Mute thread" /> Mute this thread
                </Label> */}
                <Button
                  //   onClick={(e) => e.preventDefault()}
                  size="sm"
                  className="ml-auto"
                >
                  Send
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* ) : ( */}
      {/* <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div> */}
      {/* )} */}
    </div>
  );
}

export default ReportDisplay;
