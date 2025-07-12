import Header from "@/layout/Header";
import Home from "@/layout/Home";
import About from "@/layout/About";
import HowItWorks from "@/layout/How-it-works";
import Scholarships from "@/layout/Scholarships";
import Footer from "@/layout/Footer";

const Page = () => {
  return (
    <main>
      <Header />
      <div className="mx-4 flex flex-col gap-y-6 md:mx-10 md:space-y-14">
        <Home />
        <About />
        <HowItWorks />
        <Scholarships />
      </div>
      <Footer />
    </main>
  );
};

export default Page;
