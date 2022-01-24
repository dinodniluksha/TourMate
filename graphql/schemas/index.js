import { gql } from "apollo-server-micro";

export const typeDefs = gql`
    type  User {
        id: ID
        login: String
        avatar_url: String
    }

    type Vehicle {
        id: ID
        type: String
        imageUrl: String
        isAvailable: Boolean
        description: String
    }

    input VehicleInput {
        id: ID
        type: String
        imageUrl: String
        isAvailable: Boolean
        description: String
    }

    type CreatePayload {
        msg: String
        createdRecord: Vehicle
    }

    type UpdatePayload {
        msg: String
        updatedFields: Vehicle
    }

    type DeletePayload {
        msg: String
    }

    type  Query {
        getUsers: [User]
        getUser(name: String!): User!
        vehicles: [Vehicle]
    }

    type Mutation {
        createVehicle(input: VehicleInput): CreatePayload
        updateVehicle(input: VehicleInput): UpdatePayload
        deleteVehicle(id: ID): DeletePayload
    }
    `