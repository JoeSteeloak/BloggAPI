import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { IsString, IsOptional, Length } from 'class-validator';

@Entity()
export class BlogPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @Length(3, 200, { message: 'Title must be between 3 and 200 characters long.' })
    title: string;

    @Column({ type: 'text' }) // "text" används för längre innehåll
    @IsString()
    @Length(10, 5000, { message: 'Content must be between 10 and 5000 characters long.' })
    content: string;

    @Column()
    @IsString()
    @Length(2, 100, { message: 'Author name must be between 2 and 100 characters long.' })
    author: string;

    @CreateDateColumn() // Sparar automatiskt tidsstämpeln när inlägget skapas
    publishedAt: Date;

    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    category?: string;
}
