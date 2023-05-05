import './App.css';
import Admin from './components/adminuser/admin';
import User from './components/adminuser/user';
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import Login from './components/signupLogin/login';
import Addbike from './components/userpage/addbike';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Signup from './components/signupLogin/signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/user' element={<User/>}/>
          <Route exact path='/admin' element={<Admin/>}/>
          <Route exact path='/addbike' element={<Addbike/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
        </Routes>
      </Router>
      <NotificationContainer/>
    </div>
  );
}

export default App;
