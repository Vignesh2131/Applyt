import { type Response, type Request, NextFunction} from 'express'
import jwt from 'jsonwebtoken';

interface jwtPayload {
  id: string;
  name: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";


const verifyMiddleware = async (req: Request, res: Response, next:NextFunction) => { 
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ message: "Access denied, Token not found" });
    try {
        const verify = jwt.verify(token, JWT_SECRET) as jwtPayload
        if (!verify) return res.status(401).json({ message: "User doesn't have authorization" })
        req.userId = verify.id
        req.name = verify.name
        next()
    
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}

export { verifyMiddleware}