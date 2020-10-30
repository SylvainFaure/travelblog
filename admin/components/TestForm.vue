<template>
  <form id="travel-form" class="flex justify-center">
    <div class="w-3/4">
      <BlockEditor />
      <InputText v-model="formModel.title" label="Titre du voyage" />
      <Textarea v-model="formModel.description" />
      <Select v-model="formModel.travel" :options="options" label="travel_name" />
      <InputTags @change="formModel.tags = $event" />
      <Datepicker @change="formModel.dates = $event" />
      <TextEditor :tools="['list', 'map']" />
    </div>
  </form>
</template>

<script>
export default {
  data() {
    const options = [
      {
        travel_id: 1,
        travel_name: 'Inde'
      },
      {
        travel_id: 2,
        travel_name: 'Maroc'
      },
      {
        travel_id: 3,
        travel_name: 'Les Balkans'
      }
    ]
    return {
      formModel: {
        title: 'hello',
        description: 'description',
        travel: options[0],
        tags: []
      },
      options
    }
  }
}
</script>
