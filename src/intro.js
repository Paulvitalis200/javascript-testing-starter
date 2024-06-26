// Lesson: Writing your first tests
export function max(a, b) {
  return (a > b) ? a: b
}

// Exercise
export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return 'FizzBuzz';
  if (n % 3 === 0) return 'Fizz';
  if (n % 5 === 0) return 'Buzz';
  return n.toString();
}


export function calculateAverage(numbers) {
  if (numbers.length == 0) return NaN
  const sum = numbers.reduce((sum, curr) => sum + curr, 0)

  return sum / numbers.length
}

export function factorial(n) {
  if (n < 0) return undefined
  if (n == 1 || n == 0) return 1
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i
  }

  return result
}
console.log(factorial(5))