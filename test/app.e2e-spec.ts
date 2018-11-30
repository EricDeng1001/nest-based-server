import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let server;
  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    server = app.getHttpServer();
    await app.init();
  });

  it('POST /user/register, should fail', () => {
    return request(server)
      .post('/user/register')
      .send({
        email: "xxxx"
      })
      .expect(400);
  });

  it('POST /user/register, should fail', () => {
    let dto = {
      somethingelse: "bablala",
      username: "moriyuan",
      password: "pas8sssss8",
      name: "mori",
      company: "lanternfish",
      phone: "12341234",
      email: "mori@lanternfish.cn",
      invite_code: "invitecode",
      wechat: "mori123456",
      // 激活成功后需要跳转到的地址
      success_url: "http://lanternfish.hk/confirm/success",
      // 激活失败后需要跳转到的地址
      error_url: "http://lanternfish.hk/confirm/error"
    };
    return request(server)
      .post('/user/register')
      .send(dto)
      .expect(400)
  });

  it('POST /user/register, should success', done => {
    return request(server)
      .post('/user/register')
      .send({
        username: "moriyuan",
        password: "pas8sssss8",
        name: "mori",
        company: "lanternfish",
        phone: "12341234",
        email: "mori@lanternfish.cn",
        invite_code: "invitecode",
        wechat: "mori123456",
        // 激活成功后需要跳转到的地址
        success_url: "http://lanternfish.hk/confirm/success",
        // 激活失败后需要跳转到的地址
        error_url: "http://lanternfish.hk/confirm/error"
      })
      .expect(201)
      .expect({
        success: true
      })
      .end((err, res) => {
        if (err) {
          console.log(res.error);
        }
        done(err);
      })

  });

  afterAll(() => {
    app.get<AppModule>(AppModule).closeDB();
  })
});
