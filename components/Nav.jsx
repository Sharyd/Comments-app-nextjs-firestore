import Link from "next/link";
import React from "react";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Nav = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="flex justify-between items-center py-10">
      <Link href="/">
        <button className="text-lg font-medium">Creative Minds</button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link href={"/auth/login"}>
            <a className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">
              Join Now
            </a>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-6">
            <Link href="post">
              <button className="font-medium bg-cyan-500 text-white py-2 px-4 rounded-mg text-sm">
                Post
              </button>
            </Link>
            <Link href="/dashboard">
              <img
                src={user.photoURL}
                alt="Profile img"
                referrerPolicy="no-referrer"
                className="w-12 rounded-full cursor-pointer"
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
