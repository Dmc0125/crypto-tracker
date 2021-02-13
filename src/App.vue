<template>
  <main
    class="app"
    color-mode="light"
  >
    <section class="main-section">
      <main-card />
    </section>

    <add-position />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import { useStore } from '@/store';

import { ActionTypes } from '@/store/modules/cryptocurrencies/types/action-types';

import MainCard from '@/components/main-card/MainCard.vue';
import AddPosition from '@/components/add-position/AddPosition.vue';

export default defineComponent({
  components: {
    MainCard,
    AddPosition,
  },
  setup() {
    const { dispatch } = useStore();

    onMounted(() => {
      dispatch(ActionTypes.GetBinanceData);

      // dispatch(ActionTypes.ConnectWebsocket);
    });

    return {};
  },
});
</script>

<style lang="scss">
// GLOBAL STYLES

* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  font-family: 'work sans', sans-serif;
}

html,
body {
  height: 100%;
  min-height: 100%;
  width: 100%;
  position: relative;
  overflow-x: hidden;
}

input {
  font-size: 1rem;
}

input:focus {
  outline: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

button {
  font-size: 1rem;
  cursor: pointer;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: var(--font-primary);
}

p, li, a,
label, input, button,
h1, h2, h3, h4, h5, h6 {
  color: var(--font-primary);
}

h1 {
  font-size: 2rem;
  font-weight: 600;
}

h2 {
  font-size: 1.6rem;
  font-weight: 500;
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
}

p, a {
  font-size: 1rem;
  font-weight: 400;
}

.app[color-mode="light"] {
  --primary: rgb(245, 245, 245);
  --secondary: #fff;
  --third: rgb(197, 197, 197);

  --font-primary: rgb(24, 24, 24);
  --font-secondary: rgb(245, 245, 245);

  --heading: #000;
}

.app[color-mode="dark"] {
  --primary: #1f242a;
  --secondary: #30353b;
  --third: rgb(197, 197, 197);

  --font-primary: rgb(223, 223, 223);
  --font-secondary: rgb(24, 24, 24);

  --heading: #fff;
}

.app {
  --trans: all 200ms ease-in-out;

  --accent: #2a9cff;
  --red: rgb(218, 34, 34);
  --green: rgb(16, 189, 16);

  height: fit-content;
  min-height: 100vh;
  width: 100%;
  position: relative;
}

.main-section {
  width: 75%;
  min-height: 100vh;
  height: fit-content;

  background: var(--primary);

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
