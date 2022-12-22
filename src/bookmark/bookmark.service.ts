import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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

    async editBookmarkById(userId: number, bookmarkId: number, dto: editBookmarkDto) {
        // get the bookmark by id
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        })

        // check if bookmark exist and user owns it
        if(!bookmark || bookmark.userId !== userId){
            throw new ForbiddenException('Access to resources denied')
        }

        return this.prisma.bookmark.update({
            where: {
                id: bookmarkId
            },
            data: {
                ...dto
            }
        })
    }

    deleteBookmarkById(userId: number, bookmarkId: number) {}
}
