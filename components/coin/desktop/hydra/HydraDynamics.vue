<template>
  <client-only>
    <section class="section section-dynamics">
      <div class="section__inner">
        <h3 class="section-title" v-html="$t('t.hydra.dynamics.title')"></h3>
        <div class="supply">
          <p>
            <span class="tit" v-html="$t('t.hydra.dynamics.supply')"></span>
            <em class="amount">60,000,000</em>
          </p>
        </div>
        <h4 class="tbl-title" v-html="$t('t.hydra.dynamics.allocation')"></h4>
        <table class="table">
          <colgroup>
            <col style="width: 220px" />
            <col />
            <col style="width: 96px" />
            <col style="width: 160px" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" v-html="$t('w.hydra.dynamics.division')"></th>
              <th scope="col" v-html="$t('w.hydra.dynamics.description')"></th>
              <th scope="col" v-html="$t('w.hydra.dynamics.distribution')"></th>
              <th scope="col" v-html="$t('w.hydra.dynamics.supply')"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-html="$t('s.hydra.dynamics.desc1')"></td>
              <td v-html="$t('s.hydra.dynamics.desc2')"></td>
              <td>83.33%</td>
              <td>50,000,000</td>
            </tr>
            <tr>
              <td v-html="$t('s.hydra.dynamics.desc3')"></td>
              <td>
                <p v-html="$t('s.hydra.dynamics.desc4')"></p>
                <span class="txt-warn" v-html="$t('s.hydra.dynamics.warn')"></span>
              </td>
              <td>16.67%</td>
              <td>10,000,000</td>
            </tr>
          </tbody>
        </table>
        <div class="summary">
          <p>
            <span class="tit" v-html="$t('w.hydra.dynamics.total')"></span>
            <em class="amount">60,000,000</em>
          </p>
        </div>
        <dl class="define-fee">
          <dt v-html="$t('t.hydra.dynamics.fee')"></dt>
          <dd v-html="$t('s.hydra.dynamics.fee')"></dd>
        </dl>
      </div>
    </section>
  </client-only>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'HydraDynamics',
});
</script>
