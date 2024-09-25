import React from "react";
import WeGiveYouTemp from "./WeGiveYouTemp";

function WeGiveYou() {
  const data = [
    {
      bgImg: "bg-[url('/wegiveyou(4).png')]",
      heading: "Online Booking System",
      information:
        "Experience the ease of booking your stay with our user-friendly online booking system. Browse through our range of luxurious rooms and suites, select your desired dates, and confirm your reservation in just a few clicks. Whether planning a romantic getaway, a family vacation, or a business trip, our secure and efficient booking platform ensures a hassle-free experience. Enjoy exclusive benefits and special rates when you book directly with us.",
      button: "Join Us",
    },
    {
      bgImg: "bg-[url('/wegiveyou(6).png')]",
      heading: "Private Dining",
      information:
        "Indulge in an intimate dining experience tailored to your preferences. Our private dining service offers a selection of gourmet dishes prepared by our master chefs, served in the privacy of your room or a secluded dining area. Perfect for romantic dinners, family celebrations, or business meetings, our team will craft a personalized menu to suit your taste and occasion. Enjoy impeccable service, exquisite cuisine, and an ambiance that sets the perfect mood for your special moments.",
      button: "Join Us",
    },
    {
      bgImg: "bg-[url('/wegiveyou(5).png')]",
      heading: "Special Offers",
      information:
        "Take advantage of our exclusive offers and packages designed to enhance your stay. Whether you’re seeking a romantic escape, a family adventure, or a luxurious weekend retreat, we have something for everyone. Enjoy discounts on room rates, complimentary breakfast, spa treatments, and more. Check our app regularly to discover the latest promotions and seasonal deals that make your stay even more memorable.",
      button: "Join Us",
    },
      {
        bgImg: "bg-[url('/wegiveyou(5).png')]",
        heading: "Confrence & Events",
        information:
          "Host your next conference, meeting, or special event in our state-of-the-art facilities. Our hotel offers a variety of versatile spaces equipped with the latest technology to accommodate events of any size. Whether it’s a corporate seminar, a wedding, or a grand celebration, our dedicated events team will assist you in planning every detail to ensure a flawless execution. From customized catering options to tailored seating arrangements, we are committed to making your event a success.",
        button: "Join Us",
      },
  ];

  return (
    <div className="px-4 py-4 flex flex-col gap-4" id="facilities">
      <h1 className="pl-3 text-3xl font-sans font-bold">WE GIVE YOU</h1>
      <div className="md:px-10 md:py-10 pt-3">
        {data.map((item, index) => (
          <WeGiveYouTemp
            key={index}
            heading={item.heading}
            button={item.button}
            information={item.information}
            bgImg={item.bgImg}
          />
        ))}
      </div>
    </div>
  );
}

export default WeGiveYou;
