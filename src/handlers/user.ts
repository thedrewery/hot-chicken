import prisma from '../db'
import { comparePasswords, createJWT, hashPassword } from '../modules/auth'

export const createNewUser = async (req, res, next) => {
    try {

        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password),
                email: req.body.email
            }
        })
        const response = createJWT(user)
        const token = response[0]
        const userId = response[1]
        res.json({ token, userId });
    } catch (e) {
        e.type = 'input'
        next(e)
    }
}

// class CustomError extends Error {

// }

export const signIn = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })

    const isValid = await comparePasswords(req.body.password, user.password)
    
    if (!isValid) {
        res.status(401)
        res.json({ message: 'invalid password' })
        return
    }

    const response = createJWT(user)
    const token = response[0]
    const userId = response[1]
    res.json({ token, userId });
}