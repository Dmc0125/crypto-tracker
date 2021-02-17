import { createApp } from 'vue';

import PercentFormatted from '@/components/percent-formatted/PercentFormatted.vue';
import PriceFormatted from '@/components/price-formatted/PriceFormatted.vue';

import App from './App.vue';
import router from './router';
import { store } from './store';

const app = createApp(App);

app.component('PercentFormatted', PercentFormatted);
app.component('PriceFormatted', PriceFormatted);

app
  .use(store)
  .use(router)
  .mount('#app');
