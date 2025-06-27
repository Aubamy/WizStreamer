import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import Home from './page/Home.jsx';
import Audioroom from './page/Audioroom.jsx';
import CallPage from './page/CallPage.jsx';
import Livestream from './page/Livestream.jsx';
import Dashboard from './page/Dashboard.jsx';
import MessagePage from './page/Messagepage.jsx';
import Overview from './page/Overview.jsx';
import Chart from './page/Chart.jsx';
// import Try from './page/Try.jsx';
import './css/home.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path="/callpage" element={<CallPage />} />
      {/* <Route path="*" element={<p>Invalid link</p>} /> */}
      <Route path='/audioroom' element={<Audioroom/>}/>
      <Route path='/livestream' element={<Livestream/>}/>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/chart' element={<Chart/>}/>
      <Route path='/messagePage' element={<MessagePage/>}/>
      <Route path='/overview' element={<Overview/>}/>
      {/* <Route path='/try' element={<Try/>}/> */}
    </Routes>
  </BrowserRouter>
);