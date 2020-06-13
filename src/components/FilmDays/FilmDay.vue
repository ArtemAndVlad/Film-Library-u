<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1
          iframe( width="849" height="478" src="https://www.youtube.com/embed/4vWg5yJuWfs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen)
      .button-list
        button.button.button--round.button-primary(
          type="submit"
          @click ="onSubmit"
        ) Add
          span(v-if="loading") Loading...
          span(v-else)

</template>

<script>
export default {
  data () {
    return {
      submitStatus: null,
      taskTitle: 'Rambo Last Blood',
      taskDescription: 'Last film in Rambo Series by Silvestr Stalone',
      whatWatch: 'Film',
      // Total Time
      // Film
      filmHours: 2,
      filmMinutes: 5,
      // Serial
      // Tags
      tagTitle: '',
      tagMenuShow: false,
      tagsUsed: []
    }
  },
  methods: {
    // Add New Tag
    newTag () {
      // TODO: Vuelodate
      if (this.tagTitle === '') {
        return
      }
      const tag = {
        title: this.tagTitle,
        use: false
      }
      this.$store.dispatch('newTag', tag)
      // Reset
      this.tagTitle = ''
    },
    // Add Used Tag
    addTagUsed (tag) {
      tag.use = !tag.use
      if (tag.use) {
        this.tagsUsed.push({
          title: tag.title
        })
      } else {
        this.tagsUsed.splice(tag.title, 1)
      }
    },
    // Submit NEW TASK (submit button)
    onSubmit () {
      // Time (What Watch)
      let time
      if (this.whatWatch === 'Film') {
        time = this.filmTime
      } else {
        time = this.serialTime
      }
      // Task
      const task = {
        title: this.taskTitle,
        description: this.taskDescription,
        whatWatch: this.whatWatch,
        time,
        tags: this.tagsUsed,
        completed: false,
        editing: false
      }
      this.$store.dispatch('newTask', task)
        .then(() => {
          this.submitStatus = 'OK'
        })
        .catch(err => {
          this.submitStatus = err.message
        })
    },
    // COMMON Total Time
    getHoursAndMinutes (minutes) {
      let hours = Math.trunc(minutes / 60)
      let min = minutes % 60
      return hours + ' Hours ' + min + ' Minutes'
    }
  },
  computed: {
    // Return all Tags
    tags () {
      return this.$store.getters.tags
    },
    // FILM Total Time
    filmTime () {
      let min = (this.filmHours * 60) + (this.filmMinutes * 1)
      return this.getHoursAndMinutes(min)
    },
    // SERIAL Total Time
    serialTime () {
      let min = this.serialSeason * this.serialSeries * this.serialSeriesMinutes
      return this.getHoursAndMinutes(min)
    },
    // Show loading status
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="stylus" scoped>
  iframe
    border-style groove
    border-color #3972d8
    display block
    margin-left auto
    margin-right auto
  .button-list
    display flex
    justify-content flex-end
</style>
