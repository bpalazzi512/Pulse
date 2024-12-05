import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class FrontendAccessMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const allowedOrigins = [process.env.FRONTEND_URL];
        const origin = req.headers.origin || req.headers.referer;

        if (!origin || !allowedOrigins.some((o) => origin.startsWith(o))) {
            throw new ForbiddenException('Access denied.');
        }

        next();
    }
}