import { PrismaClient } from "@prisma/client";

import { PrismaPersonRepository } from "./infra/database/prisma/repositories/prisma-person.repository";
import { CreatePersonUseCase } from "./modules/person/use-cases/create-person.use-case";
import { PersonInputDto } from "./modules/person/dtos/person-input.dto";

const prisma = new PrismaClient({
  errorFormat: "pretty",
});

const personRepository = new PrismaPersonRepository(prisma);
const createPersonUseCase = new CreatePersonUseCase(personRepository);

async function main() {
  console.time("Finished in");
  const person: PersonInputDto = {
    name: "Person name",
    comments: Array.from({ length: 100 }, (_, i) => ({ content: `Comment ${i + 1}` })),
  };
  console.log("Preparing to create 100 persons with 500 comments each");
  await Promise.all(Array.from({ length: 500 }, () => createPersonUseCase.execute(person)));
  console.timeEnd("Finished in");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
