import { IdValueObject } from "@/common/value-objects/id.value-object";

import { CommentOutputDto } from "../dtos/comment-output.dto";
import { PersonInputDto } from "../dtos/person-input.dto";
import { PersonOutputDto } from "../dtos/person-output.dto";
import { CommentEntity } from "./comment.entity";

interface PersonEntityInputProps {
  id: IdValueObject;
  name: string;
  comments: CommentEntity[];
}

export class PersonEntity {
  private readonly _id: IdValueObject;
  private _name: string;
  private _comments: CommentEntity[] = [];

  private constructor({ id, name, comments }: PersonEntityInputProps) {
    this._id = id;
    this._name = name;
    this._comments = comments;
  }

  static async create(props: PersonInputDto): Promise<PersonEntity> {
    const id = await IdValueObject.create("PERSON", props.id);
    const comments: CommentEntity[] = [];
    for (const comment of props.comments) {
      comments.push(await CommentEntity.create(comment));
    }
    return new PersonEntity({ id, name: props.name, comments });
  }

  get id(): IdValueObject {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get comments(): CommentOutputDto[] {
    return this._comments.map((comment) => comment.toObject());
  }

  toObject(): PersonOutputDto {
    return {
      id: this.id.value,
      name: this.name,
      comments: this.comments,
    };
  }
}
