import { useState, useEffect, useRef } from 'react';
import './Home.css'

const Home = ({ slideImages }) => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const imagesTotal = slideImages.length;

  useEffect(() => {
    const handleNext = () => {
      setCurrent(current => (current + 1) % imagesTotal);
    }

    intervalRef.current = setInterval(() => {
      handleNext();
    }, 3000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);




  return (
    <div className='Home'>
      <div className='wrapHomeTitle'>
        <h1 className='homeTitle'>Mikan's Album</h1>
      </div>
      <div className="wrapHomeSlides">
        <div className="homeSlides">
          {
            slideImages.map((image, index) => {
              return (
                <div className="slideItem" key={index}>
                  <img className={"slideImage" + " slide" + index} style={{ opacity: current === index ? 1 : 0 }} src={image}></img>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>

  );
};

export default Home;