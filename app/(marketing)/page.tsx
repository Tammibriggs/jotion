import Footer from "@/components/app/footer";
import Heading from "@/components/app/heading";
import Heros from "@/components/app/heros";

function MarketingPage() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center px-6 pb-10 justify-center md:justify-start text-center gap-8 flex-1">
        <Heading />
        <Heros />
      </div>
      <Footer />
    </div>
  );
}

export default MarketingPage;
