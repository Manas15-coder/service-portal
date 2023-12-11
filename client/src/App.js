import React from 'react'
import './App.css';
import ViewAppliedJobs from './components/ViewAppliedJobs';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import AllJobs from './components/AllJobs';
import CreateJob from './components/CreateJob';
import Footer from './components/Footer';
import SingleJob from './components/SingleJob';
import BottomNavbar from './components/BottomNavbar';
import Alljob from './components/Alljob';
import Home from './components/Home/Home';
import ViewApplicants from './components/ViewApplicants';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/' element={<Home/>} />
        <Route path='/all-jobs' element={<Alljob />} />
        <Route path='/create-jobs' element={<CreateJob />} />
        <Route path='/job/get-job/:jobId' element={<SingleJob />} />
        <Route path='/job/applied-jobs/:userId' element={<ViewAppliedJobs />} />
        <Route path="/view-applicants/:id" element={ViewApplicants} />
      </Routes>
      <BottomNavbar />
    </>
  );
}

export default App;
