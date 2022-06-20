export const map = (
  array: number[],
  callback: (value: number) => number,
): number[] => {
  const newArray: number[] = [];
  for (const num of array) {
    newArray.push(callback(num));
  }
  return newArray;
};

export const generixMap = <T, U>(
  array: T[],
  callback: (value: T) => U,
): U[] => {
  const newArray: U[] = [];
  for (const elm of array) {
    newArray.push(callback(elm));
  }
  return newArray;
};

export const filterNotNull: <T>(array: (T | null)[]) => asserts array is T[] = (
  array,
) => {
  return array.filter((v) => v);
};
