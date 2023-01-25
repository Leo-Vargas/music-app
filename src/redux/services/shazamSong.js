import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SHAZAM_SONG_API_KEY } from './keys'


export const shazamSongApi = createApi({
  reducerPath: 'shazamSongApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-song-recognizer.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', SHAZAM_SONG_API_KEY)
    
      return headers
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/top_country_tracks?country_code=US&limit=20'}),
    getSongDetails: builder.query({ query: ({ songid }) => `/track_about?track_id=${songid}`}),
    getSongRelated: builder.query({ query: ({ songid }) => `/related_tracks?track_id=${songid}` }),
    getSongsByCountry: builder.query({ query: (countryCode) => `/top_country_tracks?country_code=${countryCode}&limit=20`}),
  }),
})

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetSongsByCountryQuery,
} = shazamSongApi