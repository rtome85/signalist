"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOutIcon } from "lucide-react";
import NavItems from "./NavItems";

const UserDropdown = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    router.push("/sign-in");
  };

  const user = { name: "Roberto", email: "contact@jsmastery.com" };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 text-gray-400 hover:text-yellow-500"
        >
          <Avatar>
            <AvatarImage
              className="h-10 w-10"
              src="https://robtome.com/headshot.webp"
            />
            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-small font-bold">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md-flex flex-col items-start">
            <span className="text-base font-medium text-gray-400">
              {user.name}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="flex relative items-center gap-3 py-2">
            <Avatar>
              <AvatarImage
                className="h-10 w-10"
                src="https://robtome.com/headshot.webp"
              />
              <AvatarFallback className="bg-yellow-500 text-yellow-900 text-small font-bold">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-base font-medium text-gray-400">
                {user.name}
              </span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-600" />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer"
        >
          <LogOutIcon className="h-4 w-4 mr-2 hidden sm:block" />
          Logout
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-600 hidden sm:block" />
        <nav className="sm:hidden">
          <NavItems />
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
