import { InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/podcast/dtos/output.dto";
import { User } from "../entities/user.entity";

@InputType()
export class CreateUserInput extends User { }

@ObjectType()
export class CreateUserOutput extends CoreOutput { }