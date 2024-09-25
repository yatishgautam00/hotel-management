"use client";
import { useState, useEffect } from "react";
import { firestore, storage, auth } from "@/app/config"; // Adjust import based on your config setup
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  getFirestore,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@/components/ui/button";
const AddOrUpdateRoom = () => {
  // States for form fields
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("single-room");
  const [discount, setDiscount] = useState(0);
  const [roomId, setRoomId] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [services, setServices] = useState([""]);
  const [image, setImage] = useState(null); // For storing image file
  const [imageUrl, setImageUrl] = useState(""); // Store Firebase Storage image URL
  const [rooms, setRooms] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false); // To track update mode
  const [currentRoomDocId, setCurrentRoomDocId] = useState(null); // Track current room doc for update
  const [showForm, setShowForm] = useState(false); // To toggle the form pop-up
  const [error, setError] = useState(""); // To display errors
  const [success, setSuccess] = useState(""); // To display success message
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, check their role
        const userDoc = doc(firestore, "users", user.uid);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const { role } = userData;

          // Check if the role is null
          if (!role) {
            router.push("/"); // Redirect to home page if role is null
          }
        } else {
          router.push("/"); // Redirect to home page if user document does not exist
        }
      } else {
        // User is not signed in, redirect to home page
        router.push("/");
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [router]);
  // Function to calculate Discount Price
  useEffect(() => {
    const calculatedDiscountPrice =
      originalPrice - (originalPrice * discount) / 100;
    setDiscountPrice(calculatedDiscountPrice);
  }, [discount, originalPrice]);

  // Function to fetch all rooms with real-time updates
  useEffect(() => {
    const fetchRooms = () => {
      const q = collection(firestore, "rooms");

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedRooms = [];
        querySnapshot.forEach((doc) => {
          fetchedRooms.push({ id: doc.id, ...doc.data() });
        });
        setRooms(fetchedRooms);
      });

      // Cleanup listener on unmount
      return () => unsubscribe();
    };

    fetchRooms();
  }, []);

  // Function to handle image upload to Firebase Storage
  const handleImageUpload = async () => {
    if (image) {
      const storageRef = ref(storage, `roomsImages/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    }
    return null;
  };

  // Function to handle the form submission for adding or updating a room
  const handleAddOrUpdateRoom = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      let uploadedImageUrl = imageUrl;
      if (image) {
        uploadedImageUrl = await handleImageUpload();
      }

      // Add or update document to the Firestore 'rooms' collection
      if (isUpdate) {
        const docRef = doc(firestore, "rooms", currentRoomDocId);
        await updateDoc(docRef, {
          roomName,
          type: roomType,
          discount: Number(discount),
          roomId,
          originalPrice: Number(originalPrice),
          discountPrice: Number(discountPrice),
          service: services.filter((service) => service.trim() !== ""),
          imageUrl: uploadedImageUrl, // Save image URL
        });
        setSuccess("Room updated successfully!");
      } else {
        // Check if roomId is unique
        const q = query(
          collection(firestore, "rooms"),
          where("roomId", "==", roomId)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setError("Room ID is already in use. Please choose a different ID.");
          setLoading(false);
          return;
        }

        await addDoc(collection(firestore, "rooms"), {
          roomName,
          type: roomType,
          discount: Number(discount),
          roomId,
          originalPrice: Number(originalPrice),
          discountPrice: Number(discountPrice),
          service: services.filter((service) => service.trim() !== ""),
          imageUrl: uploadedImageUrl, // Save image URL
        });
        setSuccess("Room added successfully!");
      }

      // Reset form fields
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error("Error adding/updating room: ", error);
      setError("Failed to process the request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setRoomName("");
    setRoomType("single-room");
    setDiscount(0);
    setRoomId("");
    setOriginalPrice(0);
    setServices([""]);
    setIsUpdate(false);
    setCurrentRoomDocId(null);
    setImage(null); // Reset image
    setImageUrl(""); // Reset image URL
  };

  // Handler to add a new service input
  const addServiceField = () => {
    setServices([...services, ""]);
  };

  // Handler to update service values
  const updateService = (index, value) => {
    const newServices = [...services];
    newServices[index] = value;
    setServices(newServices);
  };

  // Open form for adding a new room
  const handleAddNewRoom = () => {
    resetForm();
    setShowForm(true);
  };

  // Open form for updating an existing room
  const handleEditRoom = (room) => {
    setRoomName(room.roomName);
    setRoomType(room.type);
    setDiscount(room.discount);
    setRoomId(room.roomId);
    setOriginalPrice(room.originalPrice);
    setServices(room.service);
    setImageUrl(room.imageUrl); // Load the existing image URL
    setIsUpdate(true);
    setCurrentRoomDocId(room.id);
    setShowForm(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Rooms Management</h2>
      {/* Display room cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4 mb-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="h-full bg-[#FEF7FF] cursor-pointer shadow-xl rounded-tr-3xl rounded-md flex flex-col p-4" // Add padding to the outer container
            onClick={() => handleEditRoom(room)}
          >
            <div className="relative flex-1">
              {room.discount > 0 && ( // Use room.discount to check for discount
                <span className="absolute text-sm -right-px -top-px rounded-bl-3xl rounded-tr-md bg-rose-600 px-6 py-4 font-medium uppercase tracking-widest text-white">
                  Save {room.discount}%
                </span>
              )}

              {room.imageUrl && ( // Check for room.imageUrl to render the image
                <img
                  src={room.imageUrl} // Use dynamic image URL
                  alt={room.roomName} // Image alt text
                  className="h-48 w-full rounded-tr-md object-cover rounded-tl-lg"
                />
              )}

              <div className="p-4 text-center bg-[#FEF7FF] rounded-md">
                <h1 className="text-xl font-medium pb-2">{room.roomName}</h1>{" "}
                {/* Room name */}
                <div className="flex flex-col justify-center items-start">
                  {/* Additional services can be displayed here if applicable */}
                  {room.service && // Check for services array
                    room.service.map((service, index) => (
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
                  <span className="text-brand">₹Price:</span>{" "}
                  {/* Original Price */}
                  <span className="line-through text-gray-500">
                    ₹{room.originalPrice} {/* Original Price */}
                  </span>
                  <span className="text-xl font-bold text-brand">
                    ₹{room.discountPrice} {/* Discount Price */}
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons should be at the bottom */}
            {/* <div className="flex flex-row md:flex-col lg:flex-row w-full gap-4 pb-2 px-3 justify-between mt-auto">
    <Button className="w-full bg-brand hover:bg-brand hover:scale-105" onClick={handleBookNowClick}>
      Book Now
    </Button>
  </div> */}

            {/* {isBooking && ( // Show booking modal if isBooking is true
    <BookingModal
      roomId={room.id} // Use room.id to pass room ID
      startDate={startDate}
      endDate={endDate}
      roomName={room.roomName} // Pass room name
      paymentFee={room.discountPrice} // Pass discount price
      onClose={() => setIsBooking(false)} // Close modal function
    />
  )} */}
          </div>
        ))}
      </div>

      {/* Floating button to add new room */}
      <button
        onClick={handleAddNewRoom}
        className="fixed bottom-10 right-10 bg-brand text-white p-3 rounded-md shadow-lg"
      >
        + Add Room
      </button>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center overflow-y-auto">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-4 md:mx-auto max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {isUpdate ? "Update Room" : "Add New Room"}
            </h2>
            {error && (
              <div className="bg-red-100 text-red-600 p-2 rounded mb-4">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 text-green-600 p-2 rounded mb-4">
                {success}
              </div>
            )}
            <form onSubmit={handleAddOrUpdateRoom} className="space-y-4">
              {/* Room Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Room Name
                </label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Room Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Room Type
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-md"
                  required
                >
                  <option value="single-room">Single Room</option>
                  <option value="double-room">Double Room</option>
                  <option value="triple-room">Triple Room</option>
                  <option value="exclusive-room">Exclusive Room</option>
                  <option value="family-room">Family Room</option>
                  <option value="deluxe-room">Deluxe Room</option>
                </select>
              </div>

              {/* Original Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Original Price
                </label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-md"
                  required
                />
              </div>
              {/* Discount */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Discount (%)
                </label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-md"
                />
              </div>

              {/* Discounted Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Discounted Price
                </label>
                <input
                  type="number"
                  value={discountPrice}
                  readOnly
                  className="mt-1 block w-full p-2 border rounded-md bg-gray-100"
                />
              </div>

              {/* Services */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Services
                </label>
                {services.map((service, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={service}
                      onChange={(e) => updateService(index, e.target.value)}
                      className="block w-full p-2 border rounded-md"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addServiceField}
                  className="text-brand"
                >
                  + Add Another Service
                </button>
              </div>

              {/* Room ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Room ID
                </label>
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Room Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`mt-4 px-4 py-2 text-white font-semibold rounded-lg ${
                    loading ? "bg-gray-500" : "bg-brand"
                  }`}
                >
                  {isUpdate ? "Update Room" : "Add Room"}
                </button>
              </div>
            </form>
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2  bg-brand p-2 rounded-md py-0  text-white text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOrUpdateRoom;
