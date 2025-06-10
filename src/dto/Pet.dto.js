import { faker } from '@faker-js/faker';

export default class PetDTO {
  static getPetInputFrom = (pet) => {
    return {
      name: pet.name || '',
      specie: pet.specie || '',
      image: pet.image || '',
      birthDate: pet.birthDate || '12-30-2000',
      adopted: false,
    };
  };

  static getPetMock = (complete = false) => {
    // Devuelve un animal mockeado
    const mock = {
      name: faker.animal.petName(),
      specie: faker.animal.type(),
      // Imagen de ejemplo que saque de una Api https://dog.ceo/dog-api/documentation/random
      image: 'https://images.dog.ceo/breeds/setter-english/n02100735_9865.jpg',
      birthDate: new Date(
        faker.date.past(10, new Date()).getTime()
      ).toLocaleDateString('en-US'),
      adopted: faker.datatype.boolean(),
    };

    if (complete) {
      mock.id = faker.string.uuid();
      mock.__v = 0;
    }

    return mock;
  };
}
