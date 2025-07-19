import Sidebar from "../../../components/Sidebar/Sidebar"

function addEmployee() {
  return (
   <div class="container-fluid">
    <div class="row">
     <div class="col-md-3 col-lg-2 sidebar d-flex flex-column p-2">
        <Sidebar />
      </div>

    <div className="col-md-9 col-lg-10 p-5">
      <div className="section-title">Add a New Employee</div>
        <form className="w-75">
            <div className="mb-3">
            <input type="email" className="form-control" placeholder="Employee email" />
            </div>
            <div className="mb-3">
            <input type="text" className="form-control" placeholder="Employee first name" />
            </div>
            <div className="mb-3">
            <input type="text" className="form-control" placeholder="Employee last name" />
            </div>
            <div className="mb-3">
            <input type="tel" className="form-control" placeholder="Employee phone" />
            </div>
             <div className="mb-4">
            <input type="tel" className="form-control" placeholder="Employee email" />
            </div>
            <button type="submit" className="btn btn-danger px-4 py-2">ADD Employee</button>
        </form>
       </div>

      </div>
      </div>
  )
}

export default addEmployee
