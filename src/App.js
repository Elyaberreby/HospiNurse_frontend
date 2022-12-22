import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,

} from "react-router-dom";
import './App.css';
import Admin from "./comps/Admin";
import Callspatient from "./comps/Callspatient";
import GeneralHelp from "./comps/GeneralHelp";
import Home from "./comps/home";
import Info from "./comps/Info";
import Login from "./comps/Login/Login";
import SignUp from "./comps/Login/SignUp"
import Medical from "./comps/Medical";
import Medicines from "./comps/Medicines";
import NurseCalls from "./comps/NurseCalls";
import Pain from "./comps/Pain";
import Rooms from "./comps/Rooms";
import Setting from "./comps/Setting";
import Supplies from "./comps/Supplies";
import Userlist from "./comps/Userlist";

import { method_user_api } from "./services/api";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const login = await method_user_api("/users/verify", "POST", {});
      setLoggedIn(login?.data ? true : false);
      return login?.data;
    }
    catch (err) {
      setLoggedIn(false);
      return err;
    }
  }

  return (
    <Router>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/settings" element={<Setting/>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/userlist" element={<Userlist />} />
        <Route path="/Callspatient" element={<Callspatient />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/GeneralHelp" element={<GeneralHelp />} />
        <Route path="/NurseCalls" element={<NurseCalls />} />
        <Route path="/Rooms" element={<Rooms />} />
        <Route path="/Supplies" element={<Supplies />} />
        <Route path="/Medical" element={<Medical />} />
        <Route path="/Medicines" element={<Medicines />} />
        <Route path="/Pain" element={<Pain />} />
      </Switch>
    </Router>
  );
}

export default App;
