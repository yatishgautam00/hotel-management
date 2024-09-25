import React from "react";

function About() {
  return (
    <div className=" px-3 pt-8   flex flex-col">
      <h1 className="pl-3 text-3xl font-sans font-bold">ABOUT US</h1>
      <div className="lg:px-14 lg:py-10 px-4 py-2">
      <div className="flex flex-col justify-normal items-center shadow-xl border-t-0  border border-slate-200">
        <p className="md:px-24 md:pt-10 px-7 text-justify  pt-4 pb-16">
          Our story began in [Year] in the heart of [City], where [Founderâ€™s
          Name] envisioned a place where luxury and hospitality converge to
          create unforgettable experiences. Inspired by the rich traditions of
          Indian hospitality, we opened our doors with a commitment to providing
          unparalleled service and a sanctuary for travellers seeking both
          comfort and elegance. Over the years, our dedication to excellence has
          only deepened, earning us the trust and admiration of guests from
          around the world.
        </p>
      </div>
      </div>
    </div>
  );
}

export default About;
