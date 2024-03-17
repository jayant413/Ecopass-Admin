export function getForwardCombinations(arr: string[]) {
  const combinations: { [key: string]: string } = {};
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      combinations[arr[i] + "-" + arr[j]] = "";
    }
  }
  return combinations;
}

export function getBackwardCombinations(arr: string[]) {
  const combinations: { [key: string]: string } = {};
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      combinations[arr[i] + "-" + arr[j]] = "";
    }
  }
  return combinations;
}
