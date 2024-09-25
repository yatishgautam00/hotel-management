  "use client";

  import React, { useState, useEffect } from "react";
  import { useRouter } from "next/navigation";
  import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
  } from "firebase/auth";
  import { getFirestore, doc, setDoc, getDocs, collection } from "firebase/firestore"; // Import getDoc to check the secret code
  import { app, firestore, auth } from "@/app/config";
  import { Input } from "@/components/ui/input";
  import Link from "next/link";

  const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [googleSignedIn, setGoogleSignedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState(""); // State to store the selected role
    const [secretCode, setSecretCode] = useState(""); // State for secret code
    const [isManagement, setIsManagement] = useState(false); // Checkbox for management
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          router.push("/");
        }
      });

      return () => unsubscribe();
    }, [router]);

    const handleGoogleSignIn = async () => {
      const provider = new GoogleAuthProvider();
      try {
        setLoading(true);
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        setEmail(user.email);

        if (user.displayName) {
          setName(user.displayName);
          await saveUserToFirestore(user.uid, user.displayName, user.email, role);
          router.push("/");
        } else {
          setGoogleSignedIn(true);
          setLoading(false);
        }

        console.log("User signed in with Google:", user);
      } catch (error) {
        console.error("Error during Google sign-in:", error);
        setErrorMessage("Failed to sign in with Google.");
        setLoading(false);
      }
    };

    const handleEmailSignUp = async () => {
      if (!validateEmail(email)) {
        setErrorMessage("Please enter a valid email address.");
        return;
      }
    
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }
    
      try {
        setLoading(true);
    
        // Check if the management role was selected and verify the secret code first
        let roleFromCode = ""; // Variable to capture the role from secret code verification
        if (isManagement) {
          const { isValidCode, foundRole } = await verifySecretCode(secretCode);
          if (!isValidCode) {
            setErrorMessage("Invalid secret code for Management.");
            setLoading(false);
            return; // Prevent user sign-up if secret code is incorrect
          }
          roleFromCode = foundRole; // Set the role from the verification result
        }
    
        // Only proceed with Firebase Authentication after secret code validation
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    
        // Save the user to Firestore with the appropriate role
        await saveUserToFirestore(user.uid, name, email, isManagement ? roleFromCode : role); // Save the role obtained from code if management is checked
        router.push("/");
    
        console.log("User signed up with email and password:", user);
      } catch (error) {
        console.error("Error during email sign-up:", error);
        setErrorMessage("Failed to sign up with email.");
        setLoading(false);
      }
    };
      

    // Verify secret code by checking all documents in the roles collection
    const verifySecretCode = async (enteredCode) => {
      try {
        const rolesCollectionRef = collection(firestore, "roles"); // Reference the "roles" collection
        const querySnapshot = await getDocs(rolesCollectionRef); // Get all documents in the collection
    
        let isValidCode = false;
        let foundRole = ""; // Variable to store the found role
    
        querySnapshot.forEach((doc) => {
          const { code, role: docRole } = doc.data();
          if (code === enteredCode) {
            foundRole = docRole; // Set the found role
            isValidCode = true;
          }
        });
    
        // Return both the validity of the code and the role found
        return { isValidCode, foundRole };
      } catch (error) {
        console.error("Error verifying secret code:", error);
        return { isValidCode: false, foundRole: "" }; // Return false and an empty role on error
      }
    };
    
    const saveUserToFirestore = async (uid, name, email, role) => {
      try {
        await setDoc(doc(firestore, "users", uid), {
          name,
          email,
          role, // Save the role
        });
        console.log("User data saved to Firestore");
      } catch (error) {
        console.error("Error saving user data to Firestore:", error);
      }
    };

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };
    return (
      <div className="w-full max-w-sm mx-auto p-6 bg-white border-2 border-brand mt-10 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-brand">Register</h2>

        {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-brand h-12 w-12"></div>
            <p className="ml-3 text-brand">Redirecting, please wait...</p>
          </div>
        ) : (
          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Name:</label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-brand rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-gray-700">Email:</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-brand rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-gray-700">Password:</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-brand rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-gray-700">Confirm Password:</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-brand rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Role Selection */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="management"
                  checked={isManagement}
                  onChange={() => setIsManagement(!isManagement)}
                  className="mr-2"
                />
                <label htmlFor="management" className="text-gray-700">
                  I am from Management
                </label>
              </div>

              {/* Secret Code Input (Visible if Management is checked) */}
              {isManagement && (
                <div className="mt-4">
                  <label className="block text-gray-700">Secret Code:</label>
                  <Input
                    type="text"
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-brand rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
              )}

              <button
                onClick={handleEmailSignUp}
                className="w-full bg-brand text-white py-2 px-4 rounded hover:bg-brand"
              >
                Sign Up
              </button>
            </div>

            <div className="text-center my-4 text-gray-600">or</div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full py-2 px-4 rounded border-2 border-brand text-brand"
            >
              Sign in with Google
            </button>

            {googleSignedIn && (
              <div className="mt-4 space-y-4 ">
                <div>
                  <label className="block text-gray-700">Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
                <button
                  onClick={handleSaveName}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Save Name
                </button>
              </div>
            )}
            <h1 className="mt-2">
              Already have an account?
              <Link href={"/login"} className="text-blue-500 underline ">
                Login
              </Link>
            </h1>
          </div>
        )}
      </div>
    );
  };

  export default Register;
