import { InternalServerErrorException } from "@nestjs/common";
import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import * as bcrypt from "bcrypt"
import { IsEnum } from "class-validator";
import { CoreEntity } from "src/podcast/entities/core.entity";
import { BeforeInsert, Column, Entity } from "typeorm";

enum UserRole {
  Host,
  Listener
}

registerEnumType(UserRole, { name: "UserRole"})

@Entity()
@InputType({ isAbstract: true })
@ObjectType()
export class User extends CoreEntity {

  @Column()
  @Field(type => String)
  email: string

  @Column()
  @Field(type => String)
  password: string;

  @Column({ type: "enum", enum: UserRole })
  @Field(type => UserRole)
  @IsEnum(UserRole)
  role: UserRole

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10)
    } catch (error) {
      throw InternalServerErrorException
    }
  }

  async checkPassword(plainTextPassword: string): Promise<boolean> {
    try {
      const isCorrectPassword = await bcrypt.compare(plainTextPassword, this.password)
      return isCorrectPassword
    } catch (error) {
      throw InternalServerErrorException
    }
  }
}