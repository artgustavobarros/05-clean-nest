import { Either, left, right } from '../../../../core/either'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comments'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from '../../../../core/Errors/error/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface CommentOnAnswerUseCasRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>
@Injectable()
export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCasRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) return left(new ResourceNotFoundError())

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return right({
      answerComment,
    })
  }
}
