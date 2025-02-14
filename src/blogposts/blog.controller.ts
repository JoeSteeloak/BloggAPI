import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogPost } from '../blog/blog.entity';
import { validate } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    // Hämta alla blogginlägg
    @Get()
    findAll(): Promise<BlogPost[]> {
        return this.blogService.findAll();
    }

    // Hämta ett specifikt blogginlägg via ID
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<BlogPost> {
        const post = await this.blogService.findOne(id);
        if (!post) {
            throw new HttpException('Blog post not found', HttpStatus.NOT_FOUND);
        }
        return post;
    }

    // Skapa ett nytt blogginlägg
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() blogPost: BlogPost): Promise<BlogPost> {
        const newPost = Object.assign(new BlogPost(), blogPost);

        // Validera objektet
        const errors = await validate(newPost);
        if (errors.length > 0) {
            const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
            throw new HttpException(
                { message: 'Validation failed', errors: errorMessages },
                HttpStatus.BAD_REQUEST,
            );
        }
        return this.blogService.create(newPost);
    }

    // Uppdatera ett befintligt blogginlägg
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: number, @Body() partialPost: Partial<BlogPost>): Promise<BlogPost> {
        const existingPost = await this.blogService.findOne(id);
        if (!existingPost) {
            throw new HttpException('Blog post not found', HttpStatus.NOT_FOUND);
        }

        // Uppdatera endast fält som skickas i body
        Object.assign(existingPost, partialPost);

        // Validera uppdaterad post
        const errors = await validate(existingPost);
        if (errors.length > 0) {
            const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
            throw new HttpException(
                { message: 'Validation failed', errors: errorMessages },
                HttpStatus.BAD_REQUEST,
            );
        }

        return this.blogService.update(id, existingPost);
    }

    // Ta bort ett blogginlägg
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        const post = await this.blogService.findOne(id);
        if (!post) {
            throw new HttpException('Blog post not found', HttpStatus.NOT_FOUND);
        }
        return this.blogService.remove(id);
    }
}
