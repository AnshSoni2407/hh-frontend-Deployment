import React from 'react'
import Header from '../Reusable.jsx/Header'
import Footer from '../Reusable.jsx/Footer'

const AdminDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className='flex-grow flex items-center justify-center min-h-[70vh]'>
      
        <h1 className="text-3xl font-bold text-center mt-10 flex-grow">
          Admin Dashboard
        </h1>
      </main>
      <Footer />
    </div>
  );
}

export default AdminDashboard