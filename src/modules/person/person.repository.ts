import { PersonEntity } from "./entities/person.entity";

export interface PersonRepository {
  save(person: PersonEntity): Promise<void>;
}
