// BookingModal.js
import React, { useState } from "react";
import { firestore } from "@/app/config"; // Adjust the import based on your project structure
import { collection, addDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/lib/getCurrentUser"; // Adjust import based on your project structure
import { useRouter,usePathname } from "next/navigation";
function BookingModal({
  roomId,
  startDate,
  endDate,
  roomName,
  paymentFee,
  onClose,
}) {
    const router = useRouter()
    const currentPath= usePathname()
  const email = useCurrentUser(); // Fetch the current user's email
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    if (!email || !startDate || !endDate || !roomId || !paymentFee) {
      setMessage("All fields must be filled out!");
      setError(true);
      return;
    }

    setIsLoading(true);
    setError(false);

    // Simulate payment process
    setTimeout(async () => {
      try {
        // Simulate successful payment
        await addDoc(collection(firestore, "bookedRooms"), {
          email,
          startDate,
          endDate,
          roomId,
          payment: true,
        });
        setPaymentSuccess(true);
      } catch (error) {
        console.error("Error adding document: ", error);
      } finally {
        setIsLoading(false);
      }
    }, 2000); // Simulate 2 seconds payment processing time
  };
  const handleSuccessClose = ()=>{
    router.push("/my-bookings")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg">
        {error && (
          <h2 className="text-lg font-semibold text-brand mb-2">{message}</h2>
        )}
        <h2 className="text-lg font-semibold">Book Your Room</h2>

        {/* Display room details for confirmation */}
        <div className="mt-4">
          <h3 className="font-semibold">Room Details</h3>
          <p>
            <strong>Room Name:</strong> {roomName}
          </p>
          <p>
            <strong>Room ID:</strong> {roomId}
          </p>
          <p>
            <strong>Check-In Date:</strong>{" "}
            {startDate instanceof Date
              ? startDate.toDateString()
              : "Not available"}
          </p>
          <p>
            <strong>Check-Out Date:</strong>{" "}
            {endDate instanceof Date ? endDate.toDateString() : "Not available"}
          </p>
          <p>
            <strong>Payment Fee:</strong> ₹{paymentFee}
          </p>
        </div>

        {/* Email Input */}
        <label htmlFor="email" className="block mt-4">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email} // Use the fetched email
          readOnly // Make it read-only as it's auto-filled
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
<div className="flex-row flex justify-between ">
        {/* Confirm Payment Button */}
       { !paymentSuccess && (<Button
          className="mt-4 bg-brand hover:bg-brand hover:scale-105"
          onClick={handlePayment}
          disabled={isLoading || !email}
        >
          {isLoading ? "Processing..." : "Confirm Payment"}
        </Button>)
}
        {/* Payment Success Message */}
      

        {/* Close Button */}
        {!paymentSuccess && (
          <Button onClick={onClose} className="mt-4 ">
            Close
          </Button>
        )}
        </div>
          {paymentSuccess && (
          <div className="text-center mt-4">
            <h3 className="text-lg font-semibold">Payment Successful!</h3>
            <p>Your room has been booked.</p>
            <Button onClick={handleSuccessClose} className="mt-4">
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingModal;
