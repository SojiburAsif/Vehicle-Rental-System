import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                return res.status(401).json({
                    success: false,
                    message: "No token provided!",
                });
            }

            // Split "Bearer <token>"
            const token = authHeader.split(" ")[1];

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid token format!",
                });
            }

            const decoded = jwt.verify(token, config.jwttoken as string) as JwtPayload & {
                id: number;
                role: string;
                name: string;
                email: string;
            };

            req.user = decoded;

            // Check role
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Unauthorized access!",
                });
            }

            next();

        } catch (err: any) {
            res.status(401).json({
                success: false,
                message: "Invalid or expired token!",
            });
        }
    };
};

export default auth;
