import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar as MTNavbar,
  /* MobileNav, */
  Typography,
  Button,
  IconButton,
  Collapse
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { googleLogout } from '@react-oauth/google';
import {  toast } from 'react-toastify';
import UserType from "@/pages/auth/UserType";

export function Navbar({ brandName, action,userType }) {
  const [openNav, setOpenNav] = React.useState(false);
  const [loggedIn,setLoggedIn]=useState(false)
  const navigate=useNavigate()
  const data=localStorage.getItem("jwtToken")

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );

    if(data) setLoggedIn(true)

  }, [data,navigate]);
  
  function handleLogout(){
    console.log("hello from logout")
    googleLogout()
    localStorage.removeItem('jwtToken')
    setLoggedIn(false)
    toast("successfully logout",{
      position: "top-center",
      autoClose: 3000,
    })
  }

const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
            <Link
              to="/home"
              className="flex items-center gap-1 p-1 font-bold"
            >
              home
            </Link>
        </Typography>
      <Typography
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
            <Link
              to="/profile"
              className="flex items-center gap-1 p-1 font-bold"
            >
              profile
            </Link>
        </Typography>
      <Typography
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
            <Link
              to="/doc"
              className="flex items-center gap-1 p-1 font-bold"
            >
              Find talent
            </Link>
        </Typography>
      <Typography
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
            <Link
              to="/doc"
              className="flex items-center gap-1 p-1 font-bold"
            >
             contracts
            </Link>
        </Typography>
    </ul>
  );

  const freelancerNavList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
            <Link
              to="/home"
              className="flex items-center gap-1 p-1 font-bold"
            >
              home
            </Link>
        </Typography>
      <Typography
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
            <Link
              to="/profile"
              className="flex items-center gap-1 p-1 font-bold"
            >
              profile
            </Link>
        </Typography>
      <Typography
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
            <Link
              to="/doc"
              className="flex items-center gap-1 p-1 font-bold"
            >
              Find job
            </Link>
        </Typography>
      <Typography
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
            <Link
              to="/doc"
              className="flex items-center gap-1 p-1 font-bold"
            >
              contracts
            </Link>
        </Typography>
    </ul>
  );

  return (
    <MTNavbar color="transparent" className="p-3">
      <div className="container mx-auto flex items-center justify-between text-white">
        <Link to="/">
          <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
            {brandName}
          </Typography>
        </Link>
        <div className="hidden lg:block ml-[91px] ">
        {
          userType=="client" ? navList : freelancerNavList
        }
        </div>
        <div className="hidden gap-2 lg:flex">
          {
            loggedIn ? (
              <Button onClick={()=>handleLogout()} variant="text" size="sm" color="white" fullWidth>
              logout
            </Button>
            ) :
            (
              <Button onClick={()=>navigate("/home/sign-in")} variant="text" size="sm" color="white" fullWidth>
              login
              </Button>
            )
          }
            
            {
          userType=="client" ? (
            <Button variant="gradient" size="lg" fullWidth className="whitespace-nowrap p-0 w-full  hidden lg:inline-block ">
            Post Job
            </Button>
            )
            :(
              <Button variant="gradient" size="lg" fullWidth className="whitespace-nowrap p-0 w-full  hidden lg:inline-block">
              Post gig
              </Button>
            )

          }
          
          {/* {React.cloneElement(action, {
            className: "hidden lg:inline-block",
          })} */}
        </div>
        <IconButton
          variant="text"
          size="sm"
          color="white"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
     { <Collapse
        className={`${openNav?`rounded-xl bg-white px-4 pt-2 pb-4  text-blue-gray-900 flex justify-center`:"hidden"}`}
        open={openNav}
      >
        <div className="container mx-auto flex flex-col items-center">
          <a
            href="https://www.material-tailwind.com/blocks/react?ref=mtkr"
            target="_blank"
            className="mb-2 block"
          >
            <Button variant="text" size="sm" fullWidth>
              pro version
            </Button>
          </a>
          {
          userType=="client" ? (
            <Button variant="gradient" size="sm" fullWidth className="whitespace-nowrap p-0 w-full block ">
            Post Job
            </Button>
            )
            :(
              <Button variant="gradient" size="sm" fullWidth className="whitespace-nowrap p-0 w-full block ">
              Post gig
              </Button>
            )

          }
          
          {/* {React.cloneElement(action, {
            className: "w-full block ",
          })} */}
        </div>
      </Collapse>}
    </MTNavbar>
  );
}

Navbar.defaultProps = {
  brandName: "SkillLink.",
  action: (
      <Button variant="gradient" size="sm" fullWidth className="whitespace-nowrap p-0">
        Post Job
      </Button>
  ),
};

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
