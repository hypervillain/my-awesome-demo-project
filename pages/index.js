import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Prismic from '@prismicio/client'
import client from '../client'

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Latest pages
        </h1>
        <ul>
        {
          props.pages.map(page => {
            return (
              <li key={page.uid}>
                <a href={`/test/${page.uid}`}>{page.data.title}</a>
              </li>
            )
          })
        }
        </ul>
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  var response = await client.query(
    Prismic.Predicates.at('document.type', 'pages')
  )
  return {
    props: {
      pages: response.results
    }
  }
}
