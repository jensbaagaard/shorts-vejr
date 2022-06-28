import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Head from "next/head";
import {dark} from "../styles/themes";
import {ThemeProvider} from "styled-components";
import Script from 'next/script'


const App = ({Component, pageProps}: AppProps) => {
/*
    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            window.gtag('config', "G-V7WWJBZ7VQ", {
                page_path: url,
            })
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        router.events.on('hashChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
            router.events.off('hashChangeComplete', handleRouteChange)
        }
    }, [router.events])
*/

    return (
        <>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
                <meta name="msapplication-TileColor" content="#da532c"/>
                <meta name="theme-color" content="#ffffff"/>
                <title>er det shorts vejr?</title>
            </Head>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=G-V7WWJBZ7VQ`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V7WWJBZ7VQ', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
            <ThemeProvider theme={dark}>
                <Component {...pageProps} />

            </ThemeProvider>
        </>
    )
}

export default App