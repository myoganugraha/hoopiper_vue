import api from './apiServices';

const getMovieGenre = () => api.get("genre/movie/list?api_key=02c64ad2e3c5f83aaee9677f967b4327&language=en-US")

export default {
    getMovieGenre
}