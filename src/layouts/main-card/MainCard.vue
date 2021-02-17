<template>
  <div class="main-section__card">
    <header class="card__header">
      <nav class="header__nav">
        <router-link
          class="nav__link nav__link--crypto"
          to="/"
        >Cryptocurrencies</router-link>
        <router-link
          class="nav__link nav__link--portfolio"
          to="/portfolio"
        >Portfolio</router-link>
      </nav>
    </header>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.main-section__card {
  width: 80%;
  min-height: 80vh;
  height: fit-content;
  position: relative;

  display: grid;
  grid-template-rows: 6rem 1fr;

  background: var(--secondary);
  border-radius: 5px;
  // border: 1px solid var(--third);
  box-shadow: 0 0 16px rgba(0, 0, 0, .05);
}

.card__header {
  width: 100%;
  padding: 0 3rem;
  grid-row: 1 / 2;

  display: flex;
  align-items: center;
}

.header__nav {
  width: fit-content;
}

.nav__link {
  color: var(--font-primary);

  &--portfolio {
    margin-left: 1.5rem;
  }

  &:hover,
  &:focus {
    opacity: .7;
    outline: none;
  }
}

.router-link-exact-active {
  color: var(--accent);
  font-weight: 500;
}
</style>
