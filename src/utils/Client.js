import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
    uri : 'https://ozono.herokuapp.com/'
})

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('token')
    return{
        headers: {
            ...headers,
            autorization: token ? `Bearer ${token}`: ''
        }
    }
})

const client = new ApolloClient({
    link:authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default client