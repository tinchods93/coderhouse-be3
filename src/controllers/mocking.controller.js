import PetDTO from '../dto/Pet.dto.js';
import UserDTO from '../dto/User.dto.js';
import petsController from './pets.controller.js';
import sessionsController from './sessions.controller.js';

const entityTypes = {
  pet: 'pet',
  user: 'user',
};

/**
 * Controlador para generar entidades mockeadas en la base de datos.
 * Espera un objeto en el body con la siguiente estructura:
 * {
 *   quantity: Number, // Cantidad de entidades a generar (debe ser mayor a 0)
 *   entity: String    // Tipo de entidad a generar: 'pet' o 'user'
 * }
 */
const generateData = async (req, res) => {
  // Genera una cantidad de entidades mockeadas
  const { quantity, entity } = req.body;
  if (!quantity && !entity) {
    return res.status(400).send({
      status: 'error',
      error: 'Quantity and entity type are required',
    });
  }

  if (quantity <= 0 || typeof quantity !== 'number') {
    return res.status(400).send({
      status: 'error',
      error: 'Invalid quantity. It must be a number greater than 0',
    });
  }
  if (
    typeof entity !== 'string' ||
    !Object.values(entityTypes).includes(entity)
  ) {
    return res.status(400).send({
      status: 'error',
      error:
        'Invalid entity type. It must be a string and one of the following: pet, user',
    });
  }

  const fakeRes = {
    send: (data) => {
      return data;
    },
  };

  const mockedData = [];
  for (let i = 0; i < quantity; i++) {
    switch (entity) {
      case entityTypes.pet:
        mockedData.push(
          petsController.createPet({ body: PetDTO.getPetMock() }, fakeRes)
        );
        break;
      case entityTypes.user:
        mockedData.push(
          sessionsController.register({ body: UserDTO.getUserMock() }, fakeRes)
        );
        break;
      default:
        return res
          .status(400)
          .send({ status: 'error', error: 'Invalid entity type' });
    }
  }

  await Promise.all(mockedData);

  res.send({
    status: 'success',
    message: `${quantity} ${entity}s created`,
  });
};

/**
 * Controlador para generar 50 entidades mockeadas de tipo 'pet'.
 * Devuelve un array con las entidades mockeadas.
 */
const mockingPets = async (req, res) => {
  // devolver 50 animales mockeados
  const mockedPets = [];
  for (let i = 0; i < 50; i++) {
    mockedPets.push(PetDTO.getPetMock(true));
  }
  res.send({ status: 'success', payload: mockedPets });
};

/**
 * Controlador para generar 50 entidades mockeadas de tipo 'user'.
 * Devuelve un array con las entidades mockeadas.
 */
const mockingUsers = async (req, res) => {
  // devolver 50 usuarios mockeados
  const mockedUsers = [];
  for (let i = 0; i < 50; i++) {
    mockedUsers.push(UserDTO.getUserMock(true));
  }
  res.send({ status: 'success', payload: mockedUsers });
};

export default {
  generateData,
  mockingPets,
  mockingUsers,
};
