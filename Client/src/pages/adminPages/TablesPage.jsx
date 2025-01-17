import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard as DashboardIcon, Table, Receipt, Languages, Bell, User, LogIn, UserPlus, Users } from 'lucide-react';
import axiosInstance from '@/api/axiosInstance';
import { getuser, listUsers } from '@/api/apiService';

const TablesPage = () => {
    const authorsData = [
      { 
        name: 'John Michael',
        email: 'john@creative-tim.com',
        function: { role: 'Manager', dept: 'Organization' },
        status: 'ONLINE',
        employed: '23/04/18'
      },
      { 
        name: 'Alexa Liras',
        email: 'alexa@creative-tim.com',
        function: { role: 'Programator', dept: 'Developer' },
        status: 'OFFLINE',
        employed: '11/01/19'
      },
      { 
        name: 'Laurent Perrier',
        email: 'laurent@creative-tim.com',
        function: { role: 'Executive', dept: 'Projects' },
        status: 'ONLINE',
        employed: '19/09/17'
      },
      { 
        name: 'Michael Levi',
        email: 'michael@creative-tim.com',
        function: { role: 'Programator', dept: 'Developer' },
        status: 'ONLINE',
        employed: '24/12/08'
      },
      { 
        name: 'Richard Gran',
        email: 'richard@creative-tim.com',
        function: { role: 'Manager', dept: 'Executive' },
        status: 'OFFLINE',
        employed: '04/10/21'
      },
      { 
        name: 'Miriam Eric',
        email: 'miriam@creative-tim.com',
        function: { role: 'Programator', dept: 'Developer' },
        status: 'OFFLINE',
        employed: '14/09/20'
      },
    ];
    const [users,setUsers]=useState([])

    useEffect(()=>{
      async function getData(){
        const data=await listUsers()
        setUsers(data?.result?.users)
        console.log(data.result.users)
      };
      getData()
    },[])

    // console.log(users[0]?.name)

    users.map((val,i)=>console.log(val.name))
  
    return (
      <div className="p-8">
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <Link to="/" className="hover:text-gray-700">
            <DashboardIcon size={16} />
          </Link>
          <span>/</span>
          <span>Tables</span>
        </div>
        <h1 className="text-2xl font-semibold mb-8">Tables</h1>
  
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Authors Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-4">AUTHOR</th>
                  <th className="pb-4">FUNCTION</th>
                  <th className="pb-4">STATUS</th>
                  <th className="pb-4">EMPLOYED</th>
                  <th className="pb-4">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src="/api/placeholder/40/40" 
                          alt={user.name} 
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="font-semibold">{user.role}</p>
                      {/* <p className="text-sm text-gray-500">{user.function.dept}</p> */}
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'ONLINE' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-500">{user.employed}</td>
                    <td className="py-4">
                      <button className="text-blue-500 hover:text-blue-700">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default  TablesPage