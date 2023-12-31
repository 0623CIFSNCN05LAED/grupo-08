import "./Home.css";
import NewProducts from "./Content/NewProducts";
import ProductsButton from "./Content/ProductsButton";
import CategoriesButton from "./Content/CategoriesButton";
import UsersButton from "./Content/UsersButton";
import bannerHome from "../assets/images/banner-home.png";

export default function Home() {
  return (
    <div>
      <img src={bannerHome} alt='bannerHome' className='banner-home' />
      <div className='home'>
        <ProductsButton />
        <CategoriesButton />
        <UsersButton />
      </div>
      <div>
        <NewProducts />
      </div>
    </div>
  );
}
