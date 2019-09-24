import api from './apiServices';

const getMoviesList = (id, page) => api.get("discover/movie?api_key=02c64ad2e3c5f83aaee9677f967b4327&language=en-US&with_genres=" + id + "&page=" + page);

export default {
    getMoviesList
};
