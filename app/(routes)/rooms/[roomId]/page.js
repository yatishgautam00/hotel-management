"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import RoomCard from "@/app/_components/RoomCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/app/config"; // Adjust this import based on your project structure
import { Calendar as CalendarIcon } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

function Page() {
  const params = usePathname();
  const roomType = params.split("/")[2]; // Get the room type from the URL
  const [rooms, setRooms] = useState([]);
  const [bookedRooms, setBookedRooms] = useState([]); // State for booked rooms
  const [dateIn, setDateIn] = useState(null); // State for check-in date
  const [dateOut, setDateOut] = useState(null); // State for check-out date
  const today = new Date(); // Today's date for minimum date selection
  const [error, setError] = useState(""); // State for error message

  const handleDateChange = (selectedStart, selectedEnd) => {
    if (selectedStart && selectedEnd && selectedEnd < selectedStart) {
      setError("Check-out date cannot be earlier than check-in date.");
    } else {
      setError(""); // Clear the error if dates are valid
      if (selectedStart) setDateIn(selectedStart);
      if (selectedEnd) setDateOut(selectedEnd);
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      let q = collection(firestore, "rooms");

      if (roomType && roomType !== "all-rooms") {
        q = query(q, where("type", "==", roomType));
      }

      const snapshot = await getDocs(q);
      const roomData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomData);
    };

    const fetchBookedRooms = async () => {
      const snapshot = await getDocs(collection(firestore, "bookedRooms"));
      const bookedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookedRooms(bookedData);
    };

    fetchRooms();
    fetchBookedRooms();
  }, [roomType]);

  // Function to check if the selected dates overlap with booked rooms for a specific room
  const isRoomBooked = (roomId, start, end) => {
    if (!start || !end) {
      return false; // If no dates are provided, don't filter out any rooms
    }

    return bookedRooms.some((booked) => {
      // Ensure booked rooms have valid dates before calling toDate()
      const bookedStart = booked.startDate ? booked.startDate.toDate() : null; // Assuming startDate is a Firestore Timestamp
      const bookedEnd = booked.endDate ? booked.endDate.toDate() : null; // Assuming endDate is a Firestore Timestamp

      // Check for valid booked dates
      if (!bookedStart || !bookedEnd) {
        return false; // Skip this booked room if dates are invalid
      }
console.log(roomId)
// console.log(bookedStart)
console.log(booked.roomId)
      // Ensure the booked room ID matches
      return (
        booked.roomId === roomId && // Check room ID matches
        ((start >= bookedStart && start <= bookedEnd) || // Check if the start date overlaps
        (end >= bookedStart && end <= bookedEnd) || // Check if the end date overlaps
        (start <= bookedStart && end >= bookedEnd)) // Check if the booked room is entirely within the selected range
      );
    });
  };

  // Filter out booked rooms based on selected dates
  const availableRooms = rooms.filter((room) => {
    const isBooked = isRoomBooked(room.roomId, dateIn, dateOut); // Check if this specific room is booked
    return !isBooked; // Only return rooms that are not booked
  });

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <h1 className="text-xl px-0 pb-4 uppercase">{roomType}</h1>

      {/* Date Input Fields */}
      <div className="mb-4 flex flex-row">
        <div className="mr-4">
          <Label htmlFor="dateIn">Check In</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={
                  "w-full justify-start text-left font-normal " +
                  (!dateIn && "text-muted-foreground")
                }
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateIn ? (
                  format(dateIn, "dd/MM/yyyy")
                ) : (
                  <span>Select a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start" sideOffset={2}>
              <DatePicker
                selected={dateIn}
                onChange={(selectedDate) => handleDateChange(selectedDate, dateOut)}
                inline
                minDate={today}
                dateFormat="MMMM d, yyyy"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="dateOut">Check Out</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={
                  "w-full justify-start text-left font-normal " +
                  (!dateOut && "text-muted-foreground")
                }
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateOut ? (
                  format(dateOut, "dd/MM/yyyy")
                ) : (
                  <span>Select a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start" sideOffset={2}>
              <DatePicker
                selected={dateOut}
                onChange={(selectedDate) => handleDateChange(dateIn, selectedDate)}
                inline
                minDate={dateIn ? dateIn : today} // Set min date based on check-in date
                dateFormat="MMMM d, yyyy"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-14 h-full grid-rows-2">
        {availableRooms.length > 0 ? (
          availableRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              startDate={dateIn}
              endDate={dateOut}
            />
          ))
        ) : (
          <p>Currently no rooms available for this type.</p> // Fallback message
        )}
      </div>
    </div>
  );
}

export default Page;
