import Head from 'next/head'
import axios from 'axios'
import ItemLink from '../components/link'

export async function getServerSideProps() {
    const shortio = await axios.get(
        `https://api.short.io/api/links?domain_id=${process.env.SHORTIODOMAINID}&limit=150&offset=0&tag=${process.env.SHORTIOTAG}`,
        {
            headers: {
                'Accept': 'application/json',
                'Authorization': process.env.SHORTIOTOKEN
            }
        })

    let links = shortio.data.links ?? null
    if (links) links = links.filter(link => link.tags?.includes(process.env.SHORTIOTAG))

    links.sort((a, b) => {
        if (a.title === b.title) return 0
        return (a.title < b.title ? -1 : 1)
    })

    return {
        props: {
            title: process.env.TITLE,
            description: process.env.DESCRIPTION,
            profile: process.env.PROFILE,
            links: links
        }
    }
}

export default function Home(props) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content={props.description} />
                <meta content="ie=edge" httpEquiv="x-ua-compatible" />
                <meta property="og:title" content={props.title} />
                <meta property="og:description" content={props.description} />
                <meta property="og:url" content="https://xg1.nl/" />
                <meta property="og:image" content={props.profile} />
                <meta property="og:image:secure_url" content={props.profile} />
                <meta property="og:image:height" content="90" />
                <meta property="og:image:type" content="images/jpg" />
                <meta property="og:image:width" content="90" />
                <meta property="og:locale" content="pt_BR" />
                <meta property="og:site_name" content="Ronis Xogum" />
                <meta property="og:type" content="profile" />
                <meta name="twitter:title" content={props.title} />
                <meta name="twitter:description" content={props.description} />
                <meta name="twitter:image" content={props.profile} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:domain" content="rxogum" />
                <title>{props.title}</title>
                <link rel="canonical" href="https://xg1.nl/" />
                <link rel="preconnect" href="https://cdn.statically.io" />
                <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bangers&family=Bungee+Hairline&family=Titillium+Web:ital,wght@1,700&display=swap" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.1/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
                <link rel="stylesheet" href="/css/style.css" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="container text-light py-5" id="app">
                <div className="perfil d-flex flex-column justify-content-center align-items-center">
                    <img src={props.profile} alt="Profile Image" className="img-thumbnail rounded-circle mb-3" />
                    <h1 className="text-center profile-name">{props.title}</h1>
                    <p className="text-center profile-description">{props.description}</p>
                </div>
                <div className="links mt-3">
                    {props.links.map((link) => (
                        <ItemLink key={link.id} link={link} />
                    ))}
                </div>
            </main>
        </>
    )
}
