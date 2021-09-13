// /test/[uid]: about
// /test/[uid]: contact

import Prismic from '@prismicio/client'
import client from '../../client'

function MyPage(props) {
  return (
    <div style={{ padding: '4em' }}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  )
}

export default MyPage

export const getStaticProps = async (context) => {
  var myDocument = await client.getByUID('pages', context.params.uid)
  return {
    props: myDocument.data
  }
}

export const getStaticPaths = async () => {
  var response = await client.query(
    Prismic.Predicates.at('document.type', 'pages')
  )
  return {
    paths: response.results.map(page => {
      return {
        params: {
          uid: page.uid
        }
      }
    }),
    fallback: false,
  }
}
