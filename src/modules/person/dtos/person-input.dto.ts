import { CommentInputDto } from "./comment-input.dto";

export interface PersonInputDto {
  id?: number;
  name: string;
  comments: CommentInputDto[];
}
