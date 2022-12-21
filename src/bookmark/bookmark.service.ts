import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createBookmarkDto, editBookmarkDto } from './dto'

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService){}
    
    getBookmarks(userId: number){
        return this.prisma.bookmark.findMany({
            where: {
                userId: userId
            }
        })
    }

    async createBookmark(userId: number, dto: createBookmarkDto) {
        const bookmark = await this.prisma.bookmark.create({
            data: {
                userId,
                ...dto
            }
        })
        
        return bookmark
    }

    getBookmarkById(userId: number, bookmarkId: number) {
        return this.prisma.bookmark.findFirst({
            where: {
                id: bookmarkId,
                userId: userId
            }
        })
    }

    editBookmarkById(userId: number, bookmarkId: number, dto: editBookmarkDto) {}

    deleteBookmarkById(userId: number, bookmarkId: number) {}
}
