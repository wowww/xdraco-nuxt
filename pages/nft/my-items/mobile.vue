<template>
  <main class="contents">
    <section class="section">
      <div class="section__inner">
        <div class="subnav-block"></div>
        <div class="myitem-list">
          <v-tabs v-model="selectedTab" class="tab-rounds">
            <v-tab>
              <span>{{ $t('w.exd.my-items.tab.seal') }}</span>
            </v-tab>
            <v-tab>
              <span>{{ $t('w.exd.my-items.tab.sale') }}</span>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="selectedTab">
            <v-tab-item class="tab-seal">
              <!-- 업데이트 예정: 봉인 캐릭터 업데이트 예정 -->
              <div class="continued">
                <dl>
                  <dt>{{ $t('s.nft.sealed.character.updated.soon') }}</dt>
                  <dd>{{ $t('s.nft.check.wallet.sealed') }}</dd>
                </dl>
              </div>
            </v-tab-item>
            <v-tab-item class="tab-sale">
              <!-- 업데이트 예정: 판매 캐릭터 목록 업데이트 예정 -->
              <div class="continued">
                <dl>
                  <dt>{{ $t('s.nft.active.character.updated.soon') }}</dt>
                  <dd>{{ $t('s.nft.check.wallet.nft.menu') }}</dd>
                </dl>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { reactive, toRefs } from '@vue/composition-api/dist/vue-composition-api';

export default defineComponent({
  setup() {
    const state = reactive({
      selectedTab: 0,
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';

.myitem-list {
  .v-tabs.tab-rounds {
    .v-tabs-bar {
      .v-tab.v-tab--active {
        background-color: #330044;
      }
    }
  }
}

.continued {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px 3px 0;
  height: 400px;
  box-sizing: content-box;
  text-align: center;

  dl {
    dt {
      margin-bottom: 5px;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
      line-height: 23px;
    }

    dd {
      font-size: 14px;
      color: rgba($color: #fff, $alpha: 0.6);
    }
  }
}
</style>
