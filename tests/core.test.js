import {decribe, test, it, expect, describe, beforeEach, beforeAll, afterEach, afterAll} from 'vitest';
import { canDrive, fetchData, isPriceInRange, isValidUsername, validateUserInput } from '../src/core';

describe('test suite', () => {
    it('test case', () => {
        const result = 'The requested file was not found'
        // Loose to general
        expect(result).toBeDefined()
        // Tight too specific
        // expect(result).toBe()
    })
})


describe('validate user input', () => {
    it('should return success if given valid input', () => {
        expect(validateUserInput('mosh', 42)).toMatch(/success/i)
    })

    it('should return an error if username is not a string', () => {
        expect(validateUserInput(1, 42)).toMatch(/invalid/i)
    })

    it('should return an error if username is less than 3 characters', () => {
        expect(validateUserInput('no', 42)).toMatch(/invalid/i)
    })

    it('should return an error if username is longer than 256 characters', () => {
        expect(validateUserInput('no'.repeat(256), 42)).toMatch(/invalid/i)
    })

    it('should return an error if age is not a number', () => {
        expect(validateUserInput('mosh', '33')).toMatch(/invalid/i)
    })

    it('should return an error if age is less than 18', () => {
        expect(validateUserInput('mosh', 17)).toMatch(/invalid/i)
    })

    it('should return an error if age is greater than 100', () => {
        expect(validateUserInput('mosh', 101)).toMatch(/invalid/i)
    })

    it('should return an error if both username and age are invalid', () => {
        expect(validateUserInput('', 29)).toMatch(/invalid username/i)
        expect(validateUserInput('mosh', 0)).toMatch(/invalid age/i)
    })
})

describe('isPriceInRange', () => {
    it('should return false when price is outside the range', () => {
        expect(isPriceInRange(-10, 0, 100)).toBe(false)
        expect(isPriceInRange(200, 0, 100)).toBe(false)
    })

    it('should return false when price is equal to the min or the max', () => {
        expect(isPriceInRange(0, 0, 100)).toBe(true)
        expect(isPriceInRange(100, 0, 100)).toBe(true)
    })

    it('should return true when price is within the range', () => {
        expect(isPriceInRange(50, 0, 100)).toBe(true)
        expect(isPriceInRange(100, 0, 100)).toBe(true)
    })
})

describe('isValidUsername', () => {
    it('should return false if length is less than 5', () => {
        expect(isValidUsername('pa')).toBe(false)
    })

    it('should return false if length is more than 15', () => {
        expect(isValidUsername('pafkhdsfhjkfdhdbdfskbh')).toBe(false)
    })

    it('should return true if username is within the length', () => {
        expect(isValidUsername('padfdfd')).toBe(true)
    })

})

describe('canDrive', () => {
    it.each([
        {age: 15, country: 'US', result: false},
        {age: 16, country: 'US', result: true},
        {age: 17, country: 'US', result: true},
        {age: 16, country: 'UK', result: false},
        {age: 17, country: 'UK', result: true},
        {age: 18, country: 'UK', result: true}
    ])('should return $result for $age, $country', ({age, country, result}) => {
        expect(canDrive(age, country)).toBe(result)
    })
})

describe('fetchData', () => {
    it('should return an array of numbers', async () => {
        try {
            const result = await fetchData()
            expect(Array.isArray(result)).toBe(true)
            expect(result.length).toBeGreaterThan(0)
        } catch(error) {
            expect(error).toHaveProperty('reason')
            expect(error.reason).toMatch(/fail/i)
        }
      
        
    })
})

describe('testSuite', () => {
    beforeAll(() => {
        console.log("Called")
    })

    afterEach(() => {
        console.log("After each")
    })

    afterAll(() => {
        console.log("After all called")
    })
    it('test case 1', () => {

    })

    it('test case 2', () => {
        
    })
})