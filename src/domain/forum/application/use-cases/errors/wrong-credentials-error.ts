import { UseCaseError } from '@/core/Errors/use-case-errors'

export class WrongCredentialsError extends Error implements UseCaseError {
  constructor() {
    super('Credentials are not valid.')
  }
}
