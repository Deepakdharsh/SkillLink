import SideBar from "@/pages/adminPages/SideBar";

const Layout = ({ children }) => {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <SideBar />
        <div className="ml-64 flex-1">
          <div className="p-8">{children}</div>
        </div>
      </div>
    );
};

export default Layout 