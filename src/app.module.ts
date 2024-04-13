import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Database, Resource } from '@adminjs/prisma';
import AdminJS from 'adminjs';
import { PrismaService } from './prisma/prisma.service'; // PrismaService from Nest.js documentation
import { PrismaModule } from './prisma/prisma.module';
import { DMMFClass } from '@prisma/client/runtime';
import { componentLoader, Components } from './adminjs/components';
import { ScheduleModule } from '@nestjs/schedule';
import { CardModule } from './card/card.module';
import { OfferModule } from './offer/offer.module';

AdminJS.registerAdapter({
  Resource,
  Database,
});

const prisma = new PrismaService();

const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

@Module({
  controllers: [],
  providers: [],
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    AdminModule.createAdminAsync({
      imports: [PrismaModule],
      useFactory: async () => {
        const dmmf = (prisma as any)._baseDmmf as DMMFClass;
        return {
          adminJsOptions: {
            assets: {
              styles: ['/sidebar.css'],
            },

            dashboard: {
              component: Components.Dashboard,
            },
            branding: {
              companyName: 'BTS Digital',
              softwareBrothers: false,
              logo: '/logo.png',
            },
            rootPath: '/admin',
            resources: [
              // User
              {
                resource: { model: dmmf.modelMap.User, client: prisma },
                options: {
                  // prevent from changing data in the database
                  properties: {
                    email: { isTitle: true },
                    encryptedPassword: { isVisible: false },
                    password: { isVisible: false },
                    passwordConfirmation: { isVisible: false },
                    createdAt: { isVisible: false },
                    updatedAt: { isVisible: false },
                  },
                  actions: {
                    new: { isAccessible: true },
                    edit: { isAccessible: true },
                    delete: { isAccessible: true },
                  },
                },
              },
              // Card
              {
                resource: { model: dmmf.modelMap.Card, client: prisma },
                options: {
                  actions: {
                    new: { isAccessible: true },
                    edit: { isAccessible: true },
                    delete: { isAccessible: true },
                  },
                },
              },
              // Offer
              {
                resource: { model: dmmf.modelMap.Offer, client: prisma },
                options: {
                  actions: {
                    new: { isAccessible: true },
                    edit: { isAccessible: true },
                    delete: { isAccessible: true },
                  },
                },
              },
            ],
            componentLoader,
          },
          auth: {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: process.env.COOKIE_PASSWORD,
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: process.env.ADMIN_SECRET,
          },
        };
      },
    }),
    UserModule,
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    CardModule,
    OfferModule,
  ],
})
export class AppModule {}
