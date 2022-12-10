import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as pactum from 'pactum'
import { PrismaService } from '../src/prisma/prisma.service'
import { AppModule } from  '../src/app.module'
import { AuthDto } from '../src/auth/dto'
import { EditUserDto } from 'src/user/dto/edit-user.dto'

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
    describe('Get bookmarks', ()=>{})

    describe('Create bookmark', ()=>{})

    describe('Get bookmark by id', ()=>{})

    describe('Edit bookmark by id', ()=>{})

    describe('Delete bookmark by id', ()=>{})
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