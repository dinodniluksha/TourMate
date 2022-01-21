import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../graphql/schemas";
import { resolvers } from "../../graphql/resolvers";
import Cors from "micro-cors";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const cors = Cors();
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.end();
        return false;
    }

    await startServer;
    await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});

export const config = {
    api: {
        bodyParser: false
    }
};
