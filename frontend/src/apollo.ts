import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import config from "./config";

const httpLink = new HttpLink({
  uri: config.apiUrl,
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
