import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from './blog/blog.entity';
import { BlogController } from './blogposts/blog.controller';
import { BlogService } from './blogposts/blog.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT, // Konvertera till number
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [BlogPost],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false }, // SSL
      }),
    TypeOrmModule.forFeature([BlogPost]),
    AuthModule,
  ],
  controllers: [BlogController],
  providers: [BlogController],
})
export class AppModule { }
