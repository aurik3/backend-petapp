import type { Response,Request } from 'express'
import User from '../models/User'
import { decrypt } from '../middlewares/hash'
import { singUser, authToken } from '../middlewares/jwt'


export class AuthController {


    static getUser = async (req: Request, res: Response) => {
        await User.sync();
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
             res.status(401).json({ message: 'Invalid username or password' });
        }
        const isPasswordValid = await decrypt(password, user.password);
        if (!isPasswordValid) {
             res.status(401).json({ message: 'Invalid username or password' });
        }
        
        const payload = {
            name: user.name,
            username: user.username,
            email: user.email

        }

        try {
            const token = await singUser(payload);
            res.json({ token });
        } catch (error) {
            throw new Error(`Error al iniciar sesion, error: ${error}`)
        }

}

    static infoUser = async (req: Request, res: Response) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        try {
            const validate = await authToken(token);
            res.json(validate)
    
        } catch (error) {
            res.status(401).send('Token invalid or has expired')
        } 
    }

}