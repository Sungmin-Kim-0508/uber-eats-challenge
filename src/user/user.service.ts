import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserInput, CreateUserOutput } from "./dtos/create-user.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { JwtService } from "src/jwt/jwt.service";
import { EditProfieOutput, EditProfileInput } from "./dtos/edit-profile.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async findById(userId: number): Promise<User> {
    return this.users.findOne({ id: userId })
  }

  async createAccount({ email, password, role }: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const exist = await this.users.findOne({ email })
      if (exist) {
        return {
          ok: false,
          error: "Email exists..."
        }
      }

      const user = await this.users.create({ email, password, role })
      await this.users.save(user)
      return {
        ok: true,
      }
    } catch (error) {
      return {
        ok: false,
        error
      }
    }
  }

  async login(loginInput: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({ email: loginInput.email })
      if (!user) {
        return {
          ok: false,
          error: "Email doesn't exist..."
        }
      }

      const passwordCorrect = await user.checkPassword(loginInput.password)
      if (!passwordCorrect) {
        return {
          ok: false,
          error: "Invalid Password..."
        }
      }
      const token = this.jwtService.sign(user.id)
      return {
        ok: true,
        token
      }
    } catch (error) {
      return {
        ok: false,
        error
      }
    }
  }

  async editProfile(userId: number, { email, password }: EditProfileInput): Promise<EditProfieOutput> {
    try {
      const user = await this.users.findOne(userId)
      if (email) {
        user.email = email
      }
      if (password) {
        user.password = password
      }
      await this.users.save(user)
      return {
        ok: true
      }
    } catch (error) {
      return {
        ok: false,
        error
      }
    }
  }
}