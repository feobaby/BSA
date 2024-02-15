import * as express from 'express';

interface User {
  userId?: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}
