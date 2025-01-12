import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard , Table, Receipt, Languages, Bell, User, LogIn, UserPlus } from 'lucide-react';

const SideBar = () => {
    const location = useLocation();
    
    const navItems = [
      { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin-dashboard' },
      { icon: <Table size={20} />, label: 'Tables', path: '/admin-table' },
      { icon: <Receipt size={20} />, label: 'Billing', path: '/billing' },
      { icon: <Languages size={20} />, label: 'RTL', path: '/rtl' },
      { icon: <Bell size={20} />, label: 'Notifications', path: '/notifications' },
      { icon: <User size={20} />, label: 'Profile', path: '/admin-profile' },
      { icon: <LogIn size={20} />, label: 'Sign In', path: '/signin' },
      { icon: <UserPlus size={20} />, label: 'Sign Up', path: '/signup' },
    ];
  
    return (
      <div className="w-64 bg-gray-800 text-white p-4 fixed h-full">
        <div className="flex items-center gap-2 mb-8">
          <div className="p-2 bg-white/10 rounded">
            <img src="/api/placeholder/24/24" alt="logo" className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-medium">Material Dashboard 2</h1>
        </div>
  
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${
                location.pathname === item.path
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
  
        <button className="w-full mt-8 bg-blue-500 text-white py-3 rounded-lg">
          UPGRADE TO PRO
        </button>
      </div>
    );
};

export default SideBar
  