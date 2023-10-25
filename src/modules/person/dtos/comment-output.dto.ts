import { CommentInputDto } from "./comment-input.dto";

export interface CommentOutputDto extends CommentInputDto {
  id: number;
}
