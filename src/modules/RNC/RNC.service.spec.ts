import { Test, TestingModule } from '@nestjs/testing';
import { RncService } from './rnc.service';

describe('RncService', () => {
  let service: RncService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RncService],
    }).compile();

    service = module.get<RncService>(RncService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
