import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { configRouter } from "./router/configRouter";
import NavbarComponent from "./components/NavbarComponent";
import ProtectedRouter from "./router/protectedRouter";
import TestForm from "./pages/TestForm";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./redux/accountSlices";

function App() {
  // const dispatch=useDispatch()
  // useEffect(()=>{
  //   setTimeout(()=>{
  //     dispatch(logout())
  //   },[5000])
  // },[])
  return (
    <div className="">
      <BrowserRouter>
        <div className="fixed top-0 left-0 right-0 z-10">
          <NavbarComponent />
        </div>
        <div className="mt-[50px] "></div>
        <Routes>
          {configRouter.map((r, index) => {
            return (
              <Route
                key={index}
                path={r.path}
                element={
                  <ProtectedRouter protect={r.privated}>
                    {r.pages}
                  </ProtectedRouter>
                }
              />
            );
          })}
          {/* <Route path="/test" element={<TestForm/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
