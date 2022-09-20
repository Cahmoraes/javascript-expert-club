import { describe, test, jest, expect, beforeEach } from '@jest/globals'
import { RickAndMortyUSA } from '../../src/business/integrations/rickAndMortyUSA.js'
import { RickAndMortyUSAAdapter } from '../../src/business/adapters/rickAndMortyUSAAdapter'

describe('#RickAndMortyUSAAdapter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('#getCharacters should be an adapter for RickAndMortyUSA.getCharactersJSON', async () => {
    const brlIntegration = jest
      .spyOn(RickAndMortyUSA, RickAndMortyUSA.getCharactersFromXML.name)
      .mockResolvedValue([])

    const result = await RickAndMortyUSAAdapter.getCharacters()

    expect(result).toEqual([])
    expect(brlIntegration).toHaveBeenCalled()
  })
})
