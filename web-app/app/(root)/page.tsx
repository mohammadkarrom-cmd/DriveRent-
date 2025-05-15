import HomeTestimonial from './components/home/HomeTestimonial'
import HowWeWorks from './components/home/HowWeWorks'
import dynamic from 'next/dynamic'

const HomeCars  = dynamic(() => import("./components/home/HomeCars"));

const Home = () => {

  return (
    <>
      <HomeTestimonial />
      <HomeCars />
      <HowWeWorks />
    </>
  )
}

export default Home