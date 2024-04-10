import {decribe, test, it, expect, describe} from 'vitest';
import { calculateAverage, factorial, fizzBuzz, max } from '../src/intro';

describe('max', () => {
    it('should return the first argument if it is greater', () => {
        // AAA
        // Arrange: Turn on TV
        // Act: Press the power button
        // Assert: Verify TV is off
        const a = 2;
        const b = 1;
        
        const result = max(a, b)
       
        expect(result).toBe(2)
    })

    it('should return the second argument if it is greater', () => {
        expect(max(1,2)).toBe(2)
    })

    it('should return the first arguments if arguments are equal', () => {
        expect(max(2, 1)).toBe(2)
    })
})

describe("fizzbuzz", () => {
    it('should return FizzBuzz if n % 3===0 and n % 5 === 0', () => {
        const n = 15;

        const result = fizzBuzz(n)

        expect(result).toBe('FizzBuzz')
    })

    it('should return Fizz if n % 3===0', () => {
        const n = 3;

        const result = fizzBuzz(n)

        expect(result).toBe('Fizz')
    })

    it('should return Buzz if n % 5===0', () => {
        const n = 5;

        const result = fizzBuzz(n)

        expect(result).toBe('Buzz')
    })
})

describe('calculate Average', () => {
    it('Should return NaN if given an empty array', () => {
        expect(calculateAverage([])).toBe(NaN)
    })

    it('Should calculate the average with a single element', () => {
        expect(calculateAverage([1])).toBe(1)
    })

    it('Should calculate the average of an array with two elements', () => {
        expect(calculateAverage([1, 2])).toBe(1.5)
    })

    it('Should calculate the average of an array with three elements', () => {
        expect(calculateAverage([1, 2, 3])).toBe(2)
    })
})

describe('factorial', () => {
    it('should successfully calculate factorial', () => {
        expect(factorial(5)).toBe(120)
    })

    it('should return 1 if value is 1', () => {
        expect(factorial(1)).toBe(1)
    })

    it('should return undefined if value is negative', () => {
        expect(factorial(-1)).toBe(undefined)
    })
})