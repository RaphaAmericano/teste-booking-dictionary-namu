import request from "supertest";
import express, { Application } from "express";
import { AuthService } from "../../../application/services/AuthService";
import { AuthController } from "../../../application/controllers/AuthController";
import server from "../../server";
import { CreateAuthWithUserResponseDto } from "../../../domain/entities/Auth";

jest.mock("../../../application/services/AuthService");

describe("Auth Routes", () => {
  let app: Application;

  beforeAll(() => {
    app = server;
  });

  it("should return 201 when create a new user", async () => {
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

    const authServiceMock = AuthService.prototype.createWithUser as jest.Mock;
    authServiceMock.mockResolvedValue(mockDataResponse);

    const response = await request(app).post("/auth/signup").send({
      name: "João Silva",
      password: "12345",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Usuário criado com sucesso!",
      data: mockDataResponse,
    });
  });
});
