import { Carousel, Container, Row, Col } from "react-bootstrap";
import carousel_bg_1 from "../../../assets/img/carousel-bg-1.jpg";
import carousel_bg_2 from "../../../assets/img/carousel-bg-2.jpg";
import carousel_1 from "../../../assets/img/carousel-1.png";
import carousel_2 from "../../../assets/img/carousel-2.png";

function MyCarousel() {
  return (
    <Container fluid className="p-0 mb-5">
      <Carousel>
        {/* Slide 1 */}
        <Carousel.Item>
          <img className="d-block w-100" src={carousel_bg_1} alt="Slide 1" />
          <Carousel.Caption className="d-flex align-items-center">
            <Container>
              <Row className="align-items-center justify-content-center justify-content-lg-start">
                <Col xs={10} lg={7} className="text-center text-lg-start">
                  <h1 className="display-3 text-white mb-4 pb-3 animated slideInDown">
                    Qualified Car Repair Service Center
                  </h1>
                </Col>
                <Col lg={5} className="d-none d-lg-flex animated zoomIn">
                  <img className="img-fluid" src={carousel_1} alt="" />
                </Col>
              </Row>
            </Container>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <img className="d-block w-100" src={carousel_bg_2} alt="Slide 2" />
          <Carousel.Caption className="d-flex align-items-center">
            <Container>
              <Row className="align-items-center justify-content-center justify-content-lg-start">
                <Col xs={10} lg={7} className="text-center text-lg-start">
                  <h1 className="display-3 text-white mb-4 pb-3 animated slideInDown">
                    Qualified Car Wash Service Center
                  </h1>
                </Col>
                <Col lg={5} className="d-none d-lg-flex animated zoomIn">
                  <img className="img-fluid" src={carousel_2} alt="" />
                </Col>
              </Row>
            </Container>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default MyCarousel;
