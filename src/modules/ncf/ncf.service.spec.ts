import { Test, TestingModule } from '@nestjs/testing';
import { NcfService } from './ncf.service';

describe('NcfService', () => {
  let service: NcfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NcfService],
    }).compile();

    service = module.get<NcfService>(NcfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
