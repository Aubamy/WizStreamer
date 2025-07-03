import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';

import Home from './page/Home.jsx';
import Audioroom from './page/Audioroom.jsx';
import CallPage from './page/CallPage.jsx';
import Livestream from './page/Livestream.jsx';
import Dashboard from './page/Dashboard.jsx';
import MessagePage from './page/MessagePage.jsx';
import Overview from './page/Overview.jsx';
import Chart from './page/Chart.jsx';
import Login from './page/Login.jsx';
import EntryPage from './page/EntryPage.jsx';
import SignForm from './page/SignForm.jsx';
import StreamerPage from './page/StreamerPage.jsx';
import Viewer from './page/Viewer.jsx';

import './css/home.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<EntryPage />} />
      <Route path="/streamerpage" element={<StreamerPage />} />
      <Route path="/viewer" element={<Viewer />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<Home />} />
      <Route path="/callpage" element={<CallPage />} />
      <Route path="/audioroom" element={<Audioroom />} />
      <Route path="/livestream" element={<Livestream />} />
      <Route path="/chart" element={<Chart />} />
      <Route path="/messagePage" element={<MessagePage />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signform" element={<SignForm />} />
    </Routes>
  </BrowserRouter>
);
