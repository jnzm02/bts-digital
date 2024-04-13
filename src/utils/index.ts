import { diskStorage } from 'multer';
import { extname, basename } from 'path';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';

const jwtService = new JwtService();

export const fileIntercepting = (destination: string) => {
  return FilesInterceptor('file', 10, {
    storage: diskStorage({
      destination,
      filename: (req: any, file: any, cb: any) => {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        cb(
          null,
          `${
            basename(file.originalname, extname(file.originalname)) +
            '-' +
            randomName
          }${extname(file.originalname)}`,
        );
      },
    }),
  });
};

export const getUserIdByToken = (authorization: string) => {
  const token = authorization.replace('Bearer ', '') || null;
  let userId: number | null = null;
  if (token && token.length > 0) {
    try {
      const userData = jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      if (userData && userData.id) {
        userId = userData.id;
      }
    } catch (error) {}
  }
  return userId;
};
