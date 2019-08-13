const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        hello: String
        rollDice(numDice: Int!, numSides: Int): [Int]
    }
`);

const root = {
    rollDice: ({ numDice, numSides }) => {
        let output = [];
        for(let i = 0; i < numDice; i++){
            output.push(1 + Math.floor(Math.random() * (numSides || 6)));
        }

        return output;
    }
}

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}));

const port = 3000;
app.listen(port);
console.log(`Running at localhost:${port}/graphql`)