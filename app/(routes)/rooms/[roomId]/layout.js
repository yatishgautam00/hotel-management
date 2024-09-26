"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/config";
export default function Layout({ children }) {
  const router = useRouter();
  const params = usePathname().split("/")[2];
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // If user is not authenticated, redirect to homepage
        router.push("/login");
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [router]);
  return (
    <div className="grid grid-cols-4">
      <div className="hidden md:block">
        {/* category */}
        <div className="bg-brand h-screen  flex justify-start  items-center w-ful text-center   px-2">
          <div className="flex flex-col  gap-1 w-full ">
            <div className="flex flex-row text-2xl  w-full  justify- gap-3 text-white items-center">
              <Link
                className={`hover:bg-pink-500 w-full px-2 py-2 rounded-lg ${
                  params === "all-rooms" && "bg-pink-500"
                }`}
                href={"/rooms/all-rooms"}
              >
                All Rooms
              </Link>
            </div>

            <div className="flex flex-row text-2xl w-full   justify- gap-3 text-white items-center">
              <Link
                href={"/rooms/single-room"}
                className={`hover:bg-pink-500 w-full px-2 py-2 rounded-lg ${
                  params === "single-room" && "bg-pink-500"
                }`}
              >
                Single Rooms
              </Link>
            </div>

            <div className="flex flex-row text-2xl w-full   justify- gap-3 text-white items-center">
              <Link
                className={`hover:bg-pink-500 w-full px-2 py-2 rounded-lg ${
                  params === "double-room" && "bg-pink-500"
                }`}
                href={"/rooms/double-room"}
              >
                Double Rooms
              </Link>
            </div>

            <div className="flex flex-row text-2xl w-full   justify- gap-3 text-white items-center">
              <Link
                className={`hover:bg-pink-500 w-full px-2 py-2 rounded-lg ${
                  params === "triple-room" && "bg-pink-500"
                }`}
                href={"/rooms/triple-room"}
              >
                Triple Rooms
              </Link>
            </div>

            <div className="flex flex-row text-2xl  w-full  justify- gap-3 text-white items-center">
              <Link
                className={`hover:bg-pink-500 w-full px-2 py-2 rounded-lg ${
                  params === "family-room" && "bg-pink-500"
                }`}
                href={"/rooms/family-room"}
              >
                Family Rooms
              </Link>
            </div>
            <div className="flex flex-row text-2xl  w-full  justify- gap-3 text-white items-center">
              <Link
                className={`hover:bg-pink-500 w-full px-2 py-2 rounded-lg ${
                  params === "exclusive-room" && "bg-pink-500"
                }`}
                href={"/rooms/exclusive-room"}
              >
                Exclusive Rooms
              </Link>
            </div>

            <div className="flex flex-row text-2xl  w-full  justify- gap-3 text-white items-center">
              <Link
                className={`hover:bg-pink-500 w-full px-2 py-2 rounded-lg ${
                  params === "deluxe-room" && "bg-pink-500"
                }`}
                href={"/rooms/deluxe-room"}
              >
                Deluxe Rooms
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-4 md:col-span-3  px-4     md:px-16 ">
        {children}
      </div>
    </div>
  );
}
