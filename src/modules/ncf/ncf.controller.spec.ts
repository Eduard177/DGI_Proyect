import { Test, TestingModule } from '@nestjs/testing';
import { NcfController } from './ncf.controller';

describe('NcfController', () => {
  let controller: NcfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NcfController],
    }).compile();

    controller = module.get<NcfController>(NcfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
