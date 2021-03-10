import { Mutation, Resolver, Query, Args } from "@nestjs/graphql";
import { CreateUserInput, CreateUserOutput } from "./dtos/create-user.dto";
import { UserService } from "./user.service";
import { LoginInput, LoginOutput } from "src/user/dtos/login.dto"
import { EditProfieOutput, EditProfileInput } from "./dtos/edit-profile.dto";
import { SeeProfileInput, SeeProfileOutput } from "./dtos/see-profile.dto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthUser } from "src/auth/auth-user.decorator";
import { User } from "./entities/user.entity";

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService
  ) { }

  @Mutation(returns => CreateUserOutput)
  createAccount(@Args('createUserInput') createUserInput: CreateUserInput): Promise<CreateUserOutput> {
    return this.userService.createAccount(createUserInput)
  }

  @Mutation(returns => LoginOutput)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.userService.login(loginInput)
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => EditProfieOutput)
  editProfile(@AuthUser() authUser: User, @Args('editProfileInput') editProfileInput: EditProfileInput): Promise<EditProfieOutput> {
    return this.userService.editProfile(authUser.id, editProfileInput)
  }

  @UseGuards(AuthGuard)
  @Query(returns => SeeProfileOutput)
  async seeProfile(@AuthUser() authUser: User): Promise<SeeProfileOutput> {
    try {
      const user = await this.userService.findById(authUser.id)
      return {
        ok: true,
        user
      }
    } catch (error) {
      return {
        ok: false,
        error
      }
    }
  }
}