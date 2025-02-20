import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import pic from "../../../public/img/profilePlaceholderImg.png"
import { Footer } from "@/widgets/layout";
import { useEffect, useState } from "react";
import { getuser } from "@/api/apiService";
import { Link, useNavigate } from "react-router-dom";

export function Profile() {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [position,setPosition]=useState("")
  const [degrees,setDegrees]=useState([])
  const [bio,setBio]=useState("")
  const [photo,setPhoto]=useState("")
  const [location,setLocation]=useState("")
  const [googleId,setGoogleId]=useState(false)
  const navigate=useNavigate()
  // const [photo, setProfile] = useState({
  //     name: '',
  //     email: '',
  //     // password: '',
  //     position: '',
  //     degrees: [],
  //     bio:"",
  //     photo:""
  //   });
  useEffect(()=>{
   async function getCurrentUser(){
     const res=await getuser()
     console.log(res)
     setName(res.result.user.name)
     setEmail(res.result.user.email)
     setPosition(res.result.user.position)
     setDegrees(res.result.user.degrees)
     setBio(res.result.user.bio)
     setPhoto(res.result.user.photo)
     setLocation(res.result.user.location)
     if(res.result.user.googleID){
      setGoogleId(true)
     }
    }

    getCurrentUser()
    // console.log("hello from the useEffect")
  },[])
  return (
    <>
      <section className="relative block h-[50vh] overflow-hidden">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>
      <section className="relative bg-white py-16">
        <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="relative flex gap-6 items-start">
                <div className="mt-[-50px] w-40">
                  <Avatar
                    src={photo?`http://localhost:8000/images/${photo}`:pic}
                    alt="Profile picture"
                    variant="circular"
                    className=" h-36 w-37 rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <Typography variant="h4" color="blue-gray">
                    {/* {profile.name} */}
                    {name}
                  </Typography>
                  <Typography variant="paragraph" color="gray" className="!mt-0 font-normal">{email}</Typography>
                </div>
              </div>

              {/* <div className="mt-10 mb-10 flex lg:flex-col justify-between items-center lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5"> */}
              <div className="mt-10 mb-10 flex">
                <Link to="/profile/edit">
                <Button className="bg-gray-900 w-fit lg:ml-auto mr-3">Edit Profile</Button>
                </Link>

                { !googleId &&
                    (<Link to="/change-password">
                    <Button className="bg-gray-900 w-fit lg:ml-auto">change password</Button>
                    </Link>)
                }
               {/*  <div className="flex justify-start py-4 pt-8 lg:pt-4">
                  <div className="mr-4 p-3 text-center">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      22
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Friends
                    </Typography>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      10
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Photos
                    </Typography>
                  </div>
                  <div className="p-3 text-center lg:mr-4">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      89
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Comments
                    </Typography>
                  </div>
                </div> */}

              </div>
            </div>
            <div className="-mt-4 container space-y-2">
              <div className="flex items-center gap-2 mt-10">
                <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                  {location?location:"location:"}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                  {position?position:"position:"}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                  { degrees?degrees:"bio:"}
                </Typography>
              </div>
            </div>
            <div className="mb-10 py-6 flex justify-between">
              <div className="flex w-full flex-col items-start lg:w-1/2">
                <Typography className="mb-6 font-normal text-blue-gray-500">
                  {bio?bio:""}
                </Typography>
                <Button variant="text">Show more</Button>
              </div>
              <div className="flex w-full justify-end items-end">
                <Button onClick={()=>navigate("/home")}  className="text-7xl bg-black opacity-55 rounded-full flex justify-center items-center h-16 pb-6">&larr;</Button>
              </div>
            </div>
          </div>


        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>

    </>
  );
}

export default Profile;
