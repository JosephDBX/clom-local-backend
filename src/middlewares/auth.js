import jwt from 'jsonwebtoken';
import User from '../models/user';
import bcrypt from 'bcryptjs';

const getUser = async (username) => {
    return await User.findOne({ username }).populate('roles');
}

export const authentication = (authorizationHeader) => {
    let roles = [];

    if (authorizationHeader && authorizationHeader.split(' ')[0] === 'Bearer') {
        const token = authorizationHeader.split(' ')[1];

        if (token && token !== '') {
            let decodedToken;

            try {
                decodedToken = jwt.verify(token, process.env.SECRET_KEY);
                const user = getUser(decodedToken.username);
                roles = [...user.roles.map((role) => { role.name })];
            } catch (error) { }
        }
    }
    return roles;
}

export const authorization = async ({ username, password }, res) => {
    const user = getUser(username);

    if (!user) return res.status(404).send(JSON.stringify({ message: '¡El usuario no existe!' }));

    let isPassword = false;
    try {
        isPassword = bcrypt.compare(password, user.password);
    } catch (error) {
        return res.status(404).send(JSON.stringify({ message: '¡La contraseña es incorrecta!' }));
    }

    return res.status(200).send(JSON.stringify({
        user: { ...user, password: null },
        token: jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '12h' }),
        tokenExpiration: 12,
        roles: user.roles.map(role => role.name)
    }))
}