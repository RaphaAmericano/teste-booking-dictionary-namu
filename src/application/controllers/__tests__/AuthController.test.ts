import { AuthController } from "../AuthController";
import { AuthService } from "../../services/AuthService";
import { Request, Response } from "express";
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
    const req = {
      body: {
        name: "João Silva",
        password: "12345",
      } as CreateAuthWithUserDto,
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockDataResponse = {
      id: "09e5fb67-b6ec-448a-bf1f-879ce17ab6a0",
      password: "12345",
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
    // TODO: Corrigir essa resposta
    authServiceMock.createWithUser.mockResolvedValueOnce(mockDataResponse);

    await authController.signup(req, res);

    expect(authServiceMock.createWithUser).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuário criado com sucesso!",
      data: mockDataResponse
    });
  });
});
