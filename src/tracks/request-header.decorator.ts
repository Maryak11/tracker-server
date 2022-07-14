import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exception/validation.exception';

export const CheckPool = createParamDecorator(
  async (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const dto = plainToClass(data, request.headers);
    const error = await validate(dto);

    if (error.length) {
      let messages = error.map((err) => {
        return `${err.property} - ${Object.values(err.constraints).join(',')}`;
      });

      throw new ValidationException(messages);
    }
    return dto;
  },
);
