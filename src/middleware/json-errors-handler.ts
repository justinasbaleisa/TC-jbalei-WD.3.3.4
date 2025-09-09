import type { ErrorRequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ZodError } from 'zod'

const { NODE_ENV } = process.env
const isTest = NODE_ENV === 'test'

export class ApiError extends Error {
  status: StatusCodes

  constructor(status: StatusCodes, message?: string) {
    super(message ?? 'Error')
    this.status = status
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

/**
 * Reports error in a simple structured JSON format.
 */
export const jsonErrorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next
) => {
  const statusCode = getErrorStatusCode(error)

  // display error in the console
  if (!isTest) {
    // tests tend to produce errors on purpose and
    // we don't want to pollute the console expected behavior
    // eslint-disable-next-line no-console
    console.error(error)
  }

  res.status(statusCode).json({
    error: {
      message: error.message ?? 'Internal server error',
      ...(error instanceof ApiError ? { status: error.status } : {}),
      ...(error instanceof ZodError ? { issues: error.issues } : {}),
    },
  })
}

function getErrorStatusCode(error: unknown): number {
  if (error instanceof ApiError) {
    return error.status
  }

  if (error instanceof ZodError) return StatusCodes.BAD_REQUEST

  if (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof error.status === 'number'
  ) {
    return (error as any).status
  }

  return StatusCodes.INTERNAL_SERVER_ERROR
}
