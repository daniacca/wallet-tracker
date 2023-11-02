import { IUser } from "../../models/interfaces/IUser.js";
import { UserDocument } from "../../models/user.js";
import { repositoryFactory } from "../../repository/repositoryFactory.js";
import { Get, Post, Put, Delete, Route, Body, Path } from "tsoa";

const users = repositoryFactory("User");

interface UserDto extends IUser {
  _id: string;
}

@Route("api/users")
export default class UserController {
  @Get("/")
  public async find(): Promise<UserDto[]> {
    const result = (await users.find()) as UserDocument[];
    return result.map((doc) => ({
      _id: doc._id,
      name: doc.name,
      email: doc.email,
      password: doc.password,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));
  }

  @Get("/:id")
  public async findUserById(@Path() id: string): Promise<UserDto> {
    const doc = (await users.findOne(id)) as UserDocument;
    return {
      _id: doc._id,
      name: doc.name,
      email: doc.email,
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
  public async update(@Path() id: string, @Body() data: UserDto): Promise<boolean> {
    const result = await users.update(id, data);
    return result;
  }

  @Delete("/:id")
  public async remove(@Path() id: string): Promise<boolean> {
    const result = await users.delete(id);
    return result;
  }
}
