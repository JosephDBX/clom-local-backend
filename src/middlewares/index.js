import { authentication } from './auth';

export const context = ({ req }) => {
    const roles = authentication(req.headers.authorization);

    return { roles }
}