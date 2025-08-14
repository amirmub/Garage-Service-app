import About from "../../components/About/About";
import Carousal from "../../components/Carousal/Carousal";
import Facts from "../../components/Facts/Facts";
import MainServices from "../../components/MainServices/MainServices";
import OurServices from "../../components/OurServices/OurServices";
import Services from "../../components/Services/Services";

function Home() {
  return (
    <div>
      <Carousal />
      <About />
      <Facts />
      <Services />
      <MainServices />
      <OurServices />
    </div>
  );
}

export default Home;
