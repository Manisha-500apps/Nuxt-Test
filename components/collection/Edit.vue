<template>
  <div>
    <!--Edit tag starts here-->
    <div
      v-if="editInput"
      class="flex flex-row items-center h-16 bg-white w-full"
    >
      <div class="flex-grow">
        <div class="relative w-full">
          <input
            v-model="selectedTag"
            type="text"
            class="flex w-full border rounded-lg focus:outline-none border-gray-300 focus:border-indigo-300 h-10"
          />
        </div>
      </div>
      <div class="ml-4">
        <button
          class="flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white p-2 px-3 flex-shrink-0"
          @click="editTag(selectedTag), (editInput = false)"
        >
          Save
        </button>
      </div>
    </div>
    <!--Edit tag ends here-->
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  tag: { type: String, required: true },
});
const selectedTag = ref(props.tag.name);
const editInput = ref("true");
const emit = defineEmits(["edit"]);
const editTag = (data: any) => {
  emit("edit", { uid: props.tag.uid, tag: data });
  selectedTag.value = "";
};
</script>
