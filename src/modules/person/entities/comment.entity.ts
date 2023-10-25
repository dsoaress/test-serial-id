import { IdValueObject } from "@/common/value-objects/id.value-object";

import { CommentInputDto } from "../dtos/comment-input.dto";
import { CommentOutputDto } from "../dtos/comment-output.dto";

interface CommentEntityInputProps {
  id: IdValueObject;
  content: string;
}

export class CommentEntity {
  private readonly _id: IdValueObject;
  private _content: string;

  private constructor({ id, content }: CommentEntityInputProps) {
    this._id = id;
    this._content = content;
  }

  static async create(props: CommentInputDto): Promise<CommentEntity> {
    const id = await IdValueObject.create("COMMENT", props.id);
    return new CommentEntity({ id, content: props.content });
  }

  get id(): IdValueObject {
    return this._id;
  }

  get content(): string {
    return this._content;
  }

  toObject(): CommentOutputDto {
    return {
      id: this.id.value,
      content: this.content,
    };
  }
}
