import * as express from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/env";

export class AuthenticationError extends Error {
  status: number = 401;

  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<any> {
  if (securityName !== "jwt") {
    return Promise.reject(new AuthenticationError("Invalid security name"));
  }

  const token = request.body.token || request.query.token || request.headers["x-access-token"] || request.headers.authorization;
  return new Promise((resolve, reject) => {
    if (!token) {
      reject(new AuthenticationError("No token provided"));
    }

    jwt.verify(token, config.server.jwtToken.secret, function (err: any, decoded: any) {
      if (err) {
        reject(err);
      } else {
        for (const scope of scopes) {
          if (!decoded.scopes.includes(scope)) {
            reject(new AuthenticationError("Token does not contain required scope."));
          }
        }
        resolve(decoded);
      }
    });
  });
}
