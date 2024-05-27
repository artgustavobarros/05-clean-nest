import { UseCaseError } from '@/core/Errors/use-case-errors'

export class StudentsAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Student "${identifier}" already exists.`)
  }
}
