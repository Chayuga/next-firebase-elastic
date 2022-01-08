import Image from "next/image";
import {
  SearchIcon,
  ChevronDownIcon,
  ShoppingCartIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtoms";

function Header({ placeholder }) {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);

  console.log(session);

  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const resetInput = () => {
    setSearchInput("");
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:px-10">
      {/* Left section */}
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-12 cursor-pointer my-auto"
      >
        {/* Use Next JS Image tag, which turns our image to webP whic is way smaller  than jpb, png etcand optimised */}
        <Image
          src="https://www.chayugadesigns.com/images/shopping_cart.jpg"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Middle section */}

      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          placeholder={placeholder || "Start your search"}
          className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400 "
        />
        <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>
      {/* <SearchEngine /> */}

      {/* Right section */}
      {session ? (
        <div className="flex items-center space-x-3 absolute top-5 right-8">
          <div onClick={() => setOpen(true)}>
            <div className="flex items-center bg-green-400 space-x-2 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-5">
              <PlusCircleIcon className="h-5 w-5 text-white" />
              <h2 className="text-white">Add</h2>
            </div>
          </div>
          <div onClick={signOut} className="">
            <div className="flex items-center bg-red-400 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
              <img
                className="rounded-full w-10 h-10"
                // src={session?.user.image}
                src={session?.user?.image}
                alt=""
              />
              {/* <h2>{session?.user.name}</h2> */}
              <h2 className="text-white">{session?.user?.name}</h2>
              <ChevronDownIcon className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      ) : (
        <button onClick={signIn}>Sign In</button>
      )}
    </header>
  );
}

export default Header;
