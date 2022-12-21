import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { createBookmarkDto } from './dto/create-bookmark.dto';
import { editBookmarkDto } from './dto/edit-bookmark.dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(
        private bookmarkService: BookmarkService,
    ){}

    @Get()
    getBookmarks(@GetUser('id') userId: number) {
        return this.bookmarkService.getBookmarks(
            userId
        )
    }

    @Get(':id')
    getBookmarksById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
    ) {
        return this.bookmarkService.getBookmarkById(
            userId, bookmarkId
        )
    }

    @Post()
    createBookmark(
        @GetUser('id') userId: number,
        @Body() dto: createBookmarkDto,
    ) {
        return this.bookmarkService.createBookmark(
            userId, dto
        )
    }

    @Patch(':id')
    editBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
        @Body() dto: editBookmarkDto
    ) {
        return this.bookmarkService.editBookmarkById(
            userId, bookmarkId, dto
        )
    }

    @Delete(':id')
    deleteBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number
    ) {
        return this.bookmarkService.deleteBookmarkById(
            userId, bookmarkId
        )
    }
}
