import { jest } from '@jest/globals';
import adoptionsController from '../src/controllers/adoptions.controller.js';
import * as services from '../src/services/index.js';

// Tests unitarios para los controladores de adopciones
// Se mockean todos los servicios externos

describe('adoptions.controller UNIT', () => {
  let req, res;

  beforeEach(() => {
    // Se mockean los objetos req y res de Express
    req = { params: {}, body: {} };
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe('getAllAdoptions', () => {
    it('happy path: responde con todas las adopciones', async () => {
      // Simula que el servicio devuelve dos adopciones
      const mockAdoptions = [{ _id: '1' }, { _id: '2' }];

      jest
        .spyOn(services.adoptionsService, 'getAll')
        .mockResolvedValue(mockAdoptions);

      await adoptionsController.getAllAdoptions(req, res);
      // Debería responder con status success y el array
      expect(res.send).toHaveBeenCalledWith({
        status: 'success',
        payload: mockAdoptions,
      });
    });

    it('error: lanza error y responde 500', async () => {
      // Simula un error en el servicio
      jest
        .spyOn(services.adoptionsService, 'getAll')
        .mockRejectedValue(new Error('fail'));

      await adoptionsController.getAllAdoptions(req, res);
      // Debería responder con status 500 y un mensaje de error
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        status: 'error',
        error: expect.any(String),
      });
    });
  });

  describe('getAdoption', () => {
    it('happy path: responde con la adopcion encontrada', async () => {
      // Simula que encuentra una adopción por id
      req.params.aid = 'abc123';
      const mockAdoption = { _id: 'abc123' };

      jest
        .spyOn(services.adoptionsService, 'getBy')
        .mockResolvedValue(mockAdoption);

      await adoptionsController.getAdoption(req, res);
      expect(res.send).toHaveBeenCalledWith({
        status: 'success',
        payload: mockAdoption,
      });
    });

    it('error: no encuentra la adopcion y responde 404', async () => {
      // Simula que no existe la adopción
      req.params.aid = 'abc123';

      jest.spyOn(services.adoptionsService, 'getBy').mockResolvedValue(null);

      await adoptionsController.getAdoption(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        status: 'error',
        error: 'Adoption not found',
      });
    });
  });

  describe('createAdoption', () => {
    it('happy path: adopcion exitosa', async () => {
      // Simula usuario y mascota válidos
      req.params = { uid: 'u1', pid: 'p1' };
      const user = { _id: 'u1', pets: [] };
      const pet = { _id: 'p1', adopted: false };

      jest.spyOn(services.usersService, 'getUserById').mockResolvedValue(user);
      jest.spyOn(services.petsService, 'getBy').mockResolvedValue(pet);
      jest.spyOn(services.usersService, 'update').mockResolvedValue();
      jest.spyOn(services.petsService, 'update').mockResolvedValue();
      jest.spyOn(services.adoptionsService, 'create').mockResolvedValue();

      await adoptionsController.createAdoption(req, res);
      // Debería responder con éxito
      expect(res.send).toHaveBeenCalledWith({
        status: 'success',
        message: 'Pet adopted',
      });
    });

    it('error: usuario no encontrado', async () => {
      // Simula que el usuario no existe
      req.params = { uid: 'u1', pid: 'p1' };

      jest.spyOn(services.usersService, 'getUserById').mockResolvedValue(null);

      await adoptionsController.createAdoption(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        status: 'error',
        error: 'user Not found',
      });
    });
    it('error: mascota no encontrada', async () => {
      // Simula que la mascota no existe
      req.params = { uid: 'u1', pid: 'p1' };

      jest
        .spyOn(services.usersService, 'getUserById')
        .mockResolvedValue({ _id: 'u1', pets: [] });
      jest.spyOn(services.petsService, 'getBy').mockResolvedValue(null);

      await adoptionsController.createAdoption(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        status: 'error',
        error: 'Pet not found',
      });
    });
    it('error: mascota ya adoptada', async () => {
      // Simula que la mascota ya está adoptada
      req.params = { uid: 'u1', pid: 'p1' };

      jest
        .spyOn(services.usersService, 'getUserById')
        .mockResolvedValue({ _id: 'u1', pets: [] });
      jest
        .spyOn(services.petsService, 'getBy')
        .mockResolvedValue({ _id: 'p1', adopted: true });

      await adoptionsController.createAdoption(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        status: 'error',
        error: 'Pet is already adopted',
      });
    });
  });
});
