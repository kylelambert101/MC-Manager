import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';
import { SongData } from '../../utils/CSVUtilities';
import { loadCSVFile } from '../../utils/FileUtilities';

const musicSlice = createSlice({
  name: 'music',
  initialState: { songs: [] as SongData[], isLoading: false },
  reducers: {
    requestCSVLoad: (state) => {
      state.isLoading = true;
    },
    receiveCSVLoad: (state, action: PayloadAction<SongData[]>) => {
      const songData = action.payload;
      state.isLoading = false;
      // If no song data comes through, don't change the state
      // -> May represent a "Cancel" of load file dialogue
      if (typeof songData !== 'undefined') {
        state.songs = songData;
      }
    },
    toggleInclude: (state, action: PayloadAction<SongData>) => {
      const targetSong = action.payload;
      state.songs = state.songs.map((s) =>
        s.id === targetSong.id ? { ...s, include: !s.include } : s
      );
    },
  },
});

export const {
  requestCSVLoad,
  receiveCSVLoad,
  toggleInclude,
} = musicSlice.actions;

/**
 * Load data from a music_collection csv file into the redux store
 * @param filePath Path to the csv file to load
 */
export const loadDataFromCSV = (filePath: string): AppThunk => {
  return async (dispatch) => {
    // Tell the store data is requested
    dispatch(requestCSVLoad());

    // Perform actual data loading
    const result = await loadCSVFile(filePath);

    // Tell the store data was received
    dispatch(receiveCSVLoad(result));
  };
};

export default musicSlice.reducer;

export const songs = (state: RootState) => state.music.songs;
