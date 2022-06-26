<template>
  <section class="section section-spectrums">
    <div class="section__inner">
      <div class="wrap-spectrums">
        <h3>{{ $t('t.hydra-teaser.spectrums') }}</h3>
        <ul>
          <li class="tied">
            <div class="title">{{ $t('t.hydra-teaser.spectrums.part1') }}</div>
            <p>{{ $t('s.hydra-teaser.spectrums.part1') }}</p>
          </li>
          <li class="synthetic">
            <div class="title">{{ $t('t.hydra-teaser.spectrums.part2') }}</div>
            <p>{{ $t('s.hydra-teaser.spectrums.part2') }}</p>
          </li>
          <li class="diplomatic">
            <div class="title">{{ $t('t.hydra-teaser.spectrums.part3') }}</div>
            <p>{{ $t('s.hydra-teaser.spectrums.part3') }}</p>
          </li>
          <li class="governance">
            <div class="title">{{ $t('t.hydra-teaser.spectrums.part4') }}</div>
            <p>{{ $t('s.hydra-teaser.spectrums.part4') }}</p>
          </li>
          <li class="defi">
            <div class="title">{{ $t('t.hydra-teaser.spectrums.part5') }}</div>
            <p>{{ $t('s.hydra-teaser.spectrums.part5') }}</p>
          </li>
          <li class="tradable">
            <div class="title">{{ $t('t.hydra-teaser.spectrums.part6') }}</div>
            <p>{{ $t('s.hydra-teaser.spectrums.part6') }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'HydraSpectrums',
});
</script>


