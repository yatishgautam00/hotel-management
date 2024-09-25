// utils/getCurrentUser.js
import { auth } from "@/app/config"; // Adjust the import based on your project structure
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email); // Get user's email
      } else {
        setEmail(""); // Reset if no user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return email;
};
