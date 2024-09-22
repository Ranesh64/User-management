import { useContext } from "react";

import { UserContext } from "@/utils/UserContext";
import UserData from "./UserData";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const UserList = () => {
  const { toast } = useToast();
  const { users, error } = useContext(UserContext);
  return error ? (
    toast({
      variant: "destructive",
      title: "Unable to fetch users",
      description: error,
    })
  ) : (
    <section>
      <h2 className="text-2xl font-semibold">Users</h2>
      <div className="flex flex-wrap gap-6 mt-6">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>City</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <UserData user={user} key={user?.id} />
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default UserList;
