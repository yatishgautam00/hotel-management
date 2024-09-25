import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import BookingModal from "./BookingModal";

function RoomCard({ room, startDate, endDate }) {
  const [isBooking, setIsBooking] = useState(false);
  // Destructure the room data
  const {
    imageUrl, // Room image URL from Firestore
    roomName, // Room name
    service, // Array of services
    originalPrice, // Original price
    discountPrice, // Discounted price
    discount, // Discount percentage
  } = room;

  const handleBookNowClick = () => {
    setIsBooking(true); // Open the booking modal
  };

  return (
    <div className="h-full bg-[#FEF7FF] shadow-xl rounded-tr-3xl rounded-md flex flex-col">
      <div className="relative flex-1"> {/* Allow this section to grow */}
        {discount > 0 && (
          <span className="absolute text-sm -right-px -top-px rounded-bl-3xl rounded-tr-md bg-rose-600 px-6 py-4 font-medium uppercase tracking-widest text-white">
            Save {discount}%
          </span>
        )}

        <img
          src={imageUrl} // Use dynamic image URL
          alt={roomName} // Image alt text
          className="h-48 w-full rounded-tr-md object-cover rounded-tl-lg"
        />
        <div className="p-4 text-center bg-[#FEF7FF] rounded-md">
          <h1 className="text-xl font-medium pb-2">{roomName}</h1>
          {/* Room name */}
          <div className="flex flex-col justify-center items-start">
            {/* Services */}
            {service &&
              service.map((service, index) => (
                <h2
                  key={index}
                  className="flex flex-row justify-center items-center text-start"
                >
                  <IoIosCheckmarkCircleOutline className="mr-2 text-brand" />
                  {service}
                </h2>
              ))}
          </div>
          <div className="flex flex-row gap-4 justify-between pt-2 items-start">
            <span className="text-brand">₹Price:</span> {/* Original Price */}
            <span className="line-through text-gray-500">
              ₹{originalPrice}
            </span>
            {/* Original Price */}
            <span className="text-xl font-bold text-brand">
              ₹{discountPrice}
            </span>
            {/* Discount Price */}
          </div>
        </div>
      </div>

      {/* Buttons should be at the bottom */}
      <div className="flex flex-row md:flex-col lg:flex-row w-full gap-4 pb-2 px-3 justify-between mt-auto">
        {/* Price Section */}
          {/* <Button className="w-full border-2 border-brand bg-[#FEF7FF] hover:scale-105 hover:bg-white text-brand">
            Add to Cart
          </Button> */}
        <Button className="w-full bg-brand hover:bg-brand hover:scale-105" onClick={handleBookNowClick}>
          Book Now
        </Button>
      </div>

      {isBooking && (
        <BookingModal
          roomId={room.roomId} // Pass roomId to the booking modal
          startDate={startDate}
          endDate={endDate}
          roomName={roomName}
          paymentFee={discountPrice}
          onClose={() => setIsBooking(false)} // Close modal function
        />
      )}
    </div>
  );
}

export default RoomCard;
