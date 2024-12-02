import { DictionaryApiService } from "../DictionaryApiService";
import { ResponseApiWordArray } from "../__mocks__/DictionaryApiService.mocks"
describe("DictionaryApiService", () => {
  let service: DictionaryApiService;

  beforeEach(() => {
    service = new DictionaryApiService();
  });


  it('should return response reduced', () => {
    const payload = ResponseApiWordArray
    const result = DictionaryApiService.reduceResponseArray(payload)
    expect(result.word).toBe('bird')
  })

})