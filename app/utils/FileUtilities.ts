import { remote } from 'electron';
import * as Papa from 'papaparse';
import fs from 'fs';
// import detectCharacterEncoding from 'detect-character-encoding';
import {
  SongData,
  parseSongDataFromCSVRow,
  isCSVHeaderValid,
} from './CSVUtilities';

export const selectFileToLoad = async (): Promise<string | undefined> => {
  // Use remote dialog because this won't run from main thread
  const { filePaths } = await remote.dialog.showOpenDialog({
    // For other properties see:
    // https://www.electronjs.org/docs/api/dialog#dialogshowopendialogbrowserwindow-options
    properties: ['openFile'],
  });

  return filePaths[0] || undefined;
};

const getFileContents = (filePath: string): string | undefined => {
  console.log(`Opening file: "${filePath}"`);

  const fileBuffer = fs.readFileSync(filePath);

  // detectCharacterEncoding used native module that was difficult to manage in electron
  // const detectedEncoding = detectCharacterEncoding(fileBuffer)?.encoding;
  // if (detectedEncoding) {
  //   console.log(`Detected encoding "${detectedEncoding}"`);
  //   // If encoding detection worked
  //   if (detectedEncoding.startsWith('ISO')) {
  //     encoding = 'ascii';
  //     console.log(`Remapped encoding "${detectedEncoding}" to "${encoding}"`);
  //   } else {
  //     encoding = detectedEncoding;
  //   }
  // } else {
  //   // If encoding detection didn't work
  //   encoding = 'utf-8';
  //   console.log(`No encoding detected. Using default "${encoding}".`);
  // }
  // For now use ascii because that's how my collection file is encoded
  const encoding = 'ascii';
  let results;
  try {
    results = fs.readFileSync(filePath, encoding);
  } catch (err) {
    console.log(
      `Tried reading file "${filePath}" with encoding "${encoding}". Resulted in error: ${err.message}`
    );
    throw err;
  }
  return results;
};

// eslint-disable-next-line import/prefer-default-export
export const loadCSVFile = async (filePath: string): Promise<SongData[]> => {
  const data = Papa.parse(getFileContents(filePath))?.data || [];
  console.log('Retrieved Data');

  // First row is the header row
  const [header, ...datarows] = data;

  // Check that header rows are in the right position before processing
  if (!isCSVHeaderValid(header)) {
    throw new Error('CSV header columns were not in the expected format');
  }

  // Pop empty lines at the end of the CSV, if any
  while (datarows.length > 0 && datarows[datarows.length - 1].length === 1) {
    datarows.pop();
  }

  // If there's no data, that's a problem.
  if (!datarows || datarows.length === 0) {
    throw new Error('No data found in CSV file');
  }

  return datarows.map((row: string[]) => parseSongDataFromCSVRow(row));
};
