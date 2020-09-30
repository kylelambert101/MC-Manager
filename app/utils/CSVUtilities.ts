import * as Papa from 'papaparse';
import songDataFields from '../constants/songDataFields.json';
import { getProperties } from './ObjectUtilities';

export type SongData = {
  id: number;
  active: boolean;
  date: string;
  day: string;
  title: string;
  new_file_name: string;
  original_file_name: string;
  original_file_path: string;
  file_extension: string;
  artist: string;
  album: string;
  album_artist: string;
  track_number: number;
  track_total: number;
  duration: number;
};

interface SongDataColumn {
  name: string;
  displayName: string;
  dataType: string;
}

export const expectedCSVColumnOrder: SongDataColumn[] = [
  songDataFields.ACTIVE,
  songDataFields.DATE,
  songDataFields.DAY,
  songDataFields.TITLE,
  songDataFields.NEW_FILE_NAME,
  songDataFields.ORIGINAL_FILE_NAME,
  songDataFields.ORIGINAL_FILE_PATH,
  songDataFields.FILE_EXTENSION,
  songDataFields.ARTIST,
  songDataFields.ALBUM,
  songDataFields.ALBUM_ARTIST,
  songDataFields.TRACK_NUMBER,
  songDataFields.TRACK_TOTAL,
  songDataFields.DURATION,
];

export const isCSVHeaderValid = (header: string[]): boolean => {
  // Check whether header string matches expected column order, ignoring case
  return (
    JSON.stringify(header).toLowerCase() ===
    JSON.stringify(
      expectedCSVColumnOrder.map((column) => column.name)
    ).toLowerCase()
  );
};

export const parseSongDataFromCSVRow = (
  csvRow: string[],
  rowNum: number
): SongData => {
  /*
   * I'm making a couple of assumptions here:
   * 1. Columns are in expected order per expectedCSVColumnOrder above
   * 2. Fields on SongData match up exactly to those column names
   *
   * Assuming those are true, I can build a new SongData object from the array,
   * using, for each index, the item from expectedCSVColumnOrder as the field name
   * and the item from csvRow as the value.
   */
  return csvRow.reduce(
    (song, value, index) => {
      const targetField = expectedCSVColumnOrder[index];
      // Parse values based on field dataType
      let cleanedValue;
      switch (targetField.dataType) {
        case 'number':
          cleanedValue = Number(value);
          break;
        case 'boolean':
          cleanedValue = Boolean(Number(value));
          break;
        default:
          cleanedValue = value;
      }
      return {
        ...song,
        [targetField.name]: cleanedValue,
      };
    },
    { id: rowNum } // initial value for "song"
  ) as SongData;
};

export const convertSongDataToCSVRow = (song: SongData): string => {
  // Translate song into an object with writeable CSV data by getting song's properties
  // and conditionally transforming or removing them
  const writeableSong = getProperties(song).reduce((wSong, typedProperty) => {
    // Unpack property information
    const { name: fieldName, dataType: fieldDataType } = typedProperty;
    // Get the value of this field from `song`
    const fieldValue = Reflect.get(song, typedProperty.name);

    // Transform the value based on field datatype
    let cleanedValue;
    switch (fieldDataType) {
      case 'number':
        // Replace "NaN" with "None" for number fields
        cleanedValue = Number.isNaN(fieldValue) ? 'None' : fieldValue;
        break;
      case 'boolean':
        // Convert boolean fields back to numbers
        cleanedValue = Number(fieldValue);
        break;
      default:
        cleanedValue = fieldValue;
    }

    // Only add this field to the writeableSong if it is an expected column
    return expectedCSVColumnOrder.some((column) => column.name === fieldName)
      ? {
          ...wSong,
          [typedProperty.name]: cleanedValue,
        }
      : wSong;
  }, {});

  // Convert writeableSong to a CSV string with no header
  return Papa.unparse([writeableSong], { header: false });
};

export const getDummySongData = (): SongData[] => {
  return [
    {
      id: 1,
      active: true,
      date: '2020-06-01',
      day: '2020-06-01',
      title: 'Item 1',
      new_file_name: 'item_1.txt',
      original_file_name: 'origname',
      original_file_path: 'origpath',
      file_extension: 'extension',
      artist: 'artist',
      album: 'album',
      album_artist: 'albumartist',
      track_number: 1,
      track_total: 10,
      duration: 100,
    },
    {
      id: 2,
      active: false,
      date: '2020-06-02',
      day: '2020-06-02',
      title: 'Item 2',
      new_file_name: 'item_2.txt',
      original_file_name: 'origname2',
      original_file_path: 'origpath2',
      file_extension: 'extension2',
      artist: 'artist2',
      album: 'album2',
      album_artist: 'albumartist2',
      track_number: 2,
      track_total: 10,
      duration: 200,
    },
  ];
};
