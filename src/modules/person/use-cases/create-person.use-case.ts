import { CreatePersonDto } from "../dtos/create-person.dto";
import { PersonEntity } from "../entities/person.entity";
import { PersonRepository } from "../person.repository";

export class CreatePersonUseCase {
  constructor(private readonly personRepository: PersonRepository) {}

  async execute(input: CreatePersonDto): Promise<void> {
    const person = await PersonEntity.create(input);
    await this.personRepository.save(person);
  }
}
