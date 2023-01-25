import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SHAZAM_API_KEY } from './keys'

export const shazamApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', SHAZAM_API_KEY)
    
      return headers
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/track'}),
    getSongDetails: builder.query({ query: ({ songid }) => `/songs/get-details?key=${songid}` }),
    getArtistDetails: builder.query({ query: (artistId) => `/artists/get-summary?id=${artistId}` }),
    getSongsByListId: builder.query({ query: (listId) => `/charts/track?listId=${listId}` }),
    getSongsBySearch: builder.query({ query: (searchTerm) => `/search?term=${searchTerm}` }),
  }),
})

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetArtistDetailsQuery,
  useGetSongsByListIdQuery,
  useGetSongsBySearchQuery,
} = shazamApi