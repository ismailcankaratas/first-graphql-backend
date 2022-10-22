const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require('@apollo/server/standalone');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const { books, authors } = require("./data.js");

const typeDefs = `#graphql
    type Author {
        id:ID!,
        name:String!,
        surname:String,
        aga: Int,
        books: [Book!]
    }
    type Book {
        id:ID!
        title: String!,
        author: Author!,
        author_id: String!,
        scrore: Int,
        isPublished: Boolean
    }
    type Query {
        books: [Book!],
        book(id: ID!): Book!

        authors: [Author!]
        author(id: ID!): Author!
    }
`
const resolvers = {
    Query: {
        books: () => books,
        book: (parent, args) => books.find((book) => book.id === args.id),

        authors: () => authors,
        author: (parent, args) => authors.find((author) => author.id === args.id),
    },
    Book: {
        author: (parent, args) => authors.find(author => author.id === parent.author_id),
    },
    Author: {
        books: (parent) => books.filter(book => book.author_id === parent.id)
    }
};

async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground({
                // options
            })
        ]
    });
    const { url } = await startStandaloneServer(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at ${url}`);
}
startApolloServer() 
