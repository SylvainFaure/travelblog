<template>
  <div class="flex justify-center items-center">
    <div :class="[{ 'w-2/3': !saveOnly, 'mx-8': saveOnly }, 'flex flex-col items-end']">
      <div class="flex mt-8 mb-24">
        <Btn icon-btn :label="$t('general.save')" icon="floppy-disk" @click="$emit('save')" />
        <span v-if="saveOnly && canRemove">
          <Btn v-if="!isNew" icon-btn :label="$t('general.remove')" icon="bin" @click="$emit('remove')" />
        </span>
        <span v-if="!saveOnly">
          <Btn icon-btn :label="$t('general.publish')" icon="rocket" @click="$emit('publish')" />
          <Btn v-if="!isNew" icon-btn :label="$t('general.remove')" icon="bin" @click="$emit('remove')" />
          <Btn
            v-if="isPublished"
            icon-btn
            type="error"
            :label="$t('general.unpublish')"
            icon="fire"
            @click="$emit('unpublish')"
          />
        </span>
      </div>
      <slot></slot>
      <div class="flex mt-24 mb-8">
        <Btn icon-btn :label="$t('general.save')" icon="floppy-disk" @click="$emit('save')" />
        <span v-if="saveOnly && canRemove">
          <Btn v-if="!isNew" icon-btn :label="$t('general.remove')" icon="bin" @click="$emit('remove')" />
        </span>
        <span v-if="!saveOnly">
          <Btn icon-btn :label="$t('general.publish')" icon="rocket" @click="$emit('publish')" />
          <Btn v-if="!isNew" icon-btn :label="$t('general.remove')" icon="bin" @click="$emit('remove')" />
          <Btn
            v-if="isPublished"
            icon-btn
            type="error"
            :label="$t('general.unpublish')"
            icon="fire"
            @click="$emit('unpublish')"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
export default {
  props: {
    isNew: VueTypes.bool.def(false),
    isPublished: VueTypes.bool.def(false),
    saveOnly: VueTypes.bool.def(false),
    canRemove: VueTypes.bool.def(false)
  }
}
</script>
