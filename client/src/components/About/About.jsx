import { Link } from 'react-router-dom'
import about_img from "../../../assets/img/about.jpg"

function About() {
  return (
    <>
        <div class="container-xxl py-5">
        <div class="container">
            <div class="row g-5">
                <div class="col-lg-6 pt-4" style={{minHeight: "400px"}}>
                    <div class="position-relative h-100 wow fadeIn" data-wow-delay="0.1s">
                        <img class="position-absolute img-fluid w-100 h-100" src={about_img} style={{objectFit: "cover"}} alt="" />
                        <div class="position-absolute top-0 end-0 mt-n4 me-n4 py-4 px-5" style={{background: "rgba(0, 0, 0, .08)"}}>
                            <h1 class="display-4 text-white mb-0">12<sup>+</sup> <span class="fs-4">Years</span></h1>
                            <h4 class="text-white">Experience</h4>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <h6 class="text-primary text-uppercase">// About Us //</h6>
                    <h1 class="mb-2"><span class="text-primary">AutoPro</span> Is The Best Place For Your Auto Care</h1>
                    <p class="mb-4">From routine maintenance to complex repairs, our expert team is dedicated to keeping your vehicle in top condition. We combine quality workmanship, modern diagnostics, and exceptional customer service to ensure your car gets the care it deserves.</p>
                    <div class="row g-4 mb-3 pb-3">
                        <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                            <div class="d-flex">
                                <div class="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1" style={{width: "45px", height: "45px"}}>
                                    <span class="fw-bold text-secondary">01</span>
                                </div>
                                <div class="ps-3">
                                    <h6>Professional & Expert</h6>
                                    <span>Skilled technicians you can trust.</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 wow fadeIn" data-wow-delay="0.3s">
                            <div class="d-flex">
                                <div class="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1" style={{width: "45px", height: "45px"}}>
                                    <span class="fw-bold text-secondary">02</span>
                                </div>
                                <div class="ps-3">
                                    <h6>Quality Servicing Center</h6>
                                    <span>State-of-the-art care for your car.</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 wow fadeIn" data-wow-delay="0.5s">
                            <div class="d-flex">
                                <div class="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1" style={{width: "45px", height: "45px"}}>
                                    <span class="fw-bold text-secondary">03</span>
                                </div>
                                <div class="ps-3">
                                    <h6>Awards Winning Workers</h6>
                                    <span>Recognized for excellence and reliability.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to="/about" class="btn btn-primary py-3 px-5">Read More<i class="fa fa-arrow-right ms-2"></i></Link>
                </div>
            </div>
        </div>
    </div>
      
    </>
  )
}

export default About
