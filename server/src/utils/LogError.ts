
export class LogError extends Error{

  statusCode = 0
  status = ''
  isOperational = false

  constructor(message: string, statusCode: number) {
    super(message);
          
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
          
    Error.captureStackTrace(this, this.constructor);
  }
}


  