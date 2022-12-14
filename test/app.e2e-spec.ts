import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as pactum from 'pactum'
import { PrismaService } from '../src/prisma/prisma.service'
import { AppModule } from  '../src/app.module'
import { AuthDto } from '../src/auth/dto'
import { EditUserDto } from 'src/user/dto/edit-user.dto'
import { createBookmarkDto } from 'src/bookmark/dto/create-bookmark.dto'
import { editBookmarkDto } from 'src/bookmark/dto'

// Simulate nest application
describe('App E2E', () => {
  let app: INestApplication 
  let prisma: PrismaService
  
  beforeAll(async ()=>{
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
    )
    await app.init()
    await app.listen(3333)

    prisma = app.get(PrismaService)
    await prisma.cleanDb()
    pactum.request.setBaseUrl('http://localhost:3333')
  });

  // tear down.
  afterAll(() => {
    app.close();
  })
  
  describe('Auth', ()=>{
    const dto: AuthDto = {
      email: 'timo@gmail.com',
      password: '123'
    };

    describe('Signup', ()=>{
      it('should signup', ()=>{
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          // .inspect()
      })
    })

    describe('Signin', ()=>{
      it('should signin', ()=>{
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token')
      })
    })
  })

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
      })
    })

    describe('Edit user', ()=>{
      it('should edit a user', () => {
        const dto: EditUserDto = {
          firstName: 'Timothy',
          email: 'timo@gmail.com'
        }
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
      })
    })
  })

  describe('Bookmarks', () => {
    describe('Get empty bookmarks', ()=>{
      it('should get bookmarks', ()=>{
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
          .expectBody([])
      })
    })

    describe('Create bookmark', ()=>{
      const dto: createBookmarkDto = {
        title: 'First Bookmark',
        link: 'https://www.timothyadeyeye.netlify.app'
      };

      it('should create a bookmark', ()=>{
        return pactum
          .spec()
          .post('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('bookmarkId', 'id')
      })
    })

    describe('Get bookmarks', ()=>{
      it('should get bookmarks', ()=>{
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
          .expectJsonLength(1)
      })
    })

    describe('Get bookmark by id', ()=>{
      it('should get bookmark by id', ()=>{
        return pactum
          .spec()
          .get('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
          .inspect()
      })
    })

    describe('Edit bookmark by id', ()=>{
      const dto: editBookmarkDto = {
        title: "Bala blu bulaba bluu",
        description: "Bula ba bala bluee"
      }

      it('should edit a bookmark', () => {
        return pactum
          .spec()
          .patch('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .withBody(dto)
          .expectStatus(200)
          // .expectBodyContains('$s(bookmarkId)')
          .inspect()
      })
    })

    describe('Delete bookmark by id', ()=>{
      it('should delete a bookmark', ()=>{
        return pactum
          .spec()
          .delete('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(204)
      })
    })
  })
  
 })



// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });
// });