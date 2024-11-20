
import Image from "next/image";
import Crousal from "@/components/Crousal";
import CategoryCards from "@/components/CategoryCards";
import ProductGrid from "@/components/Productcards"; // Corrected file import
// import Mobile from "@/components/MobileCards";



export default function Home() {
  return (
    <div>
      <Crousal />
      {/* Categories and Product Grid */}
      <div className="p-6">
        <CategoryCards />
        <h2 className="text-2xl font-semibold my-6">Featured Products</h2>
        <ProductGrid /> {/* This displays the product cards grid */}
        {/* <Mobile /> Additional component for mobile-specific items */}
      </div>
    </div>
  );
}
