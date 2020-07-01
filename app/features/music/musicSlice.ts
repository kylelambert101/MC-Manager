import { createSlice } from '@reduxjs/toolkit';
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
    receiveCSVLoad: (state, action) => {
      const { songData } = action.payload;
      state.isLoading = false;
      // If no song data comes through, don't change the state
      // -> May represent a "Cancel" of load file dialogue
      if (typeof songData !== 'undefined') {
        state.songs = songData;
      }
    },
  },
});

export const { requestCSVLoad, receiveCSVLoad } = musicSlice.actions;

export const loadDataFromCSV = (filePath: string): AppThunk => {
  return async (dispatch) => {
    // Tell the store data is requested
    dispatch(requestCSVLoad());

    // Perform actual data loading
    const result = await loadCSVFile(filePath);

    // Tell the store data was received
    dispatch(receiveCSVLoad({ songData: result }));
  };
};

export default musicSlice.reducer;

export const songs = (state: RootState) => state.music.songs;
