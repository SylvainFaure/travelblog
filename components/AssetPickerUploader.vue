<template>
  <div class="m-6">
    <file-upload
      ref="upload"
      v-model="files"
      :multiple="true"
      :custom-action="uploadFiles"
      @input-file="inputFile"
      @input-filter="inputFilter"
    >
      <btn v-if="!files.length" type="primary" :label="$t('assets.upload')" />
    </file-upload>

    <div class="flex flex-wrap">
      <div v-if="files.length >= 2" class="mr-4 my-4 w-56">
        <input-text
          small
          :placeholder="$t('assets.form.title')"
          @input="handleFillEverything($event, `title_${$i18n.locale}`)"
        />
        <input-text
          small
          :placeholder="$t('assets.form.place')"
          @input="handleFillEverything($event, `place_${$i18n.locale}`)"
        />
        <Select
          :placeholder="$t('assets.form.travel')"
          :options="travels"
          :option-label="`travel_title_${$i18n.locale}`"
          @input="handleFillEverything($event, `travel_id`)"
        />
        <input-text
          small
          :placeholder="$t('assets.form.country')"
          @input="handleFillEverything($event, `country_${$i18n.locale}`)"
        />
        <input-text
          small
          :placeholder="$t('assets.form.description')"
          @input="handleFillEverything($event, `desc_${$i18n.locale}`)"
        />
      </div>
      <div v-for="(file, i) in files" :key="i" class="mr-4 my-4 w-56">
        <input-text v-model="filesData[i][`title_${$i18n.locale}`]" small :placeholder="$t('assets.form.title')" />
        <input-text v-model="filesData[i][`place_${$i18n.locale}`]" small :placeholder="$t('assets.form.place')" />
        <Select
          v-model="filesData[i].travel_id"
          :placeholder="$t('assets.form.travel')"
          :options="travels"
          :option-label="`travel_title_${$i18n.locale}`"
        />
        <input-text v-model="filesData[i][`country_${$i18n.locale}`]" small :placeholder="$t('assets.form.country')" />
        <input-text v-model="filesData[i][`desc_${$i18n.locale}`]" small :placeholder="$t('assets.form.description')" />

        <img class="w-56" :src="file.blob" />
        <p class="text-sm">
          {{ file.name }}
        </p>
      </div>
    </div>
    <btn
      v-show="files.length && (!$refs.upload || !$refs.upload.active)"
      type="primary"
      :label="$t('assets.do_upload')"
      @click="handleUpload"
    />
    <Loader v-if="loading" />
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import VueUploadComponent from 'vue-upload-component'
export default {
  components: {
    FileUpload: VueUploadComponent
  },
  props: {
    travels: VueTypes.array.def([])
  },
  data() {
    return {
      loading: false,
      files: [],
      filesData: []
    }
  },
  methods: {
    handleUpload() {
      this.$refs.upload.active = true
      this.loading = true
    },
    handleFillEverything(value, field) {
      this.filesData.forEach((file) => {
        file[field] = value
      })
    },
    inputFile(newFile, oldFile) {
      const defaultFileData = {
        title_fr: '',
        title_it: '',
        place_fr: '',
        place_it: '',
        country_fr: '',
        country_it: '',
        desc_fr: '',
        desc_it: '',
        travel_id: ''
      }
      if (!oldFile || (newFile && oldFile.name !== newFile.name)) {
        console.log('PUSH NEW FILE DATA')
        this.filesData.push({
          id: newFile.id,
          name: newFile.name,
          ...defaultFileData
        })
      }
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // Get response data
        // console.log('response', newFile.response)
        if (newFile.xhr) {
          //  Get the response status code
          // console.log('status', newFile.xhr.status)
        }
      }
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Filter non-image file
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          return prevent()
        }
      }

      // Create a blob field
      newFile.blob = ''
      const URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
    },
    async uploadFiles() {
      const formData = new FormData()
      this.files.forEach((file, index) => {
        formData.append(`file[${index}]`, file.file)
        Object.keys(this.filesData[index]).forEach((info, i) => {
          const value = info === 'travel_id' ? this.filesData[index][info].travel_id : this.filesData[index][info]
          formData.append(`infos[${index}][${info}]`, value)
        })
      })
      try {
        await this.$axios.post('/api/assets', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.files = []
        this.filesData = []
        this.$toast.success(this.$t('assets.upload_success'))
        this.$emit('uploaded')
      } catch (error) {
        console.log('ERROR', error)
        this.$toast.error(this.$t('assets.upload_error'))
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
