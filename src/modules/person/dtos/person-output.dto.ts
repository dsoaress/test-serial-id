import { CommentOutputDto } from "./comment-output.dto";
import { PersonInputDto } from "./person-input.dto";

export interface PersonOutputDto extends PersonInputDto {
  id: number;
  comments: CommentOutputDto[];
}
