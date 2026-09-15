import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from 'src/packages';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST || '127.0.0.1',
          port: Number(process.env.REDIS_PORT) || 6379,
          password: process.env.REDIS_PASSWORD || undefined,
          tls: process.env.REDIS_TLS === 'true' ? {} : undefined, // optional SSL
        });
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
