import { NotFoundException } from '@nestjs/common';
import { NcfService } from './ncf.service';

describe('NcfService', () => {
  let service: NcfService;
  let page: any;

  beforeEach(() => {
    page = {
      goto: jest.fn().mockResolvedValue(undefined),
      content: jest.fn().mockResolvedValue(undefined),
      type: jest.fn().mockResolvedValue(undefined),
      click: jest.fn().mockResolvedValue(undefined),
      evaluate: jest
        .fn()
        .mockResolvedValue([
          '123456789',
          'SocialR',
          'NCFType',
          'ABCDEFGH',
          'Status',
          'ValidTime',
        ]),
    };
    service = new NcfService(page);
  });

  describe('fetchRncDataByWebScrapping', () => {
    it('should return the fetched data', async () => {
      const rnc = '123456789';
      const ncf = 'ABCDEFGH';
      const expectedData = {
        rnc: '123456789',
        socialR: 'SocialR',
        ncfType: 'NCFType',
        ncf: 'ABCDEFGH',
        status: 'Status',
        validTime: 'ValidTime',
      };
      page.evaluate.mockReturnValueOnce([
        expectedData.rnc,
        expectedData.socialR,
        expectedData.ncfType,
        expectedData.ncf,
        expectedData.status,
        expectedData.validTime,
      ]);

      const result = await service.fetchRncDataByWebScrapping(
        'http://example.com',
        rnc,
        ncf,
      );

      expect(result).toEqual(expectedData);
      expect(page.goto).toHaveBeenCalledWith(
        'http://example.com',
        expect.objectContaining({ waitUntil: 'networkidle2' }),
      );
      expect(page.content).toHaveBeenCalled();
      expect(page.type).toHaveBeenCalledWith('#cphMain_txtRNC', rnc);
      expect(page.type).toHaveBeenCalledWith('#cphMain_txtNCF', ncf);
      expect(page.click).toHaveBeenCalledWith('#cphMain_btnConsultar');
      expect(page.evaluate).toHaveBeenCalled();
    });

    it('should throw a NotFoundException if the RNC is not found', async () => {
      page.evaluate.mockReturnValueOnce(null);

      await expect(
        service.fetchRncDataByWebScrapping(
          'http://example.com',
          '123456789',
          'ABCDEFGH',
        ),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
