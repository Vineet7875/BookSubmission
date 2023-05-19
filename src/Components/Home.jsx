import React from "react";
import { useNavigate } from 'react-router-dom';
import "../Styles/Home.css";
function Home() {
  const navigate = useNavigate();
  const handleClick = (card) => {
   
    navigate('/SubForm', { state: { card } });
  };
  return (
    <div className="home-container">
      <div className="left-container">
        <h1>Book Submissions</h1>
        <p>Welcome to our Book submission platform. Submit your Book and get a chance to win exciting prizes!</p>
        <button className="submit-button" onClick={() => { handleClick() }}>Upload Book</button>
      </div>

      <div className="right-container">

        <img className="waves" src="waves.png" alt="waves" />
        <img id="bulb" src="Handholdingbulb3D.png" alt="Handholdingbulb" />
      </div>

    </div>
  );
}

export default Home;
