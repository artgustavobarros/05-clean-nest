import { UseCaseError } from '@/core/Errors/use-case-errors'

export class InvalidAttachmentTypeError extends Error implements UseCaseError {
  constructor(type: string) {
    super(`File type is "${type}" is not valid.`)
  }
}
