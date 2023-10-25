interface CreateCommentDto {
  content: string;
}

export interface CreatePersonDto {
  name: string;
  comments: CreateCommentDto[];
}
