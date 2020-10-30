<template>
  <portal to="modal">
    <div class="flex flex-col justify-center items-center m-16">
      <h4 class="font-bold text-lg text-center mb-4">{{ $t('general.sure') }}</h4>
      <div class="flex justify-center">
        <Btn :label="$t('general.confirm')" additional-classes="mr-4" @click="$emit('confirm')" />
        <Btn :label="$t('general.cancel')" type="secondary" @click="$emit('cancel')" />
      </div>
    </div>
  </portal>
</template>

<script>
export default {}
</script>
