import request from "supertest";
import { Application } from "express";
import jwt from 'jsonwebtoken';
import { AuthService } from "../../../application/services/AuthService";
import server from "../../server";
import { AuthResponseDto, CreateAuthWithUserResponseDto } from "../../../domain/entities/Auth";

jest.mock("../../../application/services/AuthService");
jest.mock("jsonwebtoken")

describe("Auth Routes", () => {
  let app: Application;

  beforeAll(() => {
    app = server;
  });

  it("should return 201 when create a new user", async () => {
    (jwt.sign as jest.Mock).mockReturnValue(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5ZTNiODgyLTc3YTYtNDliZC05MDgxLTUxYjNkYzVjOTU1MiIsIm5hbWUiOiJKb8OjbyBTaWx2YSIsImlhdCI6MTczMjkwODUyOCwiZXhwIjoxNzMyOTEyMTI4fQ.kS7EbpcMxmGgbpZaQ4CMW7AxpdAYBjVvm8g27yVcFWM"
    )

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

    const expectedResponse:AuthResponseDto = {
      id: mockDataResponse.user.id,
      name: mockDataResponse.user.name,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5ZTNiODgyLTc3YTYtNDliZC05MDgxLTUxYjNkYzVjOTU1MiIsIm5hbWUiOiJKb8OjbyBTaWx2YSIsImlhdCI6MTczMjkwODUyOCwiZXhwIjoxNzMyOTEyMTI4fQ.kS7EbpcMxmGgbpZaQ4CMW7AxpdAYBjVvm8g27yVcFWM",
    }
    
    const authServiceMock = AuthService.prototype.createWithUser as jest.Mock;
    authServiceMock.mockResolvedValue(mockDataResponse);

    const response = await request(app).post("/auth/signup").send({
      name: "João Silva",
      password: "12345",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });
});
