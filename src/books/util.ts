import { HttpException, HttpStatus } from '@nestjs/common'

export const returnError = (
  message = 'Something Went Wrong',
  status: HttpStatus
) => {
  return new HttpException(message, status)
}
