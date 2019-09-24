<template>
  <div>
    <b-navbar type="light" variant="light" sticky="true">
      <b-navbar-brand tag="h1" class="mb-0" href="#">Movie Rental</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown v-bind:text="category">
            <!-- <div v-for="data in movieGenre" :key="data.id">
            <b-dropdown-item>data.name</b-dropdown-item>
            </div>-->
            <b-dropdown-item
              href="#/Action"
              v-on:click="getMovies(28, 'Action', currentPage)"
            >Action</b-dropdown-item>
            <b-dropdown-item
              href="#/Adventure"
              v-on:click="getMovies(12, 'Adventure', currentPage)"
            >Adventure</b-dropdown-item>
            <b-dropdown-item
              href="#/Animation"
              v-on:click="getMovies(16, 'Animation', currentPage)"
            >Animation</b-dropdown-item>
            <b-dropdown-item
              href="#/Comedy"
              v-on:click="getMovies(35, 'Comedy', currentPage)"
            >Comedy</b-dropdown-item>
            <b-dropdown-item href="#/Crime" v-on:click="getMovies(80, 'Crime', currentPage)">Crime</b-dropdown-item>
            <b-dropdown-item
              href="#/Documentary"
              v-on:click="getMovies(99, 'Documentary', currentPage)"
            >Documentary</b-dropdown-item>
            <b-dropdown-item href="#/Drama" v-on:click="getMovies(18, 'Drama', currentPage)">Drama</b-dropdown-item>
            <b-dropdown-item
              href="#/Family"
              v-on:click="getMovies(10751, 'Family', currentPage)"
            >Family</b-dropdown-item>
            <b-dropdown-item
              href="#/Fantasy"
              v-on:click="getMovies(14, 'Fantasy', currentPage)"
            >Fantasy</b-dropdown-item>
            <b-dropdown-item
              href="#/History"
              v-on:click="getMovies(36, 'History', currentPage)"
            >History</b-dropdown-item>
            <b-dropdown-item
              href="#/Horror"
              v-on:click="getMovies(27, 'Horror', currentPage)"
            >Horror</b-dropdown-item>
            <b-dropdown-item
              href="#/Music"
              v-on:click="getMovies(10402, 'Music', currentPage)"
            >Music</b-dropdown-item>
            <b-dropdown-item
              href="#/Mystery"
              v-on:click="getMovies(9648, 'Mystery', currentPage)"
            >Mystery</b-dropdown-item>
            <b-dropdown-item
              href="#/Romance"
              v-on:click="getMovies(10749, 'Romance', currentPage)"
            >Romance</b-dropdown-item>
            <b-dropdown-item
              href="#/Science-Fiction"
              v-on:click="getMovies(878, 'Science Fiction', currentPage)"
            >Science Fiction</b-dropdown-item>
            <b-dropdown-item
              href="#/TV-Movies"
              v-on:click="getMovies(10770, 'TV Movies', currentPage)"
            >TV Movie</b-dropdown-item>
            <b-dropdown-item
              href="#/Thriller"
              v-on:click="getMovies(53, 'Thriller', currentPage)"
            >Thriller</b-dropdown-item>
            <b-dropdown-item href="#/War" v-on:click="getMovies(10752, 'War', currentPage)">War</b-dropdown-item>
            <b-dropdown-item
              href="#/Western"
              v-on:click="getMovies(37, 'Western', currentPage)"
            >Western</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item href="#" @click="navigate('order')">Order List</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item right>
            <b-button variant="outline-primary" v-on:click="orderButton()">Order a Movie</b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div>
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="2500"
        controls
        indicators
        background="#ababab"
        fade
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <b-carousel-slide
          img-src="https://image.tmdb.org/t/p/original/vVpEOvdxVBP2aV166j5Xlvb5Cdc.jpg"
        />
        <b-carousel-slide
          img-src="https://image.tmdb.org/t/p/original/6ihyJWRLEngSnlW8HKeDOH3AfSQ.jpg"
        />
        <b-carousel-slide
          img-src="https://image.tmdb.org/t/p/original/hpgda6P9GutvdkDX5MUJ92QG9aj.jpg"
        />
        <b-carousel-slide
          img-src="https://image.tmdb.org/t/p/original/1TUg5pO1VZ4B0Q1amk3OlXvlpXV.jpg"
        />
      </b-carousel>
    </div>

    <div style="margin-left:50px; margin-right:50px; margin-top:20px" id="parent">
      <!-- <b-card>
      <b-table
        ref="movieList"
        id="movie-list"
        responsive
        :outline=true
        striped
        hover
        :current-page="currentPage"
        :per-page="perPage"
        :items="movieList"
        :fixed=false
        :fields="fields"
        :filter="filter">
      </b-table>
      </b-card>-->

      <h1>{{category}}</h1>
      <b-row>
        <div v-for="data in movieList" :key="data.id">
          <div style="margin-left:50px; margin-right:50px; margin-top:30px; margin-bottom:50px;">
            <b-img v-bind:src="url + data.poster_path" v-on:click="onMovieClicked(data)" />
          </div>
        </div>
      </b-row>
      <b-pagination
        @input="getMovies(selectedGenre, category, currentPage)"
        v-model="currentPage"
        :total-rows="totalRows"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
      ></b-pagination>
    </div>

    <b-modal
      hide-footer="true"
      v-model="showModal"
      id="modal-center"
      centered
      v-bind:title="movieItem.title"
    >
      <b-row>
        <b-col>
          <b-img v-bind:src="url + movieItem.poster_path" />
        </b-col>
        <b-col>
          <p class="my-1">{{movieItem.overview}}</p>
        </b-col>
      </b-row>
      <b-row></b-row>
    </b-modal>

    <b-modal id="orderModal" v-model="orderModal" title="Order a Movie" @ok="orderMovie">
      <b-form-group
        id="input-group-1"
        label="Movie Title:"
        label-for="input-1"
        description="Movie name pls!"
      >
        <b-form-input
          id="input-1"
          v-model="form.movieTitle"
          type="text"
          required
          placeholder="Enter movie title"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Customer Name:"
        label-for="input-2"
        description="Who order dis!"
      >
        <b-form-input
          id="input-2"
          v-model="form.customerName"
          type="text"
          required
          placeholder="Enter customer name"
        ></b-form-input>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import movieListByGenre from "@/services/movieListByGenre";
