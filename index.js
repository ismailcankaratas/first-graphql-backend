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
        book: (parent, args) => {
            const data = books.find((book) => book.id === args.id);
            return data;
        },

        authors: () => authors,
        author: (parent, args) => {
            const data = authors.find((author) => author.id === args.id);
            return data;
        },
    },
    Book: {
        author: (parent, args) => {
            return authors.find(author => author.id === parent.author_id);
        },
    },
    Author: {
        books: (parent) => {
            return books.filter(book => book.author_id === parent.id)
        }
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
