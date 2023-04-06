<template>
  <div>
    <CollectionMain
      :url="url"
      entity="CONTACTS"
      :project_id="123"
      :geturl="geturl"
    ></CollectionMain>
  </div>
</template>

<script setup lang="ts">
const url = "https://v1-orm-lib.mars.hipso.cc/tags/";
const geturl =
  "https://v1-orm-lib.mars.hipso.cc/tags/entity/CONTACTS?offset=0&limit=100&sort_column=id&sort_direction=desc";
</script>

<style scoped></style>
