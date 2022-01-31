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
        charge: String
        description: String
        isVisible: Boolean
    }

    input VehicleInput {
        id: ID
        type: String
        imageUrl: String
        isAvailable: Boolean
        charge: String
        description: String
        isVisible: Boolean
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
        vehicle(id: ID): Vehicle
    }

    type Mutation {
        createVehicle(input: VehicleInput): CreatePayload
        updateVehicle(input: VehicleInput): UpdatePayload
        deleteVehicle(id: ID): DeletePayload
    }
    `