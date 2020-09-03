<template>
  <div class="container" id="home">
    <button @click="getWeather">Get</button>
    <div class="weather-wrap">
        <div class="location">
          <p>{{weather.ob_time}}</p>
          <p class="title-1">{{weather.city_name + ', '}}{{weather.country_code}}</p>
          <p>{{ description }}</p>
        </div>
      <div class="temperature">
        <p class="big-txt">{{Math.round(weather.temp) + '°'}}</p>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Footer from '../components/Footer'

export default {
  name: 'Home',
  components: {
    appFooter: Footer
  },
  data() {
    return {
      api_key: '376b851225d04d3caad51a9296f2d742',
      base_url: 'https://api.weatherbit.io/v2.0/current?city=',
      city: 'Kano,NG',
      weather: {},
      description: ''
    }
  },
  methods: {
    getWeather() {
      fetch(`${this.base_url}${this.city}&key=${this.api_key}`)
      .then(res => res.json())
      .then(data => {
        this.weather = data.data[0]
        this.description = data.data[0].weather.description
        console.log(this.weather)
      })
    }
  }
}
</script>