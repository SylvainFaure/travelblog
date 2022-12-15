<template>
  <div class="w-screen h-screen fixed bg-gray-200 inset-0 flex justify-center items-center z-50">
    <div class="loader animation-spin"></div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}
</style>
