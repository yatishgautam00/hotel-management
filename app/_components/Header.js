"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "@/app/config"; // Import your Firebase configuration
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"; // Adjust based on your project structure
import { Button } from "@/components/ui/button"; // Import the Button component from ShadCN

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // State for user role
  const [sheetOpen, setSheetOpen] = useState(false); // State to control the sheet visibility
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        const userDocRef = doc(firestore, "users", user.uid); // Reference to the user document
        const userDoc = await getDoc(userDocRef); // Get the document

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role); // Set the user role
        }
      } else {
        setIsAuthenticated(false);
        setUserRole(null); // Reset user role if not authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="w-full flex h-[80px]">
      <div className="w-full flex px-3 md:px-20 flex-row justify-between items-center">
        <div className="lg:flex flex-row lg:gap-16 hidden md:gap-12 font-serif font-medium text-xl">
          <Link href={"/"} className="hover:scale-105">
            Home
          </Link>
          <Link href={"/rooms/all-rooms"} className="hover:scale-105">
            Rooms
          </Link>
          <Link
            href={userRole === null ? "/#contact" : "/add-room"}
            className="hover:scale-105"
          >
            {userRole === null ? "Contact" : "Add Rooms"}
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <Image src={"/logo-hms.svg"} alt="logo" width={70} height={70} />
        </div>

        <div className="lg:flex flex-row lg:gap-16 hidden md:gap-12 gap-5 font-serif font-medium text-xl">
          <Link href={"/#facilities"} className="hover:scale-105">
            Facilities
          </Link>
          <Link href={"/my-bookings"} className="hover:scale-105">
            Bookings
          </Link>

          {isAuthenticated ? (
            <>
              <button onClick={handleSignOut} className="text-red-500">
                Sign Out
              </button>
            </>
          ) : (
            <Link href={"/login"} className="hover:scale-105">
              Sign In
            </Link>
          )}

          {/* Sheet Trigger for small screens */}
          
        </div>
        <Sheet>
            <SheetTrigger asChild>
              <Button className="lg:hidden">Menu</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                {/* <SheetDescription>
                  Navigate through the sections of the application.
                </SheetDescription> */}
              </SheetHeader>
              <div className="flex flex-col space-y-2">
                <Link href={"/"} onClick={() => setSheetOpen(false)}>
                  Home
                </Link>
                <Link
                  href={"/rooms/all-rooms"}
                  onClick={() => setSheetOpen(false)}
                >
                  Rooms
                </Link>
                <Link
                  href={userRole === null ? "/#contact" : "/add-room"}
                  onClick={() => setSheetOpen(false)}
                >
                  {userRole === null ? "Contact" : "Add Rooms"}
                </Link>
                <Link href={"/#facilities"} onClick={() => setSheetOpen(false)}>
                  Facilities
                </Link>
                <Link href={"/my-bookings"} onClick={() => setSheetOpen(false)}>
                  Bookings
                </Link>
                {isAuthenticated ? (
                  <button
                    onClick={handleSignOut}
                    className="text-red-500"
                    // onClick={() => setSheetOpen(false)}
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link href={"/login"} onClick={() => setSheetOpen(false)}>
                    Sign In
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
      </div>
    </div>
  );
}

export default Header;
