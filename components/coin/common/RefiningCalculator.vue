<template>
  <v-dialog v-model="refiningPop" content-class="refining-pop" :transition="isMobile ? 'dialog-bottom-transition' : ''">
    <template #activator="{ on, attrs }">
      <button type="button" v-bind="attrs" class="btn-calc" v-on="on">
        <span>{{ $t('t.hydra-refiningpop.tit') }}</span>
      </button>
    </template>

    <validation-observer v-slot="{ invalid }" tag="div" class="content">
      <v-btn class="btn-close" fab plain x-small @click="refiningPop = false">close</v-btn>
      <div class="tit">{{ $t('t.hydra-refiningpop.tit') }}</div>
      <validation-provider tag="div" rules="required|min_value:1|max_value:500" class="text-area">
        <div class="input-wrap">
          <span>{{ $t('t.hydra-refiningpop.subscript') }}: </span>
          <input v-model="stage" type="text" placeholder="1~500" @input="inputOnlyNum" />
        </div>
        <!--        <a href="#" class="btn-calc">CALC</a>-->
      </validation-provider>
      <div class="info-area" :class="{ empty: invalid }" :data-empty-message="$t('t.hydra-refiningpop.empty')">
        <p v-show="!invalid" class="stage-number">{{ $t('w.hydra-refiningpop.number') }} {{ stage }}</p>
        <ul v-show="!invalid" class="list">
          <li>
            <span>{{ $t('t.hydra-refiningpop.cumulative') }}</span>
            <div>
              <p class="volume-hydra">{{ ((stage - 1) * 100000 + 1) | currency(0) }}</p>
              <span class="syn">~</span>
              <p class="volume-hydra">{{ (stage * 100000) | currency(0) }}</p>
            </div>
          </li>
          <li>
            <span>{{ $t('t.hydra-refiningpop.total') }}</span>
            <div>
              <p class="volume-draco">{{ Math.round(refiningFee) }}</p>
              <span class="syn">+</span>
              <p class="volume-septarium">{{ stage }}</p>
            </div>
          </li>
        </ul>
      </div>
    </validation-observer>
  </v-dialog>
</template>

<script>
import { defineComponent, computed, reactive, toRefs, watch } from '@vue/composition-api';

