import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

// #5.10
export const AuthUser = createParamDecorator(
  // 데코레이터를 만들 때는 data의 타입은 항상 unknown이다
  (data: unknown, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context).getContext()
    const user = gqlContext['user']
    return user
  }
)