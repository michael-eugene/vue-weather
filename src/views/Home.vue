<template>
  <div class="container" id="home">
    <div class="weather-wrap" v-show="typeof this.weather.weather != 'undefined'">
      <div class="location">
        <p>{{this.weather.ob_time}}</p>
        <p class="title-1">{{this.weather.city_name + ', '}}{{this.weather.country_code}}</p>
        <p>{{ this.description }}</p>
      </div>
      <div class="temperature">
        <p class="big-txt">{{Math.round(this.weather.temp) + '°'}}</p>
      </div>
    </div>

    <!-- FOOTER -->
    <footer class="footer" :class="isOpen ? 'open' : ''">
      <div class="footer__top">
        <x-icon class="footer__top-button" @click="isOpen = !isOpen" v-if="isOpen"></x-icon>
        <menu-icon class="footer__top-button" @click="isOpen = !isOpen" v-else></menu-icon>
      </div>
      <div class="footer__bottom">
        <div class="footer__bottom-search">
          <!-- <input type="text" v-model="query.address" placeholder="Enter a city..." id="search" /> -->

          <input
            type="search"
            id="address"
            class="form-control"
            placeholder="Enter a city..."
            v-model.lazy="this.cityQuery"
          />

          <p>
            Selected:
            <strong id="address-value">none</strong>
          </p>
        </div>
        <hr />
        <p class="title-1">Recent Searches</p>
        <div class="footer__bottom-locations" v-for="(saved, index) in savedLocations" :key="index">
          <div class="location-wrap">
            <div class="time-loaction">
              <p>{{saved.time}}</p>
              <p>{{saved.location}}</p>
            </div>
            <div class="temperature">
              <p>{{saved.temperature}}­</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import places from "places.js";
import {MenuIcon, XIcon} from 'vue-feather-icons'

export default {
  name: "Home",
  components: {
    MenuIcon,
    XIcon
  },
  data() {
    return {
      api_key: "376b851225d04d3caad51a9296f2d742",
      base_url: "https://api.weatherbit.io/v2.0/current?city=",
      cityQuery: "Lagos, NG",
      weather: {},
      description: "",
      isOpen: false,
      cityAddress: "",
      savedLocations: [
        {
          time: "time",
          location: "location",
          temperature: "temp",
        },
        {
          time: "time",
          location: "location",
          temperature: "temp",
        },
      ],
    };
  },
  methods: {
    getWeather() {
      fetch(`${this.base_url}${this.cityQuery}&key=${this.api_key}`)
        .then((res) => res.json())
        .then((data) => {
          this.weather = data.data[0];
          this.description = data.data[0].weather.description;
          console.log(this.weather);
        });
    },
  },
  created() {
    // this.$store.methods.getWeather()
    fetch(`${this.base_url}${this.cityQuery}&key=${this.api_key}`)
      .then((res) => res.json())
      .then((data) => {
        this.weather = data.data[0];
        this.description = data.data[0].weather.description;
        console.log(this.weather);
      });
  },
  mounted() {
    let placesAutocomplete = places({
      appId: "plMWE1AN069Y",
      apiKey: "d184b284ca386b330f19ff3402521166",
      container: document.querySelector("#address"),
    }).configure({
      type: "city",
      aroundLatLngViaIP: false,
    });

    var $address = document.querySelector("#address-value");

    placesAutocomplete.on("change", (e) => {
      $address.textContent = e.suggestion.value;
      console.log(e.suggestion);
      this.cityQuery = `${e.suggestion.name}, ${e.suggestion.countryCode}`;
      this.isOpen = false;
      this.getWeather();
    });

    placesAutocomplete.on("clear", function () {
      $address.textContent = "none";
    });
  },
  watch: {
    cityAddress: {
      handler() {
        this.getWeather();
      },
    },
  },
};
</script>