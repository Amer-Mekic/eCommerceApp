"use client"; //Whenever we need javascript (e.g. to handle events like click,...)
import { Session } from "next-auth";
import Image from "next/image";
import pp from "../../assets/user_profile.jpg";
import { signIn, signOut } from "next-auth/react";

interface UserMenuButtonProps {
  session: Session | null; // Get user session or null if not logged in
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <div className="dropdown dropdown-end bg-white rounded-full">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        {user ? (
          <Image
            src={user?.image || pp}
            alt={user?.name || "Anonymous User"}
            width={60}
            height={60}
            className="w-10 rounded-full"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </label>
      <ul
        className="dropdown-content menu rounded-box menu-sm z-30 mt-1 w-52 bg-base-200 p-2 shadow"
        tabIndex={0}
      >
        <li>
          {user ? (
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              Log Out
            </button>
          ) : (
            <button onClick={() => signIn()}>Log In</button>
          )}
        </li>
      </ul>
    </div>
  );
}
