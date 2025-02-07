import DressStyle from "@/components/dressStyle/DressStyle";
import Hero from "@/components/hero/Hero";
import NewArrivalProducts from "@/components/products/NewArrivalProducts";
import TopSellingProducts from "@/components/products/TopSellingProducts";

export default function Home() {
  return (
    <>
      <Hero />
      <main id="new-arrival">
        <NewArrivalProducts />
      </main>
      <main id="brand">
        
      <TopSellingProducts />
      </main>
      <DressStyle />
    </>
  );
}
