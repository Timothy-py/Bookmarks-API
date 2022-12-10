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

    getBookmarkById(userId: number, bookmarkId: number) {}

    createBookmark(userId: number, dto: createBookmarkDto) {}

    editBookmarkById(userId: number, bookmarkId: number, dto: editBookmarkDto) {}

    deleteBookmarkById(userId: number, bookmarkId: number) {}
}
