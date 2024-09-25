import { Phone } from "lucide-react";
import React from "react";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

function Footer() {
  return (
    <footer className="mt-5 bg-white">
      <div className="mx-auto max-w-screen-xl  px-4 md:py-10 py-5 sm:px-6  lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-brand   text-2xl font-bold ">
              <h1>Zager Digital Services</h1>
            </div>

            <p className=" text-xs pt-1 text-brand">
            It&lsquo;s All About Values 

            </p>

            <div className="flex flex-col pt-6 text-sm gap-5 w-full">
              <div>
                <p className="text-md text-brand flex flex-row items-center gap-3">
                  <FaPhoneAlt className="" />{" "}
                  <Link className=" " href={"tel:9407655717"}>+91-9407655717</Link>
                </p>
              </div>
              <div>
                <p className="text-md text-brand flex flex-row items-center  gap-3">
                  <MdEmail className="" />{" "}
                  <Link className="" href={"mailto: zagerdigitalservices@gmail.com"}>contact@zager.in</Link>
                </p>
              </div>
              <div>
                <p className="text-md text-brand flex flex-row gap-3">
                  <FaLocationDot className="" />{" "}
                  <span className="">
                  Startup Enclave, CSIT Campus, Shivaji Nagar, Balod Road, Durg, Chhattisgarh 491001
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex md:flex-row flex-wrap  justify-start md:justify-evenly pt-5 md:pt-10 text-brand gap-8 grid-cols-2 lg:col-span-2 lg:grid-cols-3">
            <div>
              <p className="font-bold text-lg ">Services</p>

              <ul className="pt-3 space-y-2 text-sm ">
                <li>
                  <Link href="/services#digitalMarketing" className=" transition hover:opacity-75">
                    {" "}
                    Digital Marketing{" "}
                  </Link>
                </li>

                <li>
                  <Link href="/services#websiteDevelopment" className="transition hover:opacity-75">
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link href="/services#itSolutions&Services" className=" transition hover:opacity-75">
                    IT Solutions
                  </Link>
                </li>

                <li>
                  <Link href="/services#designing" className="transition hover:opacity-75">
                    Designing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-lg ">Quick Link</p>

              <ul className="pt-3 space-y-2 text-sm">
                <li>
                  <Link href="/" className=" transition hover:opacity-75">
                    {" "}
                    Home{" "}
                  </Link>
                </li>

                <li>
                  <Link href="/about" className=" transition hover:opacity-75">
                    {" "}
                    About Us{" "}
                  </Link>
                </li>

                <li>
                  <Link href="/career" className=" transition hover:opacity-75">
                    Career{" "}
                  </Link>
                </li>
                <li>
                  <Link href="contact" className=" transition hover:opacity-75">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-lg ">Follow us</p>

              <ul className="pt-3 space-y-2 text-sm">
                <li>
                  <Link
                    href="https://www.facebook.com/zagerdigitalservices"
                    target="_blank"
                    className=" transition hover:opacity-75"
                  >
                    {" "}
                    FaceBook{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    href="https://www.instagram.com/zagerdigitalservices/"
                    target="_blank"
                    className=" transition hover:opacity-75"
                  >
                    {" "}
                    Instagram{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    href="https://www.linkedin.com/company/zager-digital-service/"
                    target="_blank"
                    className="transition hover:opacity-75"
                  >
                    {" "}
                    LinkedIn{" "}
                  </Link>
                </li>
                <li>
                  <Link href="" className="transition hover:opacity-75">
                    {" "}
                    Twitter{" "}
                  </Link>
                </li>
              </ul>
            </div>

            {/* <div>
              <p className="font-bold text-lg ">Our Platform</p>

              <ul className="pt-3 space-y-2 text-sm">
                <li>
                  <Link href="/gyaanadari" className=" transition hover:opacity-75">
                    {" "}
                    Gyaanadari{" "}
                  </Link>
                </li>

                <li>
                  <Link href="/jk-works" className=" transition hover:opacity-75">
                    {" "}
                    JK Works{" "}
                  </Link>
                </li>

                <li>
                  <Link href="/ira" className=" transition hover:opacity-75">
                  Ira Media & Productions{" "}
                  </Link>
                </li>
             
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
