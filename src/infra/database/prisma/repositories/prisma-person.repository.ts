import { PrismaClient } from "@prisma/client";

import { PersonEntity } from "@/modules/person/entities/person.entity";
import { PersonRepository } from "@/modules/person/person.repository";

export class PrismaPersonRepository implements PersonRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(person: PersonEntity): Promise<void> {
    const { id, name, comments } = person.toObject();
    await this.prisma.person.create({
      data: {
        id,
        name,
        comments: {
          createMany: {
            data: comments,
          },
        },
      },
    });
  }
}
