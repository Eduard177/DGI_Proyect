import { NotFoundException } from '@nestjs/common';
import { Page } from 'puppeteer';
import { RncService } from './rnc.service';
import { ConfigService } from 'src/config/config.service';

describe('RncService', () => {
  let rncService: RncService;
  let mockPage: Page;

  beforeEach(async () => {
    mockPage = {
      goto: jest.fn().mockResolvedValue(undefined),
      content: jest.fn().mockResolvedValue(undefined),
      type: jest.fn().mockResolvedValue(undefined),
      click: jest.fn().mockResolvedValue(undefined),
      evaluate: jest.fn().mockResolvedValue(undefined),
    } as any;
    
    rncService = new RncService(mockPage, new ConfigService);
  });

  describe('fetchRncDataByWebScrapping', () => {
    it('should throw NotFoundException when RNC not found', async () => {
      mockPage.evaluate = jest.fn().mockResolvedValue(null);
      expect.assertions(1);

      try {
        await rncService.fetchRncDataByWebScrapping(
          '123456789',
        );
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should return RncFetchedDataInterface when RNC is found', async () => {
      mockPage.evaluate = jest.fn().mockResolvedValue({
        innerHTML: 'html table content',
      });
      mockPage.evaluate = jest
        .fn()
        .mockResolvedValue([
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
        ]);
      expect(
        await rncService.fetchRncDataByWebScrapping(
          '123456789',
        ),
      ).toEqual({
        businessName: '5',
        economyActivity: '13',
        rnc: '1',
        socialR: '3',
        status: '11',
      });
    });
  });
});
