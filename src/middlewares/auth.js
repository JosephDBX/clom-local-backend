import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";

const getUserRoles = async (userId) => {
    return null
}

export const authentication = (authorizationHeader) => {
    let roles = null;
    if (!authorizationHeader || authorizationHeader.split(" ")[0] !== "Bearer") throw new AuthenticationError("Debes estar autenticado para acceder a este contenido");

    const token = authorizationHeader.split(" ")[1];
    if (!token || token === "") {
        throw new AuthenticationError("You must be signed up");
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        throw new AuthenticationError("You must be signed up");
    }

    roles = getUserRoles(decodedToken.userId);
    return roles
}