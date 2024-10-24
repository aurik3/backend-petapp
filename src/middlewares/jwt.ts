import type { Response,Request, NextFunction } from 'express'

import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || 'savitar0909';

export const authToken = async (data:string)=>{   

    if (!data) {
      return  false
    }
    const verifyToken = await jwt.verify(data, secretKey)
    return verifyToken

}


export const singUser = async (data:any)=>{
  const token = await jwt.sign(data, secretKey ,{expiresIn: '40m'});
  return token
}

export const validateToken = async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
  
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
   res.status(401).json({ message: 'No token provided' });
  }

  try {
    const validate = await authToken(token);
    next();

} catch (error) {
    res.status(401).send('Token invalid or has expired')
}



}
