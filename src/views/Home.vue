<template>
  <div class="container" id="home" :class="isDaylight ? '': 'night'">
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
    <div class="shade"></div>

    <!-- FOOTER -->
    <footer class="footer" :class="isOpen ? '' : 'close'">
      <div class="footer__top">
        <chevron-down-icon class="footer__top-button" @click="isOpen = !isOpen" v-if="isOpen"></chevron-down-icon>
        <chevron-up-icon class="footer__top-button" @click="openMenu" v-else></chevron-up-icon>
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
              <p>{{saved.temp}}­</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import places from "places.js";
import { ChevronDownIcon, ChevronUpIcon } from "vue-feather-icons";

export default {
  name: "Home",
  components: {
    ChevronDownIcon,
    ChevronUpIcon,
  },
  data() {
    return {
      api_key: "376b851225d04d3caad51a9296f2d742",
      base_url: "https://api.weatherbit.io/v2.0/current?city=",
      cityQuery: "Lagos, NG",
      weather: {},
      description: "",
      isDaylight: true,
      isOpen: true,
      cityAddress: "",
      savedLocations: [],
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
      // Add to recent serches
      let saved = {
        time: this.weather.ob_time,
        location: this.weather.city_name + ", " + this.weather.country_code,
        temp: Math.round(this.weather.temp) + "°",
      };
      if (this.savedLocations.length < 3) {
        this.savedLocations.unshift(saved);
      } else {
        this.savedLocations.pop();
        this.savedLocations.unshift(saved);
      }
    },
    openMenu() {
      this.isOpen = !this.isOpen;
      this.cityQuery = "";
    },
  },
  created() {
    fetch(`${this.base_url}${this.cityQuery}&key=${this.api_key}`)
      .then((res) => res.json())
      .then((data) => {
        this.weather = data.data[0];
        this.description = data.data[0].weather.description;
        console.log(this.weather);
      });
    this.cityQuery = "";
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

    placesAutocomplete.on("change", (e) => {
      // $address.textContent = e.suggestion.value;
      console.log(e.suggestion);
      this.cityQuery = `${e.suggestion.name}, ${e.suggestion.countryCode}`;
      this.getWeather();
      this.cityQuery = "";
    });

    placesAutocomplete.on("clear", function () {
      this.cityQuery = "";
    });
  },
};
</script>