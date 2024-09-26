"use client";
import React, { useEffect, useState } from "react";
import { firestore } from "@/app/config"; // Adjust the import based on your project structure
import { collection, getDocs } from "firebase/firestore";
import { getRoomById } from "@/lib/getRoomById"; // Import the utility function to get room info
import { Button } from "@/components/ui/button";

const AllBookedRooms = () => {
  const [bookedRooms, setBookedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllBookedRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "bookedRooms"));

        const allBookedRoomsData = [];
        for (const doc of querySnapshot.docs) {
          const bookedRoom = doc.data();

          // Ensure booked rooms have valid dates before calling toDate()
          const bookedStart = bookedRoom.startDate
            ? bookedRoom.startDate.toDate()
            : null; // Convert to Date
          const bookedEnd = bookedRoom.endDate
            ? bookedRoom.endDate.toDate()
            : null; // Convert to Date

          // Check for valid booked dates
          if (bookedStart && bookedEnd) {
            bookedRoom.startDate = bookedStart;
            bookedRoom.endDate = bookedEnd;

            const roomDetails = await getRoomById(bookedRoom.roomId); // Fetch room details by roomId
            allBookedRoomsData.push({ ...bookedRoom, roomDetails });
          }
        }

        setBookedRooms(allBookedRoomsData);
      } catch (error) {
        console.error("Error fetching all booked rooms: ", error);
        setError("Failed to fetch all booked rooms.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllBookedRooms();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">
        All Booked Rooms
      </h1>
      {bookedRooms.length === 0 ? (
        <p className="text-center">No rooms have been booked yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {bookedRooms.map((bookedRoom, index) => (
            <div
              key={index}
              className="h-full bg-[#FEF7FF] shadow-xl rounded-tr-3xl rounded-md flex p-2 flex-col"
            >
              <div className="relative flex-1">
                {/* Discount badge (if applicable) */}
                {bookedRoom.roomDetails?.discount > 0 && (
                  <span className="absolute text-sm -right-px -top-px rounded-bl-3xl rounded-tr-md bg-rose-600 px-6 py-4 font-medium uppercase tracking-widest text-white">
                    Save {bookedRoom.roomDetails?.discount}%
                  </span>
                )}

                {/* Room image (if available) */}
                <img
                  src={bookedRoom.roomDetails?.imageUrl} // Use dynamic image URL if available
                  alt={bookedRoom.roomDetails?.name} // Image alt text
                  className="h-48 w-full rounded-tr-md object-cover rounded-tl-lg"
                />
                <div className="p-4 text-center bg-[#FEF7FF] rounded-md">
                  <h1 className="text-xl font-medium pb-2">
                    {bookedRoom.roomDetails?.roomName}
                  </h1>
                  {/* Room name */}
                  <div className="flex flex-col justify-center items-start">
                    <p>
                      <strong>Room ID:</strong> {bookedRoom.roomId}
                    </p>
                    <p>
                      <strong>Check-In:</strong>{" "}
                      {bookedRoom.startDate.toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Check-Out:</strong>{" "}
                      {bookedRoom.endDate.toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Payment Status:</strong>{" "}
                      {bookedRoom.payment ? "Paid" : "Pending"}
                    </p>
                    {/* Display price information */}
                    <div className="flex flex-row gap-4 justify-between pt-2 items-start">
                      <span className="text-brand">₹Price:</span>
                      <span className="line-through text-gray-500">
                        ₹{bookedRoom.roomDetails?.originalPrice} {/* Original Price */}
                      </span>
                      <span className="text-xl font-bold text-brand">
                        ₹{bookedRoom.roomDetails?.discountPrice} {/* Discount Price */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons at the bottom */}
              <div className="flex flex-row md:flex-col lg:flex-row w-full gap-4 pb-2 px-3 justify-between mt-auto">
                <Button className="w-full bg-brand hover:bg-brand hover:scale-105">
                  View Booking Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBookedRooms;
