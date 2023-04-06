<template>
  <div class="flex flex-row justify-end gap-3">
    <div>
      <label
        for="name"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Name</label
      >
      <div class="mt-2">
        <input
          type="text"
          name="text"
          id="name"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Enter tag name"
          v-model="tagName"
        />
      </div>
    </div>
    <button
      type="button"
      class="block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300 my-6"
      @click="closeModal(false)"
    >
      Cancel
    </button>
    <button
      type="button"
      class="block hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300 my-6 bg-gray-600"
      @click="save(false)"
    >
      Save
    </button>
  </div>
</template>
<script setup lang="ts">
const tagName = ref("");
const emit = defineEmits(["formSave", "hide"]);
const closeModal = (form: any) => {
  emit("hide", form);
};
const save = (form: any) => {
  emit("hide", form);
  tagName.value.length ? emit("form-save", tagName.value) : "";
};
</script>
