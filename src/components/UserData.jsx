/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { avatarLetter } from "@/utils/helper";

const UserData = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <TableRow
      className="hover:cursor-pointer"
      onClick={() => handleClick(user?.id)}
    >
      <TableCell className="font-medium flex gap-3 items-center">
        <Avatar>
          {user?.avatarImage && (
            <AvatarImage src={user?.avatarImage} alt="Avatar" />
          )}
          <AvatarFallback>{avatarLetter(user?.name)}</AvatarFallback>
        </Avatar>
        <p className="text-base">{user?.name}</p>
      </TableCell>
      <TableCell>{user?.email}</TableCell>
      <TableCell>{user?.address?.city}</TableCell>
    </TableRow>
  );
};

export default UserData;
