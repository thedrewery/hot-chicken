import jwt from 'jsonwebtoken';

export const createJWT = (user) => {
    const token = jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email
    },
        process.env.JWT_SECRET
    )
    return token;
}