export default defineComponent({
  name: 'RefiningCalculator',
  components: {
    //
  },
  props: {
    //
  },
  setup() {
    const state = reactive({
      stage: null,
      baseDraco: 20,
      coefficient: 0.6,
      isOpen: false,
      refiningPop: false,
      isDevelopment: process.env.NODE_ENV === 'development',
    });

    const calcFee = (n) => {
      return state.coefficient / (Math.log(n + 1) / Math.log(3.7));
    };

    const sumFee = (n) => {
      if (Number(n) && Number(n) <= 500) {
        return Array.from(Array(Number(n)).keys()).reduce((a, b) => {
          return a + calcFee(b + 1);
        }, 0);
      }
      return 0;
    };

    const inputOnlyNum = () => {
      const num = state.stage.replace(/[^0-9]/g, '');

      if (Number(num)) {
        state.stage = `${Number(num)}`;
      } else {
        state.stage = num;
      }
    };

    const refiningFee = computed(() => {
      if (state.baseDraco) {
        return state.baseDraco + sumFee(state.stage);
      }
      return 0;
    });

    watch(
      () => state.refiningPop,
      () => {
        if (!state.refiningPop) {
          state.stage = null;
        }
      },
    );

    return {
      ...toRefs(state),
      calcFee,
      sumFee,
      refiningFee,
      inputOnlyNum,
    };
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>

<style lang="scss">
.refining-pop {
  width: 640px !important;
  background: url('~@/assets/img/desktop/hydra/bg-popprologue.webp') 50% 50% / cover no-repeat,
    radial-gradient(circle, rgba(0, 0, 117, 1) 0%, rgba(0, 0, 71, 1) 100%);
  border: 1px solid #313181;
  box-shadow: none;
  font-size: 16px;

  .content {
    height: 100%;

    .btn-close {
      top: 24px;
      right: 24px;
      width: 22px;
      height: 22px;
      background: url('~@/assets/img/desktop/hydra/icon-close.webp') 50% 50% / cover no-repeat;
      font-size: 0;
    }
    .tit {
      font-weight: bold;
      color: #0f69ff;
    }
    .text-area {
      display: flex;
      justify-content: space-between;
      margin-top: 25px;

      .input-wrap {
        position: relative;
        width: 100%;
        height: 52px;
        padding: 9px 16px 12px 190px;
        background-color: #0a0a3d;
        box-sizing: border-box;

        span {
          position: absolute;
          top: 50%;
          left: 16px;
          transform: translateY(-50%);
          font-size: 14px;
          color: #fff;
        }
        input {
          width: 100%;
          text-align: right;
          font-size: 24px;
          color: #ffc700;
          outline: none;
          vertical-align: middle;
          font-weight: 700;

          &::placeholder {
            color: rgba($color: #fff, $alpha: 0.2);
          }
        }
      }
      .btn-calc {
        width: 92px;
        height: 52px;
        line-height: 52px;
        background-color: #ffc700;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
      }
    }
    .info-area {
      display: flex;
      flex-direction: column;
      min-height: 210px;

      &.empty {
        justify-content: center;
        align-items: center;
        height: 198px;
        text-align: center;

        &::before {
          content: attr(data-empty-message);
          display: block;
          font-size: 16px;
          color: rgba(#fff, 0.5);
        }
        p,
        ul {
          display: none;
        }
      }
      .stage-number {
        margin-top: 16px;
        font-weight: bold;
        text-align: center;
        font-size: 16px;
        color: #fff;
        line-height: 40px;
      }
      .list {
        list-style-type: none;
        margin-top: 8px;
        color: #fff;
        padding-left: 0;

        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-top: 1px solid rgba($color: #fff, $alpha: 0.2);

          span {
            font-size: 14px;
          }
          div {
            display: flex;
            align-items: center;
            font-size: 28px;
            font-weight: bold;

            p {
              position: relative;
              height: auto !important;

              @mixin ico($width, $height, $imgname) {
                content: '';
                display: block;
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                width: $width;
                height: $height;
                background: url($imgname) 50% 50% / cover no-repeat;
              }
              &.volume-hydra {
                padding-left: 36px;

                &::before {
                  @include ico(32px, 32px, '~@/assets/img/desktop/hydra/icon-coin-hydra.webp');
                }
              }
              &.volume-draco {
                padding-left: 37px;

                &::before {
                  @include ico(33px, 32px, '~@/assets/img/desktop/hydra/icon-coin-draco.webp');
                }
              }
              &.volume-septarium {
                padding-left: 30px;

                &::before {
                  @include ico(26px, 32px, '~@/assets/img/desktop/hydra/icon-coin-septarium.webp');
                }
              }
            }
            .syn {
              margin: 0 10px;
              font-size: 24px;
            }
          }
        }
      }
    }
  }

  // for Mobile
  .is-mobile & {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100% !important;
    margin: 0;

    .content {
      padding: 16px 24px 24px;

      .btn-close {
        top: 16px;
        right: 16px;
      }
      .text-area {
        gap: 0 4px;
        margin-top: 63px;

        .input-wrap {
          position: relative;
          width: 100%;
          padding: 9px 16px 12px;

          span {
            position: absolute;
            top: -20px;
            left: 0;
            width: 100%;
            text-align: center;
          }
          input {
            text-align: center;
          }
        }
        .btn-calc {
          display: none;
          color: #000;
          text-decoration: none;
        }
      }
      .info-area {
        &.empty {
          height: 276px;

          &::before {
            text-align: center;
            line-height: 21px;
          }
        }
        .list {
          margin-top: 4px;
          padding-left: 0;

          li {
            flex-direction: column;
            padding: 8px 0;

            > span {
              margin-top: 12px;
            }
            div {
              margin: 10px 0 12px;
              font-size: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
