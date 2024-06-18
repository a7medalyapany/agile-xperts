import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { acceptRequest, rejectRequest } from "@/lib/actions/project.action";

interface RequestsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requests?:
    | {
        user_id: string;
        sender_name: string;
        sender_username: string;
        sender_email: string;
        sender_avatar_url: string;
        tech_name: string;
        tech_designation: string;
        team_id: number;
        tech_id: number;
        request_status: "pending" | "rejected" | "accepted";
      }[]
    | null;
}

const RequestsDialog: FC<RequestsDialogProps> = ({
  open,
  onOpenChange: setOpen,
  requests,
}) => {
  const pathname = usePathname();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="gap-0 p-0 outline-none">
        <DialogHeader className="px-4 pb-4 pt-5">
          <DialogTitle className="text-center">Requests</DialogTitle>
        </DialogHeader>
        <Command className="overflow-hidden rounded-t-none border-t">
          <CommandInput placeholder="Search user..." />
          <CommandList>
            <CommandEmpty>No users found.</CommandEmpty>
            <CommandGroup className="p-2">
              {requests?.map((user) => (
                <CommandItem
                  key={user.user_id}
                  className="flex items-center px-2"
                >
                  <Avatar>
                    <AvatarImage src={user.sender_avatar_url} alt="Image" />
                    <AvatarFallback>{user.sender_name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="ml-2">
                    <p className="text-sm font-medium leading-none">
                      {user.sender_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user.sender_email}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-4 text-primary">
                    <button
                      onClick={() =>
                        acceptRequest({
                          userId: user.user_id,
                          teamId: user.team_id,
                          technologyId: user.tech_id,
                          pathname,
                        })
                      }
                    >
                      <Check className="size-7 rounded-full bg-card/30 p-0.5 hover:cursor-pointer" />
                    </button>

                    <button
                      onClick={() =>
                        rejectRequest({
                          userId: user.user_id,
                          teamId: user.team_id,
                          technologyId: user.tech_id,
                          pathname,
                        })
                      }
                    >
                      <XIcon className="size-7 rounded-full bg-destructive/30 p-0.5 hover:cursor-pointer" />
                    </button>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default RequestsDialog;
