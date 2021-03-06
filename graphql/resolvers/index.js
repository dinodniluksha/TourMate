import axios from "axios";
import { UniqueArgumentDefinitionNamesRule } from "graphql";
import { firebaseConfig } from '../../config/firebase.config.js'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = app.firestore();

export const resolvers = {
    Query: {
        getUsers: async () => {
            try {
                const users = await axios.get("https://api.github.com/users");
                console.log(users.data);
                return users.data.map(({ id, login, avatar_url }) => ({
                    id,
                    login,
                    avatar_url
                }));
            } catch (error) {
                throw error;
            }
        },
        getUser: async (_, args) => {
            try {
                const user = await axios.get(
                    `https://api.github.com/users/${args.name}`
                );
                return {
                    id: user.data.id,
                    login: user.data.login,
                    avatar_url: user.data.avatar_url
                };
            } catch (error) {
                throw error;
            }
        },
        vehicles: async () => {
            try {
                const vehicles = await db.collection('vehicles').get();
                const documents = [];

                vehicles.forEach((doc) => {
                    console.log(doc.data());
                    documents.push(doc.data())
                });
                //console.log(documents);
                return documents.map(({ id, type, imageUrl, isAvailable, charge, description, isVisible }) => ({
                    id,
                    type,
                    imageUrl,
                    isAvailable,
                    charge,
                    description,
                    isVisible
                }));

            } catch (error) {
                throw error;
            }
        },
        vehicle: async (parent, args) => {
            try {
                const vehicle = await db.collection('vehicles').doc(args.id).get();
                //console.log(vehicle.data());
                return {
                    id: vehicle.data().id,
                    type: vehicle.data().type,
                    imageUrl: vehicle.data().imageUrl,
                    isAvailable: vehicle.data().isAvailable,
                    charge: vehicle.data().charge,
                    description: vehicle.data().description,
                    isVisible: vehicle.data().isVisible,
                };
            } catch (error) {
                throw error;
            }
        }
    },
    Mutation: {
        createVehicle: async (parent, args) => {
            try {
                db.collection("vehicles").doc(args.input.id).set(args.input);
                return { msg: "Record created successfully", createdRecord: args.input };
            } catch (error) {
                throw error;
            }
        },
        updateVehicle: async (parent, args) => {
            try {
                db.collection("vehicles").doc(args.input.id).update(args.input);

                return { msg: "Record updated successfully", updatedFields: args.input };
            } catch (error) {
                throw error;
            }
        },
        deleteVehicle: async (parent, args) => {
            try {
                db.collection("vehicles").doc(args.id).delete();
                return { msg: "Record deleted successfully" };
            } catch (error) {
                throw error;
            }
        }
    }
};