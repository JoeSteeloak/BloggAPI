import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from '../blog/blog.entity';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(BlogPost)
        private blogRepository: Repository<BlogPost>, // Anslut till blog repository
    ) { }

    // Skapa ett nytt blogginlägg
    async create(blogPost: BlogPost): Promise<BlogPost> {
        return this.blogRepository.save(blogPost);
    }

    // Hämta alla blogginlägg
    async findAll(): Promise<BlogPost[]> {
        return this.blogRepository.find();
    }

    // Hämta ett specifikt blogginlägg med id
    async findOne(id: number): Promise<BlogPost> {
        return this.blogRepository.findOne({ where: { id } });
    }

    // Uppdatera ett blogginlägg
    async update(id: number, blogPost: BlogPost): Promise<BlogPost> {
        await this.blogRepository.update(id, blogPost);
        return this.findOne(id);
    }

    // Ta bort ett blogginlägg
    async remove(id: number): Promise<void> {
        await this.blogRepository.delete(id);
    }
}
