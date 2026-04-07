import HeroSection from "./HeroSection";
import MainSection from "./MainSection";

type Props = {
  productId?: string;
};

const ProdukView = ({ productId }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <HeroSection />
      <MainSection productId={productId} />
    </div>
  );
};

export default ProdukView;