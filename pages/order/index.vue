<template>
    <div>
        <b-navbar type="light" variant="light" sticky=true>
            <b-navbar-brand tag="h1" class="mb-0" href="#">Movie Rental</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item-dropdown v-bind:text="category">
                <!-- <div v-for="data in movieGenre" :key="data.id">
                    <b-dropdown-item>data.name</b-dropdown-item>
                </div> -->
                <b-dropdown-item v-on:click="navigateToGenre(28, 'Action')">Action</b-dropdown-item>
                <b-dropdown-item v-on:click="navigateToGenre(12, 'Adventure')">Adventure</b-dropdown-item>
                <b-dropdown-item v-on:click="navigateToGenre(16, 'Animation')">Animation</b-dropdown-item>
                <b-dropdown-item v-on:click="navigateToGenre(35, 'Comedy')">Comedy</b-dropdown-item>
                <b-dropdown-item v-on:click="navigateToGenre(80, 'Crime')">Crime</b-dropdown-item>
                <b-dropdown-item v-on:click="navigateToGenre(99, 'Documentary')">Documentary</b-dropdown-item>
                <b-dropdown-item v-on:click="navigateToGenre(18, 'Drama')">Drama</b-dropdown-item>
                <b-dropdown-item v-on:click="navigateToGenre(10751, 'Family')">Family</b-dropdown-item>
                <b-dropdown-item v-on:click="navigateToGenre(14, 'Fantasy')">Fantasy</b-dropdown-item>
                <b-dropdown-item v-on:click="navigateToGenre(36, 'History')">History</b-dropdown-item>
                <b-dropdown-item v-on:click="navigateToGenre(27, 'Horror')">Horror</b-dropdown-item>
                <b-dropdown-item v-on:click="navigateToGenre(10402, 'Music')">Music</b-dropdown-item>
                <b-dropdown-item v-on:click="navigateToGenre(9648, 'Mystery')">Mystery</b-dropdown-item>
                <b-dropdown-item v-on:click="navigateToGenre(10749, 'Romance')">Romance</b-dropdown-item>
                <b-dropdown-item v-on:click="navigateToGenre(878, 'Science Fiction')">Science Fiction</b-dropdown-item>
                <b-dropdown-item v-on:click="navigateToGenre(10770, 'TV Movies')">TV Movie</b-dropdown-item>
                <b-dropdown-item v-on:click="navigateToGenre(53, 'Thriller')">Thriller</b-dropdown-item>
                <b-dropdown-item v-on:click="navigateToGenre(10752, 'War')">War</b-dropdown-item>
                <b-dropdown-item v-on:click="navigateToGenre(37, 'Western')">Western</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item href="#" @click="navigate('order')">
                Order List
                </b-nav-item>
            </b-navbar-nav>

            
            </b-collapse>
        </b-navbar>

        <div style="margin-left:50px; margin-right:50px; margin-top:30px; margin-bottom:50px;">
            <b-card>
                <b-row>
                    <b-col md="2" class="my-1">
                        <b-form-group label-cols-sm="5" label="Show" class="mb-0">
                        <b-row>
                            <b-form-select v-model="perPage" :options="pageOptions"/>
                        </b-row>
                        </b-form-group>
                    </b-col>
                    <b-col md6/>
                </b-row>
                <b-row class="mb-2"/>

                <b-table
                id="order-list-table"
                    responsive
                    :outlined=true
                    :fields="fields"
                    hover
                    :busy="isTableBusy"
                    :current-page="currentPage"
                    :per-page="perPage"
                    :items="data"
                    :fixed=true>
                    <template v-slot:table-busy>
                        <div class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>Loading...</strong>
                        </div>
                    </template>

                    <template v-slot:cell(actions)="row">
                        <b-button 
                            size="sm" 
                            variant="outline-primary"
                            @click="editOrderData(row.item)">
                        Edit Order
                        </b-button> 
                    </template>
                </b-table>
                <b-row>
                    <b-col md="8"/>
                    <b-col md="3" class="my-1">
                        <b-pagination
                        v-model="currentPage"
                        :total-rows="totalRow"
                        :per-page="perPage"
                        class="my-0"
                        first-text="First"
                        prev-text="Previous"
                        next-text="Next"
                        last-text="Last"
                        ></b-pagination>
                    </b-col>
                </b-row>
            </b-card>
        </div>

        <b-modal
            id="editOrderModal"
            v-model="editModal"
            v-bind:title=" 'Edit Order #'+ orderData.id"
            @ok="editConfirmation(orderData.id)">
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
import { METHODS } from 'http';
import axios from "axios";
import VueSweetalert2 from 'vue-sweetalert2';

function navigate(path) {
    this.$router.push({name: path});
}

function navigateToGenre(genreID, category) {
    console.log(genreID + ' ' + category);
    this.$router.push({name: 'index', params: { genreID: genreID, category: category}})
}

function getData() {
    this.isTableBusy = !this.isTableBusy;
    axios.get('https://my-json-server.typicode.com/myoganugraha/demo/order/')
    .then((res) => {
        console.log(res);
        this.data = res.data;
        this.totalRow = this.data.length;
        this.isTableBusy = !this.isTableBusy;
    }).catch((err) => {
        console.log(err);
    })
}

function editOrderData(data) {
    this.orderData = data;
    this.editModal = true;
    console.log(this.orderData);
    this.form.movieTitle = this.orderData.title;
    this.form.customerName = this.orderData.customer_name;
}

function editConfirmation(id) {
    var swal = this.$swal;
    swal({
        title: 'Sending Data..',
        allowOutsideClick: false,
        showConfirmButton: false,
        width: 400,
        onOpen: () => {
            swal.showLoading();
            axios.put('https://my-json-server.typicode.com/myoganugraha/demo/order/' + id)
            .then((response) => {
                console.log(response);
                swal.close();
                swal({
                    width: 400,
                    type: "success",
                    title: 'Success',
                    text: 'Sucess Edit Data #' + id,
                })
            }).catch((error) => {
                swal.close();
                swal({
                    width: 400,
                    type: "error",
                    title: 'Error',
                    text: 'Failed to Edit Data #' + id,
                })
            })
        }
    })
}

export default {
    data() {
        return {
            currentPage: 1,
            category: 'Category',
            fields: [
                {key: 'id', label: "ID", sortable: true}, 
                {key: 'title', label: "Movie Title"}, 
                {key: 'customer_name', label: 'Customer Name'},
                {key: 'actions', label: 'Actions'}],
            data: [],
            editModal: false,
            confirmationModal: false,
            orderData:[],
            perPage: 5,
            isTableBusy: false,
            pageOptions: [5, 10, 20, 30],
            totalRow: 1,
            form: {
                movieTitle: '',
                customerName: ''
            }
        };
    },
    methods: {
        navigate,
        navigateToGenre,
        getData,
        editOrderData,
        editConfirmation,
    },
    created() {
        this.getData();
    }
}
</script>