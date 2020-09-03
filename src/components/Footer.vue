<template>
  <footer class="footer" :class="isOpen ? 'open' : ''">
    <div class="footer__top">
      <p class="footer__top-button" @click.self="isOpen = !isOpen" v-if="isOpen">X</p>
      <p class="footer__top-button" @click.self="isOpen = !isOpen" v-else>O</p>
    </div>
    <div class="footer__bottom">
      <div class="footer__bottom-search">
        <input type="text" v-model="query" placeholder="Enter a city..." id="search">
      </div>
      <hr>
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
</template>

<script>
export default {
  name: 'Footer',
  components: {},
  data() {
    return {
      isOpen: false,
      query: '',
      savedLocations: [
        {
          time: 'time',
          location: 'location',
          temperature: 'temp'
        },
        {
          time: 'time',
          location: 'location',
          temperature: 'temp'
        }
      ]
    }
  }
}
</script>