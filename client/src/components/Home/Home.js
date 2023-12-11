import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
  return (
   <>
   <>
  <section id="banner">
    <div className="container">
      <div className="row">
        <div className="col-md-7">
          <div className="banner-content">
            <h2 className="display-2">Welcome To Portal</h2>
            <p>
              This portal is used to file online questions against any govt or
              private organization and get answer within few days...
            </p>
            <button className="learn-btn">Learn More</button>
          </div>
        </div>
        <div className="col-md-5">
          <img
            src="https://solarrooftop.gov.in/img/common/home_page/loginHere.svg"
            className="img-fluid banner-img"
            alt=""
          />
        </div>
      </div>
    </div>
  </section>
  <section id="services">
    <div className="service">
      <ul>
        <li>
          <i className="fa-solid fa-book" /> Education &amp; Learning
        </li>
        <li>
          <i className="fa-solid fa-user-nurse" /> Health and Wellness
        </li>
        <li>
          <i className="fa-regular fa-lightbulb" /> Electricity
        </li>
        <li>
          <i className="fa-solid fa-money-bill" /> Money &amp; Taxes
        </li>
        <li>
          <i className="fa-solid fa-briefcase" /> Jobs
        </li>
      </ul>
    </div>
  </section>
  <Link to='/all-jobs'> <button className="view-btn">View All</button></Link>
  <section id="organization">
    <div className="container">
      <div className="row"></div>
    </div>
  </section>
</>

   </>
  )
}

export default Home