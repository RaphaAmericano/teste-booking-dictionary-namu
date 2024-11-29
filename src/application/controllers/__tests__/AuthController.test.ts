import { AuthController } from "../AuthController";
import { AuthService } from "../../services/AuthService";
import { Request, Response } from "express";
import { CreateAuthWithUserDto } from "../../../domain/entities/Auth";
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
            password: "12345",
            name: "João Silva"
        } as CreateAuthWithUserDto,
    } as Request

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;


    // TODO: Corrigir essa resposta
    authServiceMock.createWithUser.mockResolvedValueOnce({
      id: "1",
      password: "12345",
      created_at: new Date(),
    //   updated_at: new Date(),
    //   user: {
    //     id: "1",
    //     name: "João Silva",
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    });

    await authController.signup(req, res)

    expect(authServiceMock.createWithUser).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: "1",
      password: "12345",
      created_at: expect.any(Date),
    //   updated_at: expect.any(Date),
    //   user: {
    //     id: "1",
    //     name: "João Silva",
    //     createdAt: expect.any(Date),
    //     updatedAt: expect.any(Date),
    //   },
    });


  });
});
