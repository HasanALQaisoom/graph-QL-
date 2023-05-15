const mongoose = require('mongoose');
const request = require('request');
const express = require('express')
const expressGraphQL = require('express-graphql')
const app = express()
const cors = require('cors');
const { GraphQLSchema } = require('graphql');
const { GraphQLDate } = require('graphql-iso-date');
const { graphqlHTTP } = require('express-graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql')

mongoose.connect('mongodb+srv://admin:admin@coe453project.voeyym8.mongodb.net')
mongoose.connect.once('open',() => {console.log('connected data base')})

       // const URI = "mongodb+srv://admin:admin@coe453project.voeyym8.mongodb.net";
        //const menuServiceUrl = 'http://localhost:3000';
       // const bookingServiceUrl = 'http://localhost:4545';

app.use(express.json());
app.use(cors({
    origin: "*",
}));

mongoose.connect(URI)
    .then(() => console.log("database is ON!"))
    .catch((error) => console.log(error))

// Define the menu schema
const menuSchema = new mongoose.Schema({
    __v:  Number,
    _id: mongoose.Schema.Types.ObjectId,
    description: String,
    id:  Number,
    image: String,
    name:  String,
    price: String,
    });

// Define the table schema
const tableSchema = new mongoose.Schema({
    __v:  Number,
    _id: mongoose.Schema.Types.ObjectId,
    tableNumber: Number,
    status: Boolean,
    createdAt: Date,
    updatedAt: Date
    });

// Define the reserved schema
const reservedSchema = new mongoose.Schema({
    __v:  Number,
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: Date,
    date:Date,
    phoneNumber: Number,
    tableNumber: Number,
    updatedAt: Date,
    });

const MenuType = new GraphQLObjectType({
    name: 'Menu',
    fields: () => ({
        description: { type: GraphQLString },
        id: { type: GraphQLInt },
        image: { type: GraphQLString },
        name: { type: GraphQLString },
        price: { type: GraphQLString }
    })
});

const tableType = new GraphQLObjectType({
    name: 'table',
    fields: () => ({
        tableNumber:{type :GraphQLInt},
        status:{type : GraphQLBoolean},
        createdAt:{type :GraphQLDate},
        updatedAt:{type :GraphQLDate}
    })
});

const reservedType = new GraphQLObjectType({
    name: 'Reserved',
    fields: () => ({
        createdAt: { type: GraphQLDate },
        date: { type: GraphQLDate },
        phoneNumber: { type: GraphQLInt },
        tableNumber:{type :GraphQLInt},
        updatedAt:{type :GraphQLDate}
    })
});

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        menu: {
            type: new GraphQLNonNull(MenuType),
            description: 'access menu',
            args: {
                createdAt: { type: new GraphQLNonNull(GraphQLDate) },
                date: { type: new GraphQLNonNull(GraphQLDate) },
                phoneNumber: { type: new GraphQLNonNull(GraphQLInt) },
                tableNumber: { type: new GraphQLNonNull(GraphQLInt) },
                updatedAt: { type: new GraphQLNonNull(GraphQLDate) }
            },
            resolve: () => {
                if (error) {
                    res.status(500).send('Error connecting to menu service');
                } else {
                    res.json(JSON.parse(body));
                }
            }
        },
        reserved: {
            type: new GraphQLNonNull(reservedType),
            args: {
                createdAt: { type: new GraphQLNonNull(GraphQLDate) },
                date: { type: new GraphQLNonNull(GraphQLDate) },
                phoneNumber: { type: new GraphQLNonNull(GraphQLInt) },
                tableNumber: { type: new GraphQLNonNull(GraphQLInt) },
                updatedAt: { type: new GraphQLNonNull(GraphQLDate) }
            },
            resolve: () => {
                if (error) {
                    res.status(500).send('Error connecting to reserved service');
                } else {
                    res.json(JSON.parse(body));
                }
            }
        },
        table: {
            type: new GraphQLNonNull(tableType),
            args: {
                tableNumber: { type: new GraphQLNonNull(GraphQLInt) },
                status: { type: new GraphQLNonNull(GraphQLBoolean) },
                createdAt: { type: new GraphQLNonNull(GraphQLDate) },
                updatedAt: { type: new GraphQLNonNull(GraphQLDate) }
            },
            resolve: () => {
                if (error) {
                    res.status(500).send('Error connecting to table service');
                } else {
                    res.json(JSON.parse(body));
                }
            }
        }
    })
}) 



const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addMenu: {
            type: MenuType,
            description: 'Add a menu item',
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                image: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
               let menu = new menu({
                id: args.id,
                image: args.image,
                name: args.name,
                price:args.price
               })
               menu.save()
            }
        },
        addreserved: {
            type: reservedType,
            description: 'Add a reserved',
            args: {
                createdAt: { type: new GraphQLNonNull(GraphQLDate) },
                date: { type: new GraphQLNonNull(GraphQLDate) },
                phoneNumber: { type: new GraphQLNonNull(GraphQLInt) },
                tableNumber: { type: new GraphQLNonNull(GraphQLInt) },
                updatedAt: { type: new GraphQLNonNull(GraphQLDate) }
            },
            resolve: (parent, args) => {
                let reserved = new reserved({
                    createdAt: args.createdAt,
                    date: args.date,
                    phoneNumber: args.phoneNumber,
                    tableNumber: args.tableNumber,
                    updatedAt: args.updatedAt
                })
                reserved.save()
            }
        },
        addtable: {
            type: tableType,
            description: 'Add a table',
            args: {
                tableNumber: { type: new GraphQLNonNull(GraphQLInt) },
                status: { type: new GraphQLNonNull(GraphQLBoolean) },
                createdAt: { type: new GraphQLNonNull(GraphQLDate) },
                updatedAt: { type: new GraphQLNonNull(GraphQLDate) }
            },
            resolve: (parent, args) => {
               let table = new table({
                tableNumber: args.tableNumber,
                status: args.status,
                createdAt: args.createdAt,
                updatedAt: args.updatedAt
               })
               table.save()
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))


app.listen(4000, () => console.log('Server Running'))