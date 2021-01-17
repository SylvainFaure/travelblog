<template>
  <main>
    <div class="count">
      <div id="month" ref="month" :class="{ transitioning: monthTransition }">
        <ul class="scrollable">
          <li v-for="(d, i) in dates" :id="`month-${d}`" :key="i">{{ d.split('-')[0] }}</li>
        </ul>
      </div>
      <div id="year" ref="year" :class="{ transitioning: yearTransition }">
        <ul class="scrollable">
          <li v-for="(d, i) in dates" :id="`year-${d}`" :key="i">{{ d.split('-')[1] }}</li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div v-for="(d, i) in dates" :id="d" :key="i" ref="paragraph" class="paragraph">
        {{ msg }}
      </div>
    </div>
  </main>
</template>

<script>
import scrollIntoView from 'scroll-into-view'
export default {
  data() {
    return {
      monthTransition: false,
      yearTransition: false,
      positions: {},
      currentIndex: 0,
      dates: ['08-2019', '10-2019', '01-2020', '04-2020', '06-2020'],
      msg:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore nesciunt voluptatibus delectus, laborum sint sequi exercitationem asperiores saepe vitae nihil minima necessitatibus maiores incidunt commodi. Voluptas nulla dolores at facere.'
    }
  },
  mounted() {
    document.addEventListener('scroll', this.handleScroll)
    this.getParagraphsPosition()
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll(ev) {
      const scrolltop = Math.floor(window.pageYOffset)
      const currentPosition = this.positions[this.dates[this.currentIndex]]
      if (scrolltop > currentPosition) {
        const date = this.dates[this.currentIndex]
        const month = date.split('-')[0]
        const year = date.split('-')[1]

        const nextDate = this.dates[this.currentIndex + 1]
        const nextMonth = nextDate.split('-')[0]
        const nextYear = nextDate.split('-')[1]

        console.log(month, nextMonth)
        if (nextMonth !== month) {
          // month transition
          const gotoMonth = document.getElementById(`month-${nextDate}`)
          gotoMonth.scrollIntoView(gotoMonth, {
            debug: true
            // isScrollable: (target, defaultIsScrollable) => {
            //   return target.tagName === 'UL'
            // }
          })
        }
        if (nextYear !== year) {
          // year transition
          const gotoYear = document.getElementById(`year-${nextDate}`)
          scrollIntoView(gotoYear, { debug: true })
        }
        this.currentIndex = this.currentIndex + 1
      }
    },
    getParagraphsPosition() {
      const obj = {}
      this.$refs.paragraph.forEach((paragraph) => {
        const id = paragraph.getAttribute('id')
        const { top } = paragraph.getBoundingClientRect()
        obj[id] = Math.floor(top)
      })
      this.positions = obj
    }
  }
}
</script>

<style lang="scss">
main {
  display: flex;
  position: relative;
  margin: 50px;
}
.count {
  display: flex;
  position: fixed;
  height: 25px;
  overflow: hidden;
}
.content {
  max-width: 50vw;
  margin: 0 auto;
}
.paragraph {
  margin-bottom: 60px;
  line-height: 40px;
  font-size: 22px;
}

#month,
#year {
  position: relative;
  transition: transform 0.5s ease;
  padding: 0 4px;
  ul {
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.transitioning {
  transform: translateY(-50px);
}
</style>
