import dynamic from 'next/dynamic';
import HomeTestimonial from './components/home/HomeTestimonial';

const HomeCars  = dynamic(() => import("./components/home/HomeCars"));

const Home = () => {

  return (
    <>
      <HomeTestimonial />
      <HomeCars />
    </>
  )
}

export default Home