import { Button } from "@/components/ui/button";
import React from "react";

function WeGiveYouTemp({ heading, information, button, bgImg }) {
  return (
    <section className={`relative bg-cover bg-center ${bgImg} bg-no-repeat md:mb-16 mb-6`}>
      <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:px-8 flex items-center justify-center h-2/4">
        <div className="lg:px-20 md:px-14 px-4 text-center flex flex-col justify-center w-full items-center">
          <h1 className="text-xl font-extrabold border-2 border-white px-6 rounded-full py-2 text-white">
            {heading}
          </h1>

          <p className="mt-4 text-justify text-white text-md">
            {information}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center justify-center">
            <Button
            
              className="w-full bg-gray-950 border-[3px] rounded-lg border-white px-8 py-3 text-sm font-medium text-white shadowfocus:outline-none focus:ring sm:w-auto"
            >
              {button}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeGiveYouTemp;
