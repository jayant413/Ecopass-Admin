interface Segment {
  fromto: string;
  ticketPrice: number | null;
}

export function getForwardCombinations(arr: string[]): Segment[] {
  const combinations: Segment[] = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      combinations.push({
        fromto: arr[i] + "-" + arr[j],
        ticketPrice: null,
      });
    }
  }
  return combinations;
}

export function getBackwardCombinations(arr: string[]): Segment[] {
  const combinations: Segment[] = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      combinations.push({
        fromto: arr[i] + "-" + arr[j],
        ticketPrice: null,
      });
    }
  }
  return combinations;
}
