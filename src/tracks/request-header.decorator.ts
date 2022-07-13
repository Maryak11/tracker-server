import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exception/validation.exception';

export const CheckPool = createParamDecorator(
  async (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const dto = plainToClass(data, request.headers);
    const error = await validate(dto);

    console.log(error);

    if (error.length) {
      throw new ValidationException('messages');
    }

    //Get the errors and push to custom array

    //   let validationErrors = error.map((obj) => Object.values(obj.constraints));
    //   throw new HttpException(
    //     `Ошибка в хедере: ${validationErrors}`,
    //     HttpStatus.BAD_REQUEST,
    //   );

    // if (1) {
    //   throw new UnauthorizedException({
    //     message: 'Пользователь не авторизован',
    //   });
    // }
    // const dto = plainToClass(value, headers, { excludeExtraneousValues: true });
    return dto;
  },
);
