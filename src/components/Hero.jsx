import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
const Hero = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div>
      <div className="hero h-[400px]  bg-[#192a5680]">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1
              data-aos="fade-left"
              className="text-3xl font-bold text-[#1F8FFF]"
            >
              Welcome To Courierlab
            </h1>
            <p
              className="py-6 text-white text-4xl font-bold"
              data-aos="fade-right"
            >
              We Provide the best Delivery Service in The Town
            </p>
            <label
              data-aos="fade-left"
              className="input input-bordered flex items-center gap-2"
            >
              <input type="text" className="grow" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
