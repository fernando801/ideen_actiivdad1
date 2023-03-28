<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  info: {
    type: String,
    required: true
  }
})
</script>

<template>
  <h3>{{ title }}</h3>
  <p>{{ info }}</p>
</template>

<style scoped>
h3,
p {
  font-size: 1.2rem;
  font-weight: bold;
}

h3 {
  color: var(--blue);
}

p {
  color: var(--gray);
}
</style>
