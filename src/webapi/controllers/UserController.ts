import { IUser } from "../models/interfaces/IUser.js";
import { UserDocument } from "../models/user.js";
import { repositoryFactory } from "../repository/repositoryFactory.js";
import { Get, Post, Put, Delete, Route, Body, Path, Controller, Tags, Security } from "tsoa";

const users = repositoryFactory("User");

interface UserDto extends IUser {}

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  @Get("/")
  @Security("jwt", ["admin"])
  public async find(): Promise<UserDto[]> {
    const result = (await users.find()) as UserDocument[];
    return result.map((doc) => ({
      _id: doc._id,
      name: doc.name,
      email: doc.email,
      role: doc.role,
      password: doc.password,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));
  }

  @Get("/:id")
  @Security("jwt")
  public async findById(@Path() id: string): Promise<UserDto> {
    const doc = (await users.findOne(id)) as UserDocument;
    return {
      _id: doc._id,
      name: doc.name,
      email: doc.email,
      role: doc.role,
      password: doc.password,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  @Post("/")
  public async create(@Body() data: UserDto): Promise<string> {
    const doc = (await users.create(data)) as UserDocument;
    return doc._id;
  }

  @Put("/:id")
  @Security("jwt")
  public async update(@Path() id: string, @Body() data: UserDto): Promise<boolean> {
    return await users.update(id, data);
  }

  @Delete("/:id")
  @Security("jwt")
  public async remove(@Path() id: string): Promise<boolean> {
    return await users.delete(id);
  }
}
