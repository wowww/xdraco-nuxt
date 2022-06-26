<template>
  <section class="section section-chronicles">
    <div class="section__inner">
      <div class="wrap-chronicles">
        <h3>{{ $t('t.hydra-teaser.chronicles') }}</h3>
        <ul>
          <li>
            <img src="~@/assets/img/desktop/hydra/chronicle-01.webp" width="340" />
            <p v-html="$t('s.hydra-teaser.chronicles.desc')"></p>
          </li>
          <li>
            <img src="~@/assets/img/desktop/hydra/chronicle-02.webp" width="320" />
            <p v-html="$t('s.hydra-teaser.chronicles.desc2')"></p>
          </li>
          <li>
            <img src="~@/assets/img/desktop/hydra/chronicle-03.webp" width="290" />
            <p v-html="$t('s.hydra-teaser.chronicles.desc3')"></p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'HydraChronicles',
});
</script>
