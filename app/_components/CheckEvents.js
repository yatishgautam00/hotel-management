"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const CheckEvents = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, []);

  const slideDetails = [
    {
      sliderImg: "/bg-brown-1.png",
      title: "The Imperial Conference Hall",
      eventType: "Corporate Conference, Seminars, Business Meetings",
      hallFeatures:
        "Designed for high-profile business events, this hall can accommodate up to 200 guests.",
      rates: "Starting at $2,00,000 per event (excluding taxes and fees)",
      package:
        "Includes setup for meetings, AV support, and catering services.",
      slideClr: "bg-[#BD855E]",
    },
    {
      sliderImg: "/bg-orange-real-2.png",
      title: "Grand Ballroom",
      eventType: "Weddings, Receptions, Celebrations",
      hallFeatures:
        "A luxurious setting perfect for large gatherings, accommodating up to 500 guests.",
      rates: "Starting at $5,00,000 per event (excluding taxes and fees)",
      package: "Includes catering, decoration, and entertainment setup.",
      slideClr: "bg-[#F17D15]",
    },
    {
      sliderImg: "/bg-metallic-brown-3.png",
      title: "Grand Ballroom",
      eventType: "Weddings, Receptions, Celebrations",
      hallFeatures:
        "A luxurious setting perfect for large gatherings, accommodating up to 500 guests.",
      rates: "Starting at $5,00,000 per event (excluding taxes and fees)",
      package: "Includes catering, decoration, and entertainment setup.",
      slideClr: "bg-[#BFAF9A]",
    },
    {
      sliderImg: "bg-pink-4.png",
      title: "Grand Ballroom",
      eventType: "Weddings, Receptions, Celebrations",
      hallFeatures:
        "A luxurious setting perfect for large gatherings, accommodating up to 500 guests.",
      rates: "Starting at $5,00,000 per event (excluding taxes and fees)",
      package: "Includes catering, decoration, and entertainment setup.",
      slideClr: "bg-[#B52E4F]",
    },
  ];

  const totalSlides = slideDetails.length;

  // Fallback in case slideDetails is empty or currentSlide is out of bounds
  const currentSlideDetail = slideDetails[currentSlide] || {};

  return (
    <div className="relative w-full  pt-2" data-carousel="slide">
      <div
        className={`relative h-auto  ${currentSlideDetail.slideClr} overflow-hidden w-full  flex  flex-col  lg:flex-row md:px-10 px-8`}
      >
        {/* Slide Images */}
        <div className="lg:w-1/2 w-full flex items-center md:px-10   md:py-10 px-4 py-4 justify-center">
          {currentSlideDetail.sliderImg ? (
            <img
              src={currentSlideDetail.sliderImg}
              alt={`Slide ${currentSlide + 1}`}
              layout="fill"
              // objectFit="cover"
              className="rounded-lg object-cover w-full "
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600">
              No Image Available
            </div>
          )}
        </div>

        {/* Slide Details */}
        <div
          className={`lg:w-1/2 p-2 md:p-6 lg:p-8 w-full flex flex-col md:gap-5 gap-1  justify-evenly rounded-lg`}
        >
          <h2 className="text-4xl font-bold text-white mb-4 font-serif">
            {currentSlideDetail.title || "No Title Available"}
          </h2>
          <p className="text-lg font-medium text-white mb-2">
            <span className="block font-normal w-max border-2 mb-1 border-white rounded-full px-4 text-white">
              Event Type
            </span>{" "}
            <span className="font-normal  font-sans">
              {currentSlideDetail.eventType || "No Event Type Available"}
            </span>
          </p>
          <p className="text-lg font-medium text-white mb-2">
            <span className="block font-normal w-max border-2 mb-1 border-white rounded-full px-4 text-white">
              Hall Features
            </span>{" "}
            <span className="font-normal  font-sans">
              {currentSlideDetail.hallFeatures || "No Hall Features Available"}
            </span>
          </p>
          <p className="text-lg font-medium text-white mb-2">
            <span className="block font-normal w-max border-2 mb-1 border-white rounded-full px-4 text-white">
              Rates
            </span>
            <span className="font-normal  font-sans">
              {currentSlideDetail.rates || "No Rates Available"}
            </span>
          </p>
          <p className="text-lg font-medium text-white mb-2">
            <span className="block font-normal w-max border-2 mb-1 border-white rounded-full px-4 text-white">
              Package
            </span>
            <span className="font-normal font-sans">
              {currentSlideDetail.package || "No Package Information Available"}
            </span>
          </p>
        </div>
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex justify-center bottom-[-30px] left-1/2 transform -translate-x-1/2 space-x-3 rtl:space-x-reverse">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-black" : "bg-gray-300"
            }`}
            aria-current={currentSlide === index ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckEvents;
