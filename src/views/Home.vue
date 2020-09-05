<template>
  <div class="container" id="home">
    <div class="shade"></div>
    <div
      class="weather-wrap"
      :class="isFull ? 'full' : ''"
      v-show="typeof this.weather.weather != 'undefined'"
    >
      <div class="location" v-if="!isFull">
        <p class="txt">{{this.weather.ob_time}}</p>
        <p class="title-1 txt">{{this.weather.city_name + ', '}}{{this.weather.country_code}}</p>
        <p class="txt">{{ this.description }}</p>
      </div>
      <div class="temperature">
        <div class="col1">
          <skycon
            :condition="fCondition"
            color="white"
            class="condition"
            width="70"
            height="70"
            v-if="isFull"
          ></skycon>
          <p class="big-txt txt">{{Math.round(this.weather.temp) + '°'}}</p>
        </div>
        <div class="col2" v-if="isFull">
          <p class="title-1 txt">{{this.weather.city_name + ', '}}{{this.weather.country_code}}</p>
          <p class="txt">{{ this.description }}</p>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <footer class="footer" :class="isOpen ? '' : 'close'">
      <div class="footer__top">
        <chevron-down-icon class="footer__top-button" @click="closeMenu" v-if="isOpen"></chevron-down-icon>
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
      fCondition: "",
      isOpen: false,
      cityAddress: "",
      savedLocations: [],
      isFull: true,
    };
  },
  methods: {
    getWeather() {
      fetch(`${this.base_url}${this.cityQuery}&key=${this.api_key}`)
        .then((res) => res.json())
        .then((data) => {
          this.weather = data.data[0];
          this.description = data.data[0].weather.description;
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
      this.isOpen = true;
      this.isFull = false;
      this.cityQuery = "";
    },
    closeMenu() {
      this.isOpen = false;
      this.isFull = true;
    },
  },
  created() {
    fetch(`${this.base_url}${this.cityQuery}&key=${this.api_key}`)
      .then((res) => res.json())
      .then((data) => {
        this.weather = data.data[0];
        this.description = data.data[0].weather.description;
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
      this.cityQuery = `${e.suggestion.name}, ${e.suggestion.countryCode}`;
      this.getWeather();
      this.cityQuery = "";
      this.closeMenu();
    });

    placesAutocomplete.on("clear", function () {
      this.cityQuery = "";
    });
  },
  watch: {
    description: {
      handler() {
        let fCondition;
        if (this.description === "Unknown precipitation") {
          fCondition = "";
        } else if (
          this.description === "Thunderstorm with light rain" ||
          this.description === "Thunderstorm with heavy rain" ||
          this.description === "Light drizzle" ||
          this.description === "Light rain" ||
          this.description === "Light shower rain" ||
          this.description === "Heavy shower rain" ||
          this.description === "Shower rain" ||
          this.description === "Heavy rain" ||
          this.description === "Moderate rain" ||
          this.description === "Freezing rain" ||
          this.description === "Heavy drizzle" ||
          this.description === "Drizzle" ||
          this.description === "Thunderstorm with heavy drizzle" ||
          this.description === "Thunderstorm with drizzle" ||
          this.description === "Thunderstorm with light drizzle" ||
          this.description === "Thunderstorm with rain"
        ) {
          fCondition = "rain";
        } else if (
          this.description === "Overcast Clouds" ||
          this.description === "Broken clouds"
        ) {
          fCondition = "cloudy";
        } else if (
          this.description === "Fog" ||
          this.description === "Haze" ||
          this.description === "Sand/dust" ||
          this.description === "Smoke" ||
          this.description === "Freezing fog" ||
          this.description === "Mist"
        ) {
          fCondition = "fog";
        } else if (
          this.description === "Snow" ||
          this.description === "Snow shower" ||
          this.description === "Light snow" ||
          this.description === "Heavy snow" ||
          this.description === "Mix snow/Rain" ||
          this.description === "Flurries"
        ) {
          fCondition = "snow";
        } else if (
          this.description === "Sleet" ||
          this.description === "Heavy Sleet"
        ) {
          fCondition = "sleet";
        } else if (this.description === "Clear sky") {
          fCondition = "clear-day";
        } else if (
          this.description === "Scattered clouds" ||
          this.description === "Few clouds"
        ) {
          fCondition = "partly-cloudy-day";
        }
        this.fCondition = fCondition;
      },
    },
  },
};
</script>