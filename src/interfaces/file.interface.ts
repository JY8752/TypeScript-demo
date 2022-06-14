export type ReadFileResult = {
  data: LineData[];
};

export type LineData = {
  lineData: { [key: string]: string };
};
