import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  errorFormat: "pretty",
});

export class IdValueObject {
  private constructor(private readonly _value: number) {}

  static async create(entity: "PERSON" | "COMMENT", value?: number): Promise<IdValueObject> {
    if (!value) value = await this.generateId(entity);
    return new IdValueObject(value);
  }

  get value(): number {
    return this._value;
  }

  private static async generateId(entity: "PERSON" | "COMMENT"): Promise<number> {
    return db.$queryRaw<{ nextval: BigInt }[]>`SELECT nextval(${
      entity.toLowerCase() + "s_id_seq"
    })`.then((r) => Number(r[0].nextval));
  }
}
