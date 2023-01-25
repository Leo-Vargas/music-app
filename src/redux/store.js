import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { shazamApi } from './services/shazam';
import { shazamSongApi } from './services/shazamSong';

export const store = configureStore({
  reducer: {
    [shazamApi.reducerPath]: shazamApi.reducer,
    [shazamSongApi.reducerPath]: shazamSongApi.reducer,
    player: playerReducer,
  }, 
  
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamApi.middleware, shazamSongApi.middleware), 
});
