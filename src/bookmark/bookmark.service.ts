import { Injectable } from '@nestjs/common';
import { createBookmarkDto, editBookmarkDto } from './dto'

@Injectable()
export class BookmarkService {
    getBookmarks(userId: number){}

    getBookmarkById(userId: number, bookmarkId: number) {}

    createBookmark(userId: number, dto: createBookmarkDto) {}

    editBookmarkById(userId: number, bookmarkId: number, dto: editBookmarkDto) {}

    deleteBookmarkById(userId: number, bookmarkId: number) {}
}
