import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { 
  LayoutDashboard, 
  Table, 
  Receipt, 
  Languages, 
  Bell, 
  User, 
  LogIn, 
  UserPlus,
  Printer,
  BarChart3,
  Store,
  UserPlus2,
  Settings,
  MoreVertical
} from 'lucide-react';
import { Outlet } from 'react-router-dom';

const dailySalesData = [
  { name: 'Apr', value: 0 },
  { name: 'May', value: 100 },
  { name: 'Jun', value: 200 },
  { name: 'Jul', value: 300 },
  { name: 'Aug', value: 500 },
  { name: 'Sep', value: 400 },
  { name: 'Oct', value: 200 },
  { name: 'Nov', value: 400 },
  { name: 'Dec', value: 500 },
];

const weeklyData = [
  { name: 'M', value: 45 },
  { name: 'T', value: 20 },
  { name: 'W', value: 10 },
  { name: 'T', value: 20 },
  { name: 'F', value: 45 },
  { name: 'S', value: 10 },
  { name: 'S', value: 35 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded-lg shadow-lg">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-blue-500">{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
     {/*  <div className="w-64 bg-gray-800 text-white p-4 fixed h-full">
        <div className="flex items-center gap-2 mb-8">
          <div className="p-2 bg-white/10 rounded">
            <img src="/api/placeholder/24/24" alt="logo" className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-medium">Material Dashboard 2</h1>
        </div>

        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 bg-blue-500 rounded-lg text-white">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>
          {[
            { icon: <Table size={20} />, label: 'Tables' },
            { icon: <Receipt size={20} />, label: 'Billing' },
            { icon: <Languages size={20} />, label: 'RTL' },
            { icon: <Bell size={20} />, label: 'Notifications' },
            { icon: <User size={20} />, label: 'Profile' },
            { icon: <LogIn size={20} />, label: 'Sign In' },
            { icon: <UserPlus size={20} />, label: 'Sign Up' },
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-gray-700 rounded-lg">
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="w-full mt-8 bg-blue-500 text-white py-3 rounded-lg">
          UPGRADE TO PRO
        </button>
      </div>
 */}
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-2 text-gray-500">
              <LayoutDashboard size={16} />
              <span>/</span>
              <span>Dashboard</span>
            </div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="search"
              placeholder="Search here"
              className="px-4 py-2 border rounded-lg"
            />
            <User size={20} className="text-gray-500" />
            <Settings size={20} className="text-gray-500" />
            <Bell size={20} className="text-gray-500" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { icon: <Printer />, title: 'Bookings', value: '281', change: '+55%', period: 'than last week', color: 'bg-gray-800' },
            { icon: <BarChart3 />, title: "Today's Users", value: '2,300', change: '+3%', period: 'than last month', color: 'bg-blue-500' },
            { icon: <Store />, title: 'Revenue', value: '34k', change: '+1%', period: 'than yesterday', color: 'bg-green-500' },
            { icon: <UserPlus2 />, title: 'Followers', value: '+91', period: 'Just updated', color: 'bg-pink-500' },
          ].map((stat) => (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="text-sm text-gray-500">{stat.title}</h3>
                  <p className="text-xl font-semibold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  {stat.icon}
                </div>
              </div>
              {stat.change && (
                <p className="text-sm">
                  <span className="text-green-500">{stat.change}</span>
                  <span className="text-gray-500"> {stat.period}</span>
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2196F3" 
                    strokeWidth={2}
                    dot={{ strokeWidth: 2, r: 4, fill: "white" }}
                    activeDot={{ r: 6, fill: "#2196F3" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <h3 className="mt-4 font-semibold">Website Views</h3>
            <p className="text-gray-500">Last Campaign Performance</p>
            <p className="text-gray-400 text-sm mt-4">campaign sent 2 days ago</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4CAF50" 
                    strokeWidth={2}
                    dot={{ strokeWidth: 2, r: 4, fill: "white" }}
                    activeDot={{ r: 6, fill: "#4CAF50" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <h3 className="mt-4 font-semibold">Daily Sales</h3>
            <p className="text-gray-500">(+15%) increase in today sales.</p>
            <p className="text-gray-400 text-sm mt-4">updated 4 min ago</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#9E9E9E" 
                    strokeWidth={2}
                    dot={{ strokeWidth: 2, r: 4, fill: "white" }}
                    activeDot={{ r: 6, fill: "#9E9E9E" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <h3 className="mt-4 font-semibold">Completed Tasks</h3>
            <p className="text-gray-500">Last Campaign Performance</p>
            <p className="text-gray-400 text-sm mt-4">just updated</p>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Projects</h3>
              <MoreVertical size={20} className="text-gray-500" />
            </div>
            <p className="text-gray-500">
              <span className="text-blue-500">30 done</span> this month
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Orders overview</h3>
              <Settings size={20} className="text-gray-500" />
            </div>
            <p className="text-gray-500">
              <span className="text-green-500">+24%</span> this month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
