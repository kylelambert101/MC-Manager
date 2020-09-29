import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';
import { SongData } from '../../utils/CSVUtilities';
import { loadCSVFile, selectFileToLoad } from '../../utils/FileUtilities';

const musicSlice = createSlice({
  name: 'music',
  initialState: {
    isLoading: false,
    cachedSongs: [] as SongData[],
    songs: [] as SongData[],
    saveFilePath: '',
  },
  reducers: {
    beginCSVLoad: (state) => {
      state.isLoading = true;
    },
    receiveCSVLoad: (state, action: PayloadAction<SongData[]>) => {
      const songData = action.payload;
      state.isLoading = false;
      // If no song data comes through, don't change the state
      // -> May represent a "Cancel" of load file dialogue
      if (typeof songData !== 'undefined') {
        state.songs = songData;
        state.cachedSongs = songData;
      }
    },
    cancelCSVLoad: (state) => {
      state.isLoading = false;
    },
    toggleActive: (state, action: PayloadAction<SongData>) => {
      const targetSong = action.payload;
      state.songs = state.songs.map((s) =>
        s.id === targetSong.id ? { ...s, active: !s.active } : s
      );
    },
    resetSongsFromCached: (state) => {
      state.songs = state.cachedSongs;
    },
    overwriteCachedSongs: (state) => {
      state.cachedSongs = state.songs;
    },
    setSaveFilePath: (state, action: PayloadAction<string>) => {
      state.saveFilePath = action.payload;
    },
  },
});

// Actions for use in thunks below
const { beginCSVLoad, receiveCSVLoad, cancelCSVLoad } = musicSlice.actions;

// Actions exported for use elsewhere
export const {
  toggleActive,
  resetSongsFromCached,
  overwriteCachedSongs,
  setSaveFilePath,
} = musicSlice.actions;

/**
 * Load data from a music_collection csv file into the redux store
 */
export const loadDataFromCSV = (): AppThunk => {
  return async (dispatch) => {
    // Tell the store data will be loaded
    dispatch(beginCSVLoad());

    // Open the file dialogue
    const filePath = await selectFileToLoad();
    if (typeof filePath === 'undefined') {
      // User cancelled the open dialogue. Cancel load
      console.log('No file selected in open dialogue. Abort load process.');
      dispatch(cancelCSVLoad());
      return;
    }

    // Save the selected file path
    dispatch(setSaveFilePath(filePath));

    // Perform actual data loading
    const result = await loadCSVFile(filePath);

    // Tell the store data was received
    dispatch(receiveCSVLoad(result));
  };
};

export default musicSlice.reducer;

export const isLoadingSelector = (state: RootState) => state.music.isLoading;
export const songsSelector = (state: RootState) => state.music.songs;
export const cachedSongsSelector = (state: RootState) =>
  state.music.cachedSongs;
export const saveFilePathSelector = (state: RootState) =>
  state.music.saveFilePath;
