import React, { useEffect, useState } from "react";
import Slider from "../components/Slider.jsx";
import Hero from "../components/Hero.jsx";
import Aos from "aos";
import "aos/dist/aos.css";
import "../App.css";
import Heading from "../components/Heading.jsx";
import HomeCard from "../components/HomeCard.jsx";
import man from "../assets/man.png";
import van from "../assets/van.png";
import delivary from "../assets/delivary.png";
import Statictis from "../components/Statictis.jsx";
import { useLoaderData } from "react-router-dom";
import AxiosPublic from "../hooks/AxiosPublic.jsx";
import DeliverayCard from "../components/DeliverayCard.jsx";

const Home = () => {
  const [countData, setCountData] = useState([]);
  const [topDelivers, setTopDelivers] = useState([]);
  const axiosPub = AxiosPublic();
  useEffect(() => {
    axiosPub
      .get("https://assaignment12-server-site.vercel.app/topdelivers")
      .then((res) => {
        // console.log(res.data);
        setTopDelivers(res.data);
      });
    fetch("https://assaignment12-server-site.vercel.app/stats")
      .then((res) => res.json())
      .then((data) => setCountData(data));
    Aos.init();
  }, []);

  return (
    <div className="slider max-w-[1440px] mx-auto bg-white h-[400px]">
      <div className="relative max-h-[500px]">
        <Slider></Slider>
        <div className="absolute top-0 h-[400px] z-10 w-full">
          <Hero></Hero>
        </div>
      </div>
      <div className="bgImage ">
        <Heading heading={"What We Serve"}></Heading>
        <div className="flex flex-wrap items-center justify-evenly ">
          <div data-aos="fade-right">
            <HomeCard
              image={man}
              para={
                "We provide with good ,reliable and efficient workers throughout your orders"
              }
              title={"Efficient Workers"}
            ></HomeCard>
          </div>
          <div data-aos="fade-left">
            <HomeCard
              para={"We provide with Fast shiping on time"}
              image={van}
              title={"Fast Delivary"}
            ></HomeCard>
          </div>

          <div data-aos="fade-up-right">
            <HomeCard
              para={"We provide delivary within a day or your time of choise"}
              image={delivary}
              title={"One Day delivary"}
            ></HomeCard>
          </div>
        </div>
        <br />
        <div data-aos="fade-right">
          <Statictis countData={countData}></Statictis>
        </div>
        <h1
          data-aos="fade-left"
          className="text-white font-bold text-4xl text-center my-4"
        >
          Our Top delivary Man
        </h1>
        <div className="  flex flex-wrap items-center justify-evenly gap-5">
          {topDelivers.map((data) => (
            <DeliverayCard data={data}></DeliverayCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
