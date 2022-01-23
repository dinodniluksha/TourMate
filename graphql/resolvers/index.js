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
                console.log(documents);
                return documents.map(({ id, type, description }) => ({
                    id,
                    type,
                    description
                }));

            } catch (error) {
                throw error;
            }
        }
    }
};