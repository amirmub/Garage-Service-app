import React from 'react';
import Sidebar from "../.../../../../components/Sidebar/Sidebar"

function AddOrder() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2 sidebar d-flex flex-column p-2">
            <Sidebar />
          </div>
          <div className="col-md-9 col-lg-10 p-5">
            <div className="d-flex align-items-center mb-2">
              <h3 className="text-primary fw-bold me-1">Create a new order</h3>
              <div className="border-bottom border-danger" style={{ width: '40px' }}></div>
            </div>

            {/* CUSTOMER INFO CARD */}
            <div className="card mb-3">
              <div className="card-body d-flex justify-content-between">
                <div>
                  <h5 className="fw-bold">Amir Mubarek</h5>
                  <p className="mb-1"><strong>Email:</strong> Amir@gmail.com</p>
                  <p className="mb-1"><strong>Phone Number:</strong> 240835487</p>
                  {/* <p className="mb-1"><strong>Active Customer:</strong> Yes</p>
                  <a href="#" className="text-danger text-decoration-none">
                    Edit customer info <i className="bi bi-pencil-square"></i>
                  </a> */}
                </div>
                <button className="btn btn-link text-danger fs-4 p-0">✖</button>
              </div>
            </div>

            {/* VEHICLE INFO CARD */}
            <div className="card mb-4">
              <div className="card-body d-flex justify-content-between">
                <div>
                  <h5 className="fw-bold">BMW X7</h5>
                  <p className="mb-1"><strong>Vehicle color:</strong> Gold</p>
                  <p className="mb-1"><strong>Vehicle tag:</strong> 0101AD</p>
                  <p className="mb-1"><strong>Vehicle year:</strong> 2020</p>
                  <p className="mb-1"><strong>Vehicle mileage:</strong> 12000</p>
                  <p className="mb-1"><strong>Vehicle serial:</strong> 44844d4844ffg</p>
                  {/* <a href="#" className="text-danger text-decoration-none">
                    Edit vehicle info <i className="bi bi-pencil-square"></i>
                  </a> */}
                </div>
                <button className="btn btn-link text-danger fs-4 p-0">✖</button>
              </div>
            </div>

            {/* SERVICES CHECKLIST */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="fw-bold text-primary mb-3">Choose service</h5>

                {[
                  {
                    id: "service1",
                    title: "Oil change",
                    desc: "Every 5,000 kilometers or so, you need to change the oil in your car to keep your engine in the best possible shape."
                  },
                  {
                    id: "service2",
                    title: "Spark Plug replacement",
                    desc: "Spark plugs are a small part that can cause huge problems. Their job is to ignite the fuel in your engine, helping it start."
                  },
                  {
                    id: "service3",
                    title: "Fuel Cap tightening",
                    desc: "Loose fuel caps are actually a main reason why the 'check engine' light in a car comes on."
                  },
                  {
                    id: "service4",
                    title: "Oxygen Sensor replacement",
                    desc: "Oxygen sensors measure the concentration of oxygen in the exhaust gases in order to optimize engine performance and emissions."
                  },
                  {
                    id: "service5",
                    title: "Brake work",
                    desc: "Brake work is important, especially because one quarter of all car accidents are caused by a failure to stop."
                  },
                  {
                    id: "service6",
                    title: "Tire repairs and changes",
                    desc: "Without good, inflated tires, you lose speed, control, and fuel efficiency, hence the need to get them patched if there’s a leak."
                  },
                  {
                    id: "service7",
                    title: "The Ignition System",
                    desc: "A car’s ignition system includes its battery, starter, and the ignition itself."
                  },
                  {
                    id: "service8",
                    title: "Programming the camera software",
                    desc: "Ensures cameras operate correctly to provide driver assistance and safety features."
                  }
                ].map(service => (
                  <div className="form-check mb-3 border-bottom pb-2" key={service.id}>
                    <input className="form-check-input" type="checkbox" id={service.id} />
                    <label className="form-check-label mx-3" htmlFor={service.id}>
                      <strong>{service.title}</strong><br />
                      {service.desc}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* ADDITIONAL REQUESTS */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="fw-bold text-primary mb-3 d-flex align-items-center">
                  Additional requests
                  <div className="border-bottom border-danger ms-2 flex-grow-1" style={{ maxWidth: '40px' }}></div>
                </h5>
                <div className="mb-3">
                  <textarea className="form-control" rows="4" placeholder="Service description"></textarea>
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Price" />
                </div>
                <button className="btn btn-danger">SUBMIT ORDER</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default AddOrder;
