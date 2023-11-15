import { Post, Route, Body, Controller, Tags } from "tsoa";
import { LoginInput } from "./DTOs/Auth/loginInput";
import User from "../models/user";
import { LoginResult } from "./DTOs/Auth/loginOutput";
import jwt from "jsonwebtoken";
import config from "../config/env";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {
  @Post("/login")
  async login(@Body() data: LoginInput): Promise<LoginResult> {
    const { email, password } = data;
    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found");
    if (user.password !== password) throw new Error("Invalid password");

    const token = jwt.sign({ userId: user.id, email: user.email }, config.server.jwtToken.secret, { expiresIn: "1h" });
    return { token };
  }
}
