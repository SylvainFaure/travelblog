<template>
  <nuxt-link :to="route">
    <transition name="fade">
      <div class="fab">
        <span><i class="fab__icon" /> </span>
        <span v-if="label" class="fab__label">{{ label }}</span>
      </div>
    </transition>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },
    route: {
      type: String,
      required: false,
      default: '/'
    }
  },
  transition: 'fade'
}
</script>
<style lang="scss">
.fab {
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  bottom: 3em;
  right: 1em;

  width: 5em;
  height: 5em;
  border: 5px solid lightgrey;
  color: whitesmoke;
  border-radius: 50%;

  background-color: slategrey;
  transition: all 0.3s ease;

  & i {
   margin-top: 20px;
   font-size: 3em;
    transition: all 0.3s ease;
  }
  &-label {
    transition: all 0.3 ease;
    visibility: hidden;
  }

  &:hover {
    transition: all 0.3 ease;
    cursor: pointer;
    opacity: 0.7;
    transform: scale(1.1);
    i {
      margin-top: 0px;
      font-size: 2em;
    }
    .fab {
      &-label {
        visibility: visible;
      }
    }
  }
}
</style>
