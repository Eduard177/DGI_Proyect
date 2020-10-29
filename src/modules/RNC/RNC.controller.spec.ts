import { Test, TestingModule } from '@nestjs/testing';
import { RncController } from './rnc.controller';

describe('RncController', () => {
  let controller: RncController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RncController],
    }).compile();

    controller = module.get<RncController>(RncController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
