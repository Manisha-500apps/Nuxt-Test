<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select
        id="tabs"
        name="tabs"
        class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
          {{ tab.name }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <a
            v-for="tab in tabs"
            :key="tab.name"
            :href="tab.href"
            :class="[
              tab.current
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
              'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
            ]"
            :aria-current="tab.current ? 'page' : undefined"
            >{{ tab.name }}</a
          >
        </nav>
      </div>
    </div>

    <div
      class="block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:bg-gray-700 mt-2"
    >
      <div
        class="block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:bg-gray-700 mt-2"
      >
        <div
          class="border-b border-gray-200 pb-5 text-sm sm:flex sm:justify-between"
        >
          <dl class="flex">
            <h1 class="text-xl font-bold tracking-tight text-gray-900">Tags</h1>
          </dl>
          <div class="mt-4 sm:mt-0">
            <button
              type="button"
              @click="openModal"
              class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Add Tag
            </button>
          </div>
        </div>
        <div class="mt-4 sm:mt-0">
          <TransitionRoot appear :show="isOpen" as="template">
            <Dialog as="div" @cancel="closeModal" class="relative z-10">
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="fixed inset-0 bg-black bg-opacity-25" />
              </TransitionChild>

              <div class="fixed inset-0 overflow-y-auto">
                <div
                  class="flex min-h-full items-center justify-center p-4 text-center"
                >
                  <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0 scale-95"
                    enter-to="opacity-100 scale-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100 scale-100"
                    leave-to="opacity-0 scale-95"
                  >
                    <DialogPanel
                      class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                    >
                      <CollectionAdd @form-save="addTag" @hide="closeModal" />
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </TransitionRoot>
          <div
            v-for="(tag, index) in tags"
            :key="index"
            class="mb-3 border-b border-gray-200 bg-white px-4 py-5 sm:px-6"
          >
            <CollectionList :tag="tag" :index="index" @emitData="emitData" />
            <CollectionEdit
              v-if="editInput.uid == tag.uid"
              :tag="editInput"
              @edit="edit"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
interface CollectionTags {
  project_id: String;
  entity: String;
  url: String;
  tags: Array;
  geturl: String;
}
const props = withDefaults(defineProps<CollectionTags>(), {
  project_id: "",
  entity: "",
});
const tags = ref([]);
const tags_transform = ref({});
// Get tags from appconfig
const { data: tagsData } = await useAuthLazyFetch(`${props.geturl}`, {});
tags.value = tagsData.value;
const editInput = ref([]);
const tabs = [{ name: "Tags", href: "#", current: true }];
const isOpen = ref(false);
const closeModal = () => {
  isOpen.value = false;
};
const openModal = () => {
  isOpen.value = true;
};
const addTag = async (tagName: any) => {
  await useAuthLazyFetchPost(`${props.url}`, {
    body: {
      project_id: props.project_id,
      name: tagName,
      entity: props.entity,
    },
    // Add the new tag to the tags
  });
  getTags();
};
const emitData = (tag: Object) => {
  tag.value == "edit" ? (editInput.value = tag.tag) : deleteTag(tag);
  console.log("editIn23put", editInput);
};
// Delete tags
const deleteTag = async (tag: any) => {
  await useAuthLazyFetchDelete(`${props.url}${tag.tag.uid}`, {});
  // If the tag exists, delete it
  if (tag.index !== -1) {
    // To remove deleted tag
    tags.value.splice(tag.index, 1);
    getTags();
  }
};
// Edit tags
const edit = async (tag: any) => {
  await useAuthLazyFetchPut(`${props.url}${tag.uid}?name=${tag.tag}`, {
    body: {
      project_id: props.project_id,
      name: tag.tag,
      entity: props.entity,
    },
  });
  getTags();
};

const transformTags = (tag: any) => {
  // Split ids and name
  let tag_data = tag.name.split(",");
  let tag_ids = tag.uid.split(",");
  // Name and ids mapping into single object
  return tag_data.map((name, id) => {
    return { name: name, tag_id: tag_ids[id] };
  });
};
const getTags = async () => {
  const { data: tagsData } = await useAuthLazyFetch(`${props.geturl}`, {});
  tags.value = tagsData.value;
  editInput.value = tags.value;
};
</script>
