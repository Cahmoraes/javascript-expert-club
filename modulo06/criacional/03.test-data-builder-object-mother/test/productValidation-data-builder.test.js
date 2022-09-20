const { expect } = require('chai')
const { it, describe } = require('mocha')
const { productValidator } = require('../src')
const ProductDataBuilder = require('./model/productDataBuilder')

describe('Test Data Builder', () => {
  it("shouldn't return error with invalid product", () => {
    const product = ProductDataBuilder.aProduct().build()
    const result = productValidator(product)

    const expected = {
      errors: [],
      result: true,
    }

    expect(result).to.be.deep.equals(expected)
  })

  describe('Product Validation Rules', () => {
    it('should return an object error when creating a Product with invalid id', () => {
      const product = ProductDataBuilder.aProduct().withInvalidId().build()
      const result = productValidator(product)

      const expected = {
        errors: [
          `id: invalid length, current [${product.id}] expected to be between 2 and 20`,
        ],
        result: false,
      }

      expect(result).to.be.deep.equals(expected)
    })

    it('should return an object error when creating a Product with invalid name', () => {
      const product = ProductDataBuilder.aProduct().withInvalidName().build()
      const result = productValidator(product)

      const expected = {
        errors: [
          'name: invalid value, current [abc123] expected to have only words',
        ],
        result: false,
      }

      expect(result).to.be.deep.equals(expected)
    })

    it('should return an object error when creating a Product with invalid price', () => {
      const product = ProductDataBuilder.aProduct().withInvalidPrice().build()
      const result = productValidator(product)

      const expected = {
        errors: [
          'price: invalid value, current [${product.price}] expected to be between 1 and 1000',
        ],
        result: false,
      }

      expect(result).to.be.deep.equals(expected)
    })

    it('should return an object error when creating a Product with invalid category', () => {
      const product = ProductDataBuilder.aProduct()
        .withInvalidCategory()
        .build()
      const result = productValidator(product)

      const expected = {
        errors: [
          'category: invalid value, current [${product.category}] expected to be either electronic or organic',
        ],
        result: false,
      }

      expect(result).to.be.deep.equals(expected)
    })
  })
})
