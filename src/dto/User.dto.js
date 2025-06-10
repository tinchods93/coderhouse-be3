import { faker } from '@faker-js/faker';

export default class UserDTO {
  static getUserTokenFrom = (user) => {
    return {
      name: `${user.first_name} ${user.last_name}`,
      role: user.role,
      email: user.email,
    };
  };

  static getUserMock = (complete = false) => {
    const mock = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      password: 'coder123',
      email: faker.internet.email(),
      role: faker.datatype.boolean() ? 'user' : 'admin',
    };

    if (complete) {
      mock.id = faker.string.uuid();
      mock.__v = 0;
    }

    return mock;
  };
}
