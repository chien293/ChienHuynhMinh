
// Complexity: O(1)
// Efficiency: O(1)
function sum_to_n_a(n: number): number {
  return (n * (n + 1)) / 2;
}

// Complexity: O(n)
// Efficiency: O(1)
function sum_to_n_b(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Complexity: O(n)
// Efficiency: O(n)
function sum_to_n_c(n: number): number {
  if (n === 1) {
    return 1;
  }
  return n + sum_to_n_c(n - 1);
}

