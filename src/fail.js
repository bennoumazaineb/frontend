import React, { useEffect, useState } from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
function Fail(){
    return(
        <DashboardLayout>
        <DashboardNavbar />
         <div className='p-4'>
         <div className='alert alert-danger'>Fail payement</div>
        Fail
    </div>
    <Footer />
    </DashboardLayout>)
       
    }

export default Fail;