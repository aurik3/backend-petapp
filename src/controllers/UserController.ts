import type { Response, Request } from 'express'
import User from '../models/User'
import { encrypt } from '../middlewares/hash';

export class UserController {

    static getUsers = async (req: Request, res: Response) => {
        await User.sync();
        try {
            const users = await User.findAll()
            const result =users.map(user=>({
                nombre:user.name,
                usuario:user.username,
                correo:user.email           
            }))
            res.json(result)
        } catch (error) {
            throw new Error(`Error al listar los usuarios, error: ${error}`)
        }

    }

    static getUserById = async (req: Request, res: Response) => {
        await User.sync();
        const id = req.params.id

        try {
            const user = await User.findOne({
                where: {
                    id
                }
            })
            const result ={
                nombre:user.name,
                usuario:user.username,
                correo:user.email           
            }
            res.json(result)
        } catch (error) {
            throw new Error(`Error al listar los usuarios, error: ${error}`)
        }

    }

    static createUser = async (req: Request, res: Response) => {
        await User.sync();
        const { name, username, email, password } = req.body

        const userExists = await User.findOne({
            where: {
                username
            }
        })

        if (userExists) {
            res.status(403).json({ ok: false, msg: 'El usuario ya existe' })
        } else {
            const encryptedPassword = await encrypt(password)

            try {
                const user = await User.create({
                    name,
                    username,
                    email,
                    password: encryptedPassword
                })
                res.status(201).json({ ok: true, msg: 'Usuario creado correctamente' })
            } catch (error) {
                throw new Error(`Error al crear el usuario, error: ${error}`)
            }

        }


    }

    static updateUser = async (req: Request, res: Response) => {
        await User.sync();
        const id = req.params.id
        const { name, username, email, password } = req.body

        const userExists = await User.findOne({
            where: {
                id
            }
        })

        if (!userExists) {
            res.json({ ok: false, msg: 'El usuario no existe' })
        } else {

            const encryptedPassword = encrypt(password)

            try {
                const user = await User.update({
                    name,
                    username,
                    email,
                    password: encryptedPassword
                }, {
                    where: {
                        id
                    }
                })
                res.status(201).json({ ok: true, msg: 'Usuario actualizado correctamente' })
            } catch (error) {
                throw new Error(`Error al actualizar el usuario, error: ${error}`)
            }
        }
    }

    static deleteUser = async (req: Request, res: Response) => {
        await User.sync();
        const id = req.params.id

        const userExists = await User.findOne({
            where: {
                id
            }
        })

        if (!userExists) {
            res.status(404).json({ ok: false, msg: 'El usuario no existe' })
        } else {

            try {
                const user = await User.destroy({
                    where: {
                        id
                    }
                })
                res.status(201).json({ ok: true, msg: 'Usuario eliminado correctamente' })
            } catch (error) {
                throw new Error(`Error al eliminar el usuario, error: ${error}`)
            }
        }
    }

}

