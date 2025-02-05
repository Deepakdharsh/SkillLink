import React, { useEffect, useState } from "react";
import routes from "@/routes";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer, Navbar } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import { Outlet } from "react-router-dom";
import { getuser, setLocation } from "@/api/apiService";

export function Home() {
  const [ip,setIp]=useState("")
  const [loc,setLoc]=useState("")
  const [clientOrFreelancer,setClientOrFreelancer]=useState("client")

  const fetchcords=async()=>{
    try {
        const res=await fetch("https://api.ipify.org")
        const iptext = await res.text()
        // console.log(iptext)
        setIp(iptext)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchlocation=async()=>{
    try {
        const res=await fetch(`http://ip-api.com/json/${ip}`)
        const location = await res.json()
        const converted=`${location.city} ${location.regionName}`
        setLoc(converted)
    } catch (error) {
      console.error(error)
    }
  }

    const data=localStorage.getItem("jwtToken")

   async function intialUser(){
    const data=await getuser()
    // console.log(data)
    setClientOrFreelancer(data.result?.user?.role)
    // console.log(data)
   }

    useEffect(()=>{
        if(data){
          fetchcords()
        }
        fetchlocation()
        if(loc){
          setLocation(loc)
        }
        intialUser()
      },[data,loc])
      // console.log(user)
      
      // console.log("//////////////////")
      // console.log(clientOrFreelancer)
      // console.log("//////////////////")

  return (
    <>
      <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
        <Navbar routes={routes} userType={clientOrFreelancer}/>
      </div>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32 bg-black">
       <Outlet/>
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
             { clientOrFreelancer=="client" ?
             (<Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                Your story starts with us.
              </Typography>)
              :
             (<Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                Your Freelancing jounery starts with us.
              </Typography>)
              }
              <Typography variant="lead" color="white" className="opacity-80">
              Whether you're a business looking for expert freelancers or a professional seeking rewarding work, we've got you covered. Post jobs, showcase skills, and build the future of work—all in one place.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                <FingerPrintIcon className="h-8 w-8 text-white " />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                Partnering with Us is Seamless
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
              Experience hassle-free collaboration with our user-friendly platform. Whether you're posting a project or bidding on one, every step is designed to be intuitive and efficient.
                <br />
                <br />
                Discover features like secure communication tools, milestone tracking, and instant notifications to keep your workflow smooth and productive.
              </Typography>
              <Button variant="filled">read more</Button>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                <CardHeader floated={false} className="relative h-56">
                  <img
                    alt="Card Image"
                    src="/img/teamwork.png"
                    className="h-full w-full"
                  />
                </CardHeader>
                {<CardBody>
                  <Typography variant="small" color="blue-gray" className="font-normal">Enterprise</Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 mt-2 font-bold"
                  >
                    Premium Services for You
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    Access top-tier freelancers and clients dedicated to delivering exceptional results. With personalized service options and a focus on quality, we ensure every project surpasses expectations.
                  </Typography>
                </CardBody>}
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <PageTitle section="Our Team" heading="Here are our heroes">
          Together, we build a vibrant community of skilled professionals and successful businesses.
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {teamData.map(({ img, name, position, socials }) => (
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                socials={
                  <div className="flex items-center gap-2">
                    {socials.map(({ color, name }) => (
                      <IconButton key={name} color={color} variant="text">
                        <i className={`fa-brands text-xl fa-${name}`} />
                      </IconButton>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
      <section className="relative bg-white pt-24 px-4">
        <div className="container mx-auto">
          <PageTitle section="Focus on Growth" heading="Build something amazing">
          Our platform fosters a community where freelancers can find focus, inspiration, and support. Connect with clients, collaborate with other freelancers, and build your freelance business.
          </PageTitle>
          <div className="mx-auto mt-20 mb-16 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 pt-11">
            {contactData.map(({ title, icon, description }) => (
              <Card
                key={title}
                color="transparent"
                shadow={false}
                className="text-center text-blue-gray-900"
              >
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                  {React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {title}
                </Typography>
                <Typography className="font-normal text-blue-gray-500">
                  {description}
                </Typography>
              </Card>
            ))}
          </div>
 {/*          <PageTitle section="Contact Us" heading="Want to work with us?">
            Complete this form and we will get back to you in 24 hours.
          </PageTitle>
          <form className="mx-auto w-full mt-12 lg:w-5/12">
            <div className="mb-8 flex gap-8">
              <Input variant="outlined" size="lg" label="Full Name" />
              <Input variant="outlined" size="lg" label="Email Address" />
            </div>
            <Textarea variant="outlined" size="lg" label="Message" rows={8} />
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button variant="gradient" size="lg" className="mt-8" fullWidth>
              Send Message
            </Button>
          </form> */}
        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
