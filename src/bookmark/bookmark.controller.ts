import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
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
    getBookmarks(@GetUser('id') userId: number) {}

    @Get(':id')
    getBookmarksById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
    ) {}

    @Post()
    createBookmark(
        @GetUser('id') userId: number,
        @Body() dto: createBookmarkDto,
    ) {}

    @Patch()
    editBookmarkById(
        @GetUser('id') userId: number,
        @Body() dto: editBookmarkDto
    ) {}

    @Delete(':id')
    deleteBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number
    ) {}
}
