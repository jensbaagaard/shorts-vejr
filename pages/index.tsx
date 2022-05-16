import type { NextPage } from 'next'
import {useEffect} from "react";
import LandingPage from "../features/LandingPage";



const Home: NextPage = ({ip,loc}:any) => {

  return (
      <LandingPage ip={ip} loc={loc}/>
  )
}

export default Home

Home.getInitialProps = async ({ req }) => {
    const ip = req!.headers["x-real-ip"] || req!.connection.remoteAddress;
    const loc = await fetch(" http://ip-api.com/json/77.243.62.123",{method:"GET",
        credentials: 'same-origin',
    }).then(res=>res.json())
    
    console.log(loc)
    return { ip,loc};
};