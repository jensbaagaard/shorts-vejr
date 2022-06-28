import type {NextPage} from 'next'
import LandingPage from "../features/LandingPage";
import {ThemeProvider} from "styled-components";
import {dark} from "../styles/themes";
import Head from "next/head";

export type Status = "OK" | "NO_IP" | "NO_IP_API"

const Home: NextPage = ({ip, loc, status}: any) => {

    return (
        <>
            <Head>
                <title>er det shorts vejr?</title>
                <meta name={"description"} content={"Find ud af om det er varmt nok til shorts idag"}/>
            </Head>
            <LandingPage ip={ip} loc={loc} status={status}/>
        </>
    )
}

export default Home

Home.getInitialProps = async ({req}) => {
    let status: Status = "OK"
    const devIp = process.env.DEV_IP;
    const ip = !!devIp ? devIp : (req!.headers["x-real-ip"] || req!.connection.remoteAddress);
    if (!ip) status = "NO_IP"
    const loc = await fetch(" http://ip-api.com/json/" + ip, {
        method: "GET",
        credentials: 'same-origin',
    }).then(res => res.json())
    if (loc.status !== "success") status = "NO_IP_API"
    return {ip, loc, status};
};