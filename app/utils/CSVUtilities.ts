/* NOTE THESE FIELDS MUST MATCH UP TO EXPECTEDCSVCOLUMNORDER BELOW */
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

const expectedCSVColumnOrder = [
  'active',
  'date',
  'day',
  'title',
  'new_file_name',
  'original_file_name',
  'original_file_path',
  'file_extension',
  'artist',
  'album',
  'album_artist',
  'track_number',
  'track_total',
  'duration',
];

export const isCSVHeaderValid = (header: string[]): boolean => {
  // Check whether header string matches expected column order, ignoring case
  return (
    JSON.stringify(header).toLowerCase() ===
    JSON.stringify(expectedCSVColumnOrder).toLowerCase()
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
      // Optionally parse value as a different type for some fields
      // This cleanup should maybe be in its own function...
      let cleanedValue;
      switch (targetField) {
        // case 'date':
        //   cleanedValue = new Date(value);
        //   break;
        case 'track_number':
          cleanedValue = Number(value);
          break;
        case 'track_total':
          cleanedValue = Number(value);
          break;
        case 'duration':
          cleanedValue = Number(value);
          break;
        case 'active':
          cleanedValue = Boolean(Number(value));
          break;
        default:
          cleanedValue = value;
      }
      return {
        ...song,
        [targetField]: cleanedValue,
      };
    },
    { id: rowNum } // initial value for "song"
  ) as SongData;
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
