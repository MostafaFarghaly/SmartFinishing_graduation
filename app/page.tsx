import MainPage from "./home/page";
import ServiceSection from "./home/ServiceSection/page";
import ServiceSteps from "./home/ServiceSteps/page";
import React  from 'react';
import Landing from "./home/landing/page";
import PopularServices from "./home/PopularServices/page";
import StatsSection from "./home/StatsSection/page";
import Aboutus from "./Aboutus/page";
import InstallApp from "./InstallApp/page";
import Navbar from "./components/Navbar/page";
import Footer from "./components/Footer/page";

export default function Home() {
  
  return (
    <>
      <Navbar/>
      <MainPage />
      <ServiceSection />
      <PopularServices />
      <StatsSection />
      <Landing/>
      <ServiceSteps />
      <Aboutus/>
      <InstallApp/>
      <Footer/>
    </>
  );
}