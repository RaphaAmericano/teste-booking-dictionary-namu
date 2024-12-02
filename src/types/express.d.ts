import 'express';

declare global {
  namespace Express {
    interface Locals {
      word?: Word; 
    }
    interface Request {
      user?: { id: string}
    }
  }
}
