import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import path from 'path';
import { LineData, ReadFileResult } from 'src/interfaces/file.interface';
import { fileURLToPath } from 'url';

@Injectable()
export class FileService {
  // async readFile(fileName: string): Promise<ReadFileResult> {
  // const filePath = fileURLToPath(import.meta.url);
  // const fileDir = path.dirname(filePath);
  // const dataFile = path.join(fileDir, `../../../public/${fileName}`);
  // const data = await readFile(dataFile, { encoding: 'utf8' });
  // const readData: LineData[] = data.split('\n').map((line) => {
  //   const lineData = {};
  //   line.split(',').forEach((data) => (lineData[data] = data));
  //   return {
  //     lineData: lineData,
  //   };
  // });
  // return { data: readData };
  // }
}
