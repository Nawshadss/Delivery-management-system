import React, { useState } from "react";
import Slider from "../components/Slider.jsx";
import Hero from "../components/Hero.jsx";

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
  const countData = useLoaderData();
  const [topDelivers, setTopDelivers] = useState();
  const axiosPub = AxiosPublic();
  axiosPub.get("http://localhost:5000/topdelivers").then((res) => {
    console.log(res.data);
    setTopDelivers(res.data);
  });

  return (
    <div className="slider max-w-[1440px] mx-auto bg-white h-[400px]">
      <div className="relative max-h-[500px]">
        <Slider></Slider>
        <div className="absolute top-0 h-[400px] z-10 w-full">
          <Hero></Hero>
        </div>
      </div>

      <div className="bgImage ">
        <Heading heading={"What W Serve"}></Heading>
        <div className="flex flex-wrap items-center justify-evenly ">
          <HomeCard
            image={man}
            para={
              "We provide with good ,reliable and efficient workers throughout your orders"
            }
            title={"Efficient Workers"}
          ></HomeCard>
          <HomeCard
            para={"We provide with Fast shiping on time"}
            image={van}
            title={"Fast Delivary"}
          ></HomeCard>
          <HomeCard
            para={"We provide delivary within a day or your time of choise"}
            image={delivary}
            title={"One Day delivary"}
          ></HomeCard>
        </div>
        <br />
        <Statictis countData={countData}></Statictis>
      </div>
      <div className=" bg-white">
        {topDelivers.map((data) => (
          <DeliverayCard></DeliverayCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
