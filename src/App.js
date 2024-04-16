import "./App.css";
import Home from "./Screen/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Screen/Login";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from "./Screen/SignUp";
import { Cartprovider } from "./Components/ContextReduce";
import MyOrder from "./Screen/MyOrder";
function App() {
  return (
    <Cartprovider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home></Home>} />
            <Route exact path="/Login" element={<Login></Login>}></Route>
            <Route exact path="/createuser" element={<SignUp></SignUp>} />
            <Route exact path="/myOrder" element={<MyOrder/>} />
          </Routes>
        </div>
      </Router>
    </Cartprovider>
  );
}
export default App;
