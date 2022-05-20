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
                <title>Er det shortsvejr i dag?</title>
                <meta name={"description"} content={"Find ud af om det er varmt nok til shorts idag"}/>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-V7WWJBZ7VQ"/>
                <script dangerouslySetInnerHTML={{__html:`        window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-V7WWJBZ7VQ');
                `}}/>
            </Head>
            <ThemeProvider theme={dark}> <LandingPage ip={ip} loc={loc} status={status}/>
            </ThemeProvider>
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