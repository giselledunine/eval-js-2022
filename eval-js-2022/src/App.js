import './App.css';
import {initializeApp} from 'firebase/app';
import { Routes, Route } from "react-router-dom";
import Home from './views/Home';

function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyA12uhX3f3Xilqxp2jwz7yMgZR4L4j8Zr0",
    authDomain: "random-90ee8.firebaseapp.com",
    databaseURL: "https://random-90ee8.firebaseio.com",
    projectId: "random-90ee8",
    storageBucket: "random-90ee8.appspot.com",
    messagingSenderId: "949868149413",
    appId: "1:949868149413:web:afbf1db30a27adb023ab4c"
  };
  const app = initializeApp(firebaseConfig);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
