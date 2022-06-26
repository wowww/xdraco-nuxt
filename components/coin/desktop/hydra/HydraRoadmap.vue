<template>
  <section class="section section-roadmap">
    <div class="section__inner">
      <div class="wrap-roadmap">
        <h3 class="section-title">{{ $t('t.hydra.roadmap') }}</h3>
        <ol class="step-roadmap">
          <li class="step-roadmap-item step1">
            <em class="date">{{ $t('s.hydra-teaser.roadmap.part1.date') }}</em>
            <dl class="step-detail">
              <dt v-html="$t('t.hydra-teaser.roadmap.part2')"></dt>
              <dd>{{ $t('s.hydra-teaser.roadmap.part2') }}</dd>
            </dl>
          </li>
          <li class="step-roadmap-item step2">
            <em class="date" v-html="$t('s.hydra-teaser.roadmap.part2.date')"></em>
            <dl class="step-detail">
              <dt>HSP</dt>
              <dd v-html="$t('s.hydra-roadmap.part2')"></dd>
            </dl>
          </li>
          <li class="step-roadmap-item step3">
            <em class="date" v-html="$t('s.hydra-teaser.roadmap.part4.date')"></em>
            <dl class="step-detail">
              <dt v-html="$t('t.hydra.roadmap.part3')"></dt>
              <dd>{{ $t('s.hydra.roadmap.part3') }}</dd>
            </dl>
          </li>
          <li class="step-roadmap-item step4">
            <em class="date" v-html="$t('w.hydra.roadmap.part4.date')"></em>
            <dl class="step-detail">
              <dt>HSP101</dt>
              <dd>{{ $t('s.hydra-teaser.roadmap.part3') }}</dd>
            </dl>
          </li>
          <li class="step-roadmap-item step5">
            <dl class="step-detail">
              <dt>AXD</dt>
              <dd>{{ $t('s.hydra.roadmap.part5') }}</dd>
            </dl>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'HydraRoadmap',
});
</script>


