import Card from "../components/Card";
import Slider from "../components/Slider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const SlideShowList = [
    <img src="/assets/slider-img 1.jpg" alt="" />,
    <img src="/assets/slider-img 2.jpg" alt="" />,
    <img src="/assets/slider-img 3.jpg" alt="" />,
    <img src="/assets/slider-img 4.jpg" alt="" />,
  ];

  const navigate = useNavigate();

  const catergory = <p onClick={() => navigate("/shop/?search=")}>Shop</p>;

  const catergoryCardProps = {
    classname: "catergory",
    data: { title: catergory },
    gradient: true,
    noButtons: true,
    type: "text-over",
  };

  const collectionCardProps = {
    data: { title: "Product Collection", para: "View More ->" },
    type: "",
    classname: "collection_card",
    noButtons: true,
  };

  return (
    <>
      <div className="section hero">
        <Slider type={"both"} list={SlideShowList} slideShow={2000} />
      </div>
      <div className="section catergories flex-col">
        <div className="container flex-wrap gap">
          <Card {...collectionCardProps} />
          <Card {...collectionCardProps} />
        </div>
        <div className="container flex-wrap gap mt3">
          <Card {...catergoryCardProps} />
          <Card {...catergoryCardProps} />
          <Card {...catergoryCardProps} />
          <Card {...catergoryCardProps} />
        </div>
      </div>
    </>
  );
};

export default Home;