import getAllGenre from "@/services/getGenre";
import { METHODS } from "http";
import axios from "axios";

function getMovies(id, category, page) {
  movieListByGenre
    .getMoviesList(id, page)
    .then(res => {
      this.category = category;
      this.selectedGenre = id;
      console.log(res.data.results);
      this.movieList = res.data.results;
      this.totalRows = res.data.total_results;
      this.totalPage = res.data.total_pages;
      document.title = "Movie - " + this.category;
    })
    .catch(err => {
      console.log(err);
    });
}

function getGenre() {
  getAllGenre
    .getMovieGenre()
    .then(res => {
      console.log(res.data.genres.length);
      this.movieGenre = res.data.genres;
    })
    .catch(err => {
      console.log(err);
    });
}

function onMovieClicked(data) {
  this.showModal = !this.showModal;
  this.movieItem = data;
}

function onSlideStart(slide) {
  this.sliding = true;
}

function onSlideEnd(slide) {
  this.sliding = false;
}

function navigate(path) {
  this.$router.push({ name: path });
  this.closeMenu();
}

function orderButton() {
  this.orderModal = true;
}

function orderMovie() {
  var swal = this.$swal;
  swal({
    title: 'Ordering Movie ..',
    allowOutsideClick: false,
    showConfirmButton: false,
    width: 400,
    onOpen: () => {
      swal.showLoading();
      axios.post(
        'https://my-json-server.typicode.com/myoganugraha/demo/order/',{
          title: this.form.movieTitle,
          customer_name: this.form.customerName,
        })
      .then((response) => {
        console.log(response);
        swal.close();
        swal({
          width: 400,
          type: "success",
          title: 'Thank You ' + response.data.customer_name + ', Your Order ID #' + response.data.id,
          text: 'Success Order ' + response.data.title + ' Movie '
        })
      }).catch((error) => {
        swal.close();
        swal({
          width: 400,
          type: "error",
          title: 'Error',
          text: 'Failed to Order a Movie :('
        })
      })
    }
  })
}

export default {
  data() {
    return {
      movieGenre: [],
      movieList: [],
      movieItem: [],
      slide: 0,
      selectedGenre: 0,
      showModal: false,
      currentPage: 1,
      totalRows: 1,
      totalPage: 1,
      filter: null,
      category: "",
      orderModal: false,
      url: "http://image.tmdb.org/t/p/w185",
      form: {
        movieTitle: "",
        customerName: ""
      }
    };
  },
  components: {
    // fab
  },
  methods: {
    getMovies,
    getGenre,
    onMovieClicked,
    onSlideStart,
    onSlideEnd,
    navigate,
    orderButton,
    orderMovie
  },
  mounted() {},
  created() {
    // getMovies(28, 'Action', this.currentPage)console.log(this.$route.params);
    if (this.$route.params.genreID == null) {
      this.getMovies(28, "Action", this.currentPage);
      this.category = "Action";
    } else {
      this.getMovies(
        this.$route.params.genreID,
        this.$route.params.category,
        this.currentPage
      );
      this.category = this.$route.params.category;
    }
  },
  components: {}
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
