import {ApolloProvider} from 'react-apollo'
import App from 'next/app'
import ApolloClient from 'apollo-boost';
import fetch from 'node-fetch';
import {InMemoryCache} from 'apollo-cache-inmemory'
import Layout from '../components/Layout'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({showSpinner: false, speed: 300, easing: 'ease'})
Router.events.on('routeChangeStart', () => {
    NProgress.start()
})
Router.events.on('routeChangeComplete', () => {
    NProgress.done()
})
Router.events.on('routeChangeError', () => {
    NProgress.done()
})

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx);
        }
        // this exposes the query to the user
        pageProps.query = ctx.query;
        return { pageProps };
      }
       client  = new ApolloClient({
        //  link: createHttpLink({
        //   uri: 'http://localhost:5700/graphql',
        //   fetch: fetch
        //  }),
        uri: process.env.API_URL,
        fetch: fetch,
         cache: new InMemoryCache()
      })
    render() {
        const { Component, apollo, pageProps } = this.props;
        console.log(this.props)
        return(
            <ApolloProvider client={this.client}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ApolloProvider>
            
        )
    }
}

export default MyApp;
