import { AuthController } from "../AuthController";
import { AuthService } from "../../services/AuthService";
import { NextFunction, Request, Response } from "express";
import {
  CreateAuthWithUserDto,
  CreateAuthWithUserResponseDto,
} from "../../../domain/entities/Auth";
describe("AuthController", () => {
  let authServiceMock: jest.Mocked<AuthService>;
  let authController: AuthController;

  beforeEach(() => {
    authServiceMock = {
      createWithUser: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    authController = new AuthController(authServiceMock);
  });

  it("should return a 201 status code when creating a new user", async () => {

    const mockDataResponse = {
      id: "09e5fb67-b6ec-448a-bf1f-879ce17ab6a0",
      password: "12345",
      email: "joao@example.com",
      created_at: "2024-11-29T04:21:53.410Z",
      updated_at: "2024-11-29T04:21:53.410Z",
      user_id: "19e3b882-77a6-49bd-9081-51b3dc5c9552",
      user: {
        id: "19e3b882-77a6-49bd-9081-51b3dc5c9552",
        name: "João Silva",
        created_at: "2024-11-29T04:21:53.410Z",
        updated_at: "2024-11-29T04:21:53.410Z",
      },
    } as CreateAuthWithUserResponseDto;

    (authServiceMock.createWithUser as jest.Mock).mockResolvedValue(mockDataResponse)

    const req = {
      body: {
        name: "João Silva",
        email: "joao@example.com",
        password: "12345",
      } as CreateAuthWithUserDto,
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction

    await authController.signup(req, res, next);

    expect(req.user).toEqual(mockDataResponse)
    expect(next).toHaveBeenCalled()

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
