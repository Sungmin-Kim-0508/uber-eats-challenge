import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";

// #5.9
@Injectable()
export class AuthGuard implements CanActivate {
  // context는 http request 오브젝트를 받아옴 -> graphql의 context와는 다른 것임
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // http request 오브젝트를 graphql 컨텍스트로 받아오는 법
    const gqlContext = GqlExecutionContext.create(context).getContext()
    const user = gqlContext['user']
    if (!user) {
      return false;
    }
    return true
  }

}