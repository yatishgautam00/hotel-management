import { firestore } from "@/app/config"; // Adjust the import based on your project structure
import { collection, query, where, getDocs } from "firebase/firestore";

export const getRoomById = async (roomId) => {
  const q = query(collection(firestore, "rooms"), where("roomId", "==", roomId)); // Query by roomId field
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const roomData = querySnapshot.docs[0].data(); // Get the first matched document
    console.log(roomData);
    return roomData; // Return the room data
  } else {
    console.error("No such room found!");
    return null; // Room not found
  }
};
