"use client";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import Link from "next/link";

const LuxuryBooking = () => {
  const router = useRouter()
  const [dateIn, setDateIn] = useState(null);
  const [dateOut, setDateOut] = useState(null);
  const today = new Date();
  const [room, setRoom] = useState("");
  const [bgIndex, setBgIndex] = useState(0);
  const [guest, setGuest] = useState("");
  const backgroundImages = [
    "/luxury2.jpg",
    "/luxury1.png",
    "/luxury3.png",
    "/luxury4.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative h-screen  bg-cover bg-center mx-3 md:mx-14"
      style={{ backgroundImage: `url(${backgroundImages[bgIndex]})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-0 flex flex-col justify-center items-center">
        <h1 className="md:text-8xl text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-8">
          LUXURY
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form className=" ">
            <div className="flex flex-col gap-3 md:gap-5 md:flex-row">
              <div className="">
                <Label htmlFor="date">Check In</Label>
                <Popover className="">
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
                        format(dateIn, "PPP")
                      ) : (
                        <span>select a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    align="start"
                    sideOffset={2}
                  >
                    <DatePicker
                      selected={dateIn}
                      onChange={(selectedDate) => setDateIn(selectedDate)}
                      inline
                      minDate={today}
                      dateFormat="MMMM d, yyyy"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="date">Check Out</Label>
                <Popover className="">
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
                        format(dateOut, "PPP")
                      ) : (
                        <span>select a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    align="start"
                    sideOffset={2}
                  >
                    <DatePicker
                      selected={dateOut}
                      onChange={(selectedDate) => setDateOut(selectedDate)}
                      inline
                      minDate={today}
                      dateFormat="MMMM d, yyyy"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="room">Rooms</Label>
                <Select value={room} onValueChange={setRoom}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select Rooms"
                      className="text-slate-200"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="mode">Guest</Label>
                <Select value={guest} onValueChange={setGuest}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="No. of Guest"
                      className="text-slate-200"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="w-full flex flex-row pt-5 items-center  ">
              <Link className="bg-brand text-white px-4 py-2  rounded-md hover:bg-brand font-serif hover:scale-105" href= "/rooms/all-rooms">
                View Availability
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LuxuryBooking;
