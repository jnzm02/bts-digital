import { Global, Module } from '@nestjs/common';
import { PrismaMixin } from './prisma.mixin';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: PrismaMixin,
      useFactory: (prismaService: PrismaService) =>
        new PrismaMixin(prismaService),
      inject: [PrismaService],
    },
  ],
  exports: [PrismaService, PrismaMixin],
})
export class PrismaModule {}
