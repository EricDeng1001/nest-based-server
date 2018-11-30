import { ValidationPipe, Controller, Post, Get, Body, UsePipes } from '@nestjs/common';
import { RegsiterDTO } from './dto/register.dto';
import { UserService } from './user.service';

const validationPipeForThisController = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  skipMissingProperties: true
});

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(validationPipeForThisController)
  async register(@Body() payload: RegsiterDTO) {
    try {
      await this.userService.createFresh(payload);
      return {
        success: true
      };
    } catch(e) {
      return {
        success: false,
        error: e
      };
    }
  }
}
