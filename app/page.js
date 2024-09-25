import Image from "next/image";
import Hero from "./_components/Hero";
import About from "./_components/About";
import WeGiveYou from "./_components/WeGiveYou";
import CheckRooms from "./_components/CheckRooms";
import CheckEvents from "./_components/CheckEvents";
import Contact from "./_components/Contact";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <WeGiveYou />
      <CheckRooms />
      <CheckEvents /> 
      <Contact />
    </div>
  );
}
