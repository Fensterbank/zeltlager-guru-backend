import { createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator((data, [root, args, ctx, info]) => ctx.req.user);
