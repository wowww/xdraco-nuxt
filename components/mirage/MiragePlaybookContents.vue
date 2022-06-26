<template>
  <div>
    <div class="top-banner">
      <div class="top-inner">
        <h1 class="bi-top">MIRAGE MULTIVERSE OF MIR4</h1>
        <p class="desc" v-html="$t('s.mirage-playbook.top.desc01')"></p>
        <p class="desc" v-html="$t('s.mirage-playbook.top.desc02')"></p>
      </div>
    </div>

    <section class="section section-video">
      <div class="section__inner">
        <div class="wrap-video" :class="{ 'wrap-video--open': isOpenVideo }">
          <iframe
            src="https://www.youtube.com/embed/DXYSD09JEcI"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>

    <section class="section section1">
      <div class="section__inner">
        <h2 class="section-title" v-html="$t('t.mirage-playbook.sec1')"></h2>
        <p v-html="$t('s.mirage-playbook.sec1.desc01')"></p>
        <p v-html="$t('s.mirage-playbook.sec1.desc02')"></p>
        <div class="wrap-link">
          <div class="item hidden-valley">
            <strong v-html="$t('t.mirage-playbook.hidden-valley-capture')"></strong>
            <a href="#none" class="link" data-tab-index="0" @click="anchoring" v-html="$t('w.mirage-playbook.link')"></a>
          </div>
          <div class="item boss-raid">
            <strong v-html="$t('t.mirage-playbook.boss-raid')"></strong>
            <a href="#none" class="link" data-tab-index="1" @click="anchoring" v-html="$t('w.mirage-playbook.link')"></a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section2">
      <div class="section__inner">
        <h2 class="section-title" v-html="$t('t.mirage-playbook.sec2')"></h2>
        <div class="wrap-define">
          <dl class="define roster">
            <dt v-html="$t('t.mirage-playbook.sec2.part1')"></dt>
            <dd>
              <div class="desc">
                <p v-html="$t('s.mirage-playbook.sec2.part1.desc01')"></p>
                <p v-html="$t('s.mirage-playbook.sec2.part1.desc02')"></p>
              </div>
              <div class="wrap-img">
                <div class="area">
                  <figure class="wrap-image">
                    <img v-if="isMobile" src="@/assets/img/common/mirage-playbook/feature-roster-m.webp" alt="mirage roster" />
                    <img v-else src="@/assets/img/common/mirage-playbook/feature-roster.webp" alt="mirage roster" />
                  </figure>
                </div>
              </div>
            </dd>
          </dl>
          <dl class="define score">
            <dt v-html="$t('t.mirage-playbook.sec2.part2')"></dt>
            <dd>
              <div class="desc">
                <p v-html="$t('s.mirage-playbook.sec2.part2.desc01')"></p>
              </div>
              <div class="wrap-img">
                <div class="area">
                  <figure class="wrap-image">
                    <figcaption v-html="$t('w.mirage-playbook.sec2.part2.caption')"></figcaption>
                    <img
                      v-if="isMobile"
                      src="@/assets/img/common/mirage-playbook/feature-score-m.webp"
                      :alt="$t('w.mirage-playbook.sec2.part2.caption')"
                    />
                    <img v-else src="@/assets/img/common/mirage-playbook/feature-score.webp" :alt="$t('w.mirage-playbook.sec2.part2.caption')" />
                  </figure>
                </div>
              </div>
            </dd>
          </dl>
          <dl class="define enlisting">
            <dt v-html="$t('t.mirage-playbook.sec2.part3')"></dt>
            <dd>
              <div class="desc">
                <p v-html="$t('s.mirage-playbook.sec2.part3.desc01')"></p>
                <p v-html="$t('s.mirage-playbook.sec2.part3.desc02')"></p>
              </div>
              <div class="wrap-img">
                <div class="area">
                  <figure class="wrap-image">
                    <img
                      v-if="isMobile"
                      src="@/assets/img/common/mirage-playbook/feature-enlisting-m.webp"
                      :alt="$t('t.mirage-playbook.sec2.part3')"
                    />
                    <img v-else src="@/assets/img/common/mirage-playbook/feature-enlisting.webp" :alt="$t('t.mirage-playbook.sec2.part3')" />
                  </figure>
                </div>
              </div>
            </dd>
          </dl>
          <dl class="define vigor">
            <dt v-html="$t('t.mirage-playbook.sec2.part4')"></dt>
            <dd>
              <div class="desc">
                <p v-html="$t('s.mirage-playbook.sec2.part4.desc01')"></p>
                <p v-html="$t('s.mirage-playbook.sec2.part4.desc02')"></p>
              </div>
              <div class="wrap-img">
                <div class="area">
                  <figure class="wrap-image">
                    <img v-show="!isMobile" src="@/assets/img/common/mirage-playbook/feature-vigor.webp" :alt="$t('t.mirage-playbook.sec2.part4')" />
                  </figure>
                </div>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </section>

    <section class="section section3">
      <div class="section__inner">
        <h3 class="section-title" v-html="$t('t.mirage.playbook.lockout-schedule')"></h3>
        <p class="desc" v-html="$t('s.mirage.playbook.lockout-schedule.desc1')"></p>
        <ul class="list-caution">
          <li v-html="$t('s.mirage.playbook.lockout-schedule.caution1')"></li>
        </ul>
        <template v-if="isMobile">
          <div class="lock-schedule"></div>
        </template>
        <template v-else>
          <img src="@/assets/img/common/mirage-playbook/img-time-table.webp" width="960" alt="mirage lockout schedule" />
        </template>
      </div>
    </section>

    <section class="section section-tabs" :class="{ 'tab-hidden-valley': contentTab <= 0, 'tab-boss-raid': contentTab === 1 }">
      <div class="section__inner">
        <v-tabs v-model="contentTab" class="tab-rounds">
          <v-tab><div v-html="$t('t.mirage-playbook.hidden-valley-capture')"/></v-tab>
          <v-tab><div v-html="$t('t.mirage-playbook.boss-raid')" /></v-tab>
        </v-tabs>
        <v-tabs-items v-model="contentTab" touchless>
          <v-tab-item>
            <section class="section section4">
              <div class="section__inner">
                <h2 class="section-title" v-html="$t('t.mirage-playbook.hidden-valley-capture')"></h2>
                <div class="desc">
                  <p v-html="$t('s.mirage-playbook.sec3.desc01')"></p>
                  <p v-html="$t('s.mirage-playbook.sec3.desc02')"></p>
                </div>

                <table v-if="!isMobile" class="table">
                  <caption v-html="$t('t.mirage-playbook.hidden-valley-capture')"></caption>
                  <thead>
                    <tr>
                      <th scope="col" v-html="$t('t.mirage-playbook.sec3.part1.heading01')"></th>
                      <th scope="col" v-html="$t('t.mirage-playbook.sec3.part1.heading02')"></th>
                      <th scope="col" v-html="$t('t.mirage-playbook.sec3.part1.heading03')"></th>
                      <th scope="col" v-html="$t('t.mirage-playbook.sec3.part1.heading04')"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <em class="server" v-html="$t('w.mirage-playbook.sec3.part1.redmoon')"></em>
                      </td>
                      <td>
                        <span class="value">
                          <img src="@/assets/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                          {{ $t('w.mirage-playbook.ds.mined-total') }}
                        </span>
                      </td>
                      <td>
                        <span class="value">
                          <img src="@/assets/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                          <span class="txt-sm" v-html="$t('w.mirage-playbook.ds.mined.redmoon')"></span>
                        </span>
                      </td>
                      <td>
                        <span class="value">
                          <img src="@/assets/img/common/mirage-playbook/ico-mirage.webp" width="20" alt="mirage" />
                          {{ $t('w.mirage-playbook.max-node.redmoon') }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <em class="server" v-html="$t('w.mirage-playbook.sec3.part1.snake')"></em>
                      </td>
                      <td>
                        <span class="value">
                          <img src="@/assets/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                          {{ $t('w.mirage-playbook.ds.mined-total') }}
                        </span>
                      </td>
                      <td>
                        <span class="value">
                          <img src="@/assets/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                          <span class="txt-sm" v-html="$t('w.mirage-playbook.ds.mined.snake')"></span>
                        </span>
                      </td>
                      <td>
                        <span class="value">
                          <img src="@/assets/img/common/mirage-playbook/ico-mirage.webp" width="20" alt="mirage" />
                          {{ $t('w.mirage-playbook.max-node.snake') }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <em class="server" v-html="$t('w.mirage-playbook.sec3.part1.bicheon')"></em>
                      </td>
                      <td>
                        <span class="value">
                          <img src="@/assets/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                          {{ $t('w.mirage-playbook.ds.mined-total') }}
                        </span>
                      </td>
                      <td>
                        <span class="value">
                          <img src="@/assets/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                          <span class="txt-sm" v-html="$t('w.mirage-playbook.ds.mined.bicheon')"></span>
                        </span>
                      </td>
                      <td>
                        <span class="value">
                          <img src="@/assets/img/common/mirage-playbook/ico-mirage.webp" width="20" alt="mirage" />
                          {{ $t('w.mirage-playbook.max-node.bicheon') }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-else class="wrap-ds-info">
                  <h3 class="title-table" v-html="$t('t.mirage-playbook.hidden-valley-capture')"></h3>
                  <ul class="list-ds-info">
                    <li>
                      <strong class="info-title" v-html="$t('w.mirage-playbook.sec3.part1.redmoon')"></strong>
                      <ul class="list-sub-info">
                        <li>
                          <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part1.heading02')"></span>
                          <span class="value">
                            <img src="@/assets/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                            {{ $t('w.mirage-playbook.ds.mined-total') }}
                          </span>
                        </li>
                        <li>
                          <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part1.heading03')"></span>
                          <span class="value">
                            <img src="@/assets/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                            <span class="txt-sm" v-html="$t('w.mirage-playbook.ds.mined.redmoon')"></span>
                          </span>
                        </li>
                        <li>
                          <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part1.heading04')"></span>
                          <span class="value mirage">
                            <img src="@/assets/img/common/mirage-playbook/ico-mirage.webp" width="20" alt="mirage" />
                            {{ $t('w.mirage-playbook.max-node.redmoon') }}
                          </span>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong class="info-title" v-html="$t('w.mirage-playbook.sec3.part1.snake')"></strong>
                      <ul class="list-sub-info">
                        <li>
                          <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part1.heading02')"></span>
                          <span class="value">
                            <img src="@/assets/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                            {{ $t('w.mirage-playbook.ds.mined-total') }}
                          </span>
                        </li>
                        <li>
                          <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part1.heading03')"></span>
                          <span class="value">
                            <img src="@/assets/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                            <span class="txt-sm" v-html="$t('w.mirage-playbook.ds.mined.snake')"></span>
                          </span>
                        </li>
                        <li>
                          <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part1.heading04')"></span>
                          <span class="value mirage">
                            <img src="@/assets/img/common/mirage-playbook/ico-mirage.webp" width="20" alt="mirage" />
                            {{ $t('w.mirage-playbook.max-node.snake') }}
                          </span>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong class="info-title" v-html="$t('w.mirage-playbook.sec3.part1.bicheon')"></strong>
                      <ul class="list-sub-info">
                        <li>
                          <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part1.heading02')"></span>
                          <span class="value">
                            <img src="@/assets/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                            {{ $t('w.mirage-playbook.ds.mined-total') }}
                          </span>
                        </li>
                        <li>
                          <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part1.heading03')"></span>
                          <span class="value">
                            <img src="@/assets/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                            <span class="txt-sm" v-html="$t('w.mirage-playbook.ds.mined.bicheon')"></span>
                          </span>
                        </li>
                        <li>
                          <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part1.heading04')"></span>
                          <span class="value mirage">
                            <img src="@/assets/img/common/mirage-playbook/ico-mirage.webp" width="20" alt="mirage" />
                            {{ $t('w.mirage-playbook.max-node.bicheon') }}
                          </span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <ul class="list-caution">
                  <li v-html="$t('s.mirage-playbook.sec3.part1.caution01')"></li>
                  <li v-html="$t('s.mirage-playbook.sec3.part1.caution02')"></li>
                  <li v-html="$t('s.mirage-playbook.sec3.part1.caution03')"></li>
                </ul>
                <table v-show="!isMobile" class="table">
                  <caption v-html="$t('t.mirage-playbook.sec3.part2')"></caption>
                  <colgroup>
                    <col style="width: 240px" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col" v-html="$t('t.mirage-playbook.sec3.part1.heading01')"></th>
                      <th scope="col" v-html="$t('t.mirage-playbook.sec3.part2.heading02')"></th>
                      <th scope="col" v-html="$t('t.mirage-playbook.sec3.part2.heading03')"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <em class="server" v-html="$t('w.mirage-playbook.sec3.part1.redmoon')"></em>
                      </td>
                      <td>
                        <span class="value-txt" v-html="$t('w.mirage-playbook.sec3.part2.epic')"></span>
                        <span class="value-ps">(PS 170,000~)</span>
                      </td>
                      <td>
                        <span class="value-txt" v-html="$t('w.mirage-playbook.sec3.part2.heading03')"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <em class="server" v-html="$t('w.mirage-playbook.sec3.part1.snake')"></em>
                      </td>
                      <td>
                        <span class="value-txt" v-html="$t('w.mirage-playbook.sec3.part2.rare')"></span>
                        <span class="value-ps">(PS 135,000~)</span>
                      </td>
                      <td>
                        <span class="value-txt" v-html="$t('w.mirage-playbook.sec3.part2.heading03')"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <em class="server" v-html="$t('w.mirage-playbook.sec3.part1.bicheon')"></em>
                      </td>
                      <td>
                        <span class="value-txt" v-html="$t('w.mirage-playbook.sec3.part2.uncommon')"></span>
                        <span class="value-ps">(PS 100,000~)</span>
                      </td>
                      <td>
                        <span class="value-txt" v-html="$t('w.mirage-playbook.sec3.part2.heading03')"></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table v-if="!isMobile" class="table type-schedule">
                  <caption v-html="$t('t.mirage-playbook.sec3.part3')"></caption>
                  <thead>
                    <tr>
                      <th scope="col">
                        <img src="@/assets/img/common/mirage-playbook/ico-32-darksteel.webp" width="32" alt="darksteel" />{{
                          $t('w.mirage-playbook.darksteels')
                        }}
                      </th>
                      <th scope="col">
                        <img src="@/assets/img/common/mirage-playbook/ico-32-septaria.webp" width="32" alt="septaria" />{{ $t('w.mirage.septaria') }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div class="wrap-schedule">
                          <div class="item">
                            <dl class="schedule">
                              <dt v-html="$t('t.mirage-playbook.sec3.part3.1st')"></dt>
                              <dd v-html="$t('s.mirage-playbook.sec3.part3.date01')"></dd>
                            </dl>
                          </div>
                          <div class="item">
                            <dl class="schedule">
                              <dt v-html="$t('t.mirage-playbook.sec3.part3.2nd')"></dt>
                              <dd v-html="$t('s.mirage-playbook.sec3.part3.date02')"></dd>
                            </dl>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p v-html="$t('s.mirage-playbook.sec3.part3.date03')"></p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-else class="wrap-ds-info">
                  <h3 class="title-table" v-html="$t('t.mirage-playbook.sec3.part3')"></h3>
                  <ul class="list-ds-info">
                    <li>
                      <strong class="info-title">
                        <img src="@/assets/img/common/mirage-playbook/ico-24-darksteel.webp" width="24" alt="darksteel" />{{
                          $t('w.mirage-playbook.darksteels')
                        }}
                      </strong>
                      <ul class="list-sub-info type-schedule">
                        <li>
                          <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part3.1st')"></span>
                          <p v-html="$t('s.mirage-playbook.sec3.part3.date01')"></p>
                        </li>
                        <li>
                          <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part3.1st')"></span>
                          <p v-html="$t('s.mirage-playbook.sec3.part3.date02')"></p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong class="info-title">
                        <img src="@/assets/img/common/mirage-playbook/ico-20-septaria.webp" width="20" alt="septaria" />{{ $t('w.mirage.septaria') }}
                      </strong>
                      <ul class="list-sub-info type-schedule">
                        <li class="wide">
                          <p v-html="$t('s.mirage-playbook.sec3.part3.date03')"></p>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            <section class="section section5">
              <div class="section__inner">
                <h2 class="section-title" v-html="$t('t.mirage-playbook.sec4')"></h2>
                <ol class="list-process">
                  <li>
                    <strong v-html="$t('t.mirage-playbook.sec4.part1')"></strong>
                    <p v-html="$t('s.mirage-playbook.sec4.part1')"></p>
                    <img src="@/assets/img/common/mirage-playbook/battle-process01.webp" :width="isMobile ? 327 : 399" alt="" />
                  </li>
                  <li>
                    <strong v-html="$t('t.mirage-playbook.sec4.part2')"></strong>
                    <p v-html="$t('s.mirage-playbook.sec4.part2')"></p>
                    <img src="@/assets/img/common/mirage-playbook/battle-process02.webp" :width="isMobile ? 326 : 401" alt="" />
                  </li>
                  <li>
                    <strong v-html="$t('t.mirage-playbook.sec4.part3')"></strong>
                    <p v-html="$t('w.mirage-playbook.sec4.part3')"></p>
                    <img src="@/assets/img/common/mirage-playbook/battle-process03.webp" :width="isMobile ? 327 : 399" alt="" />
                  </li>
                  <li>
                    <strong v-html="$t('t.mirage-playbook.sec4.part4')"></strong>
                    <p v-html="$t('w.mirage-playbook.sec4.part4')"></p>
                    <img src="@/assets/img/common/mirage-playbook/battle-process04.webp" :width="isMobile ? 327 : 394" alt="" />
                  </li>
                </ol>
              </div>
            </section>

            <section class="section section6">
              <div class="section__inner">
                <h2 class="section-title" v-html="$t('t.mirage-playbook.sec5')"></h2>
                <p class="desc" v-html="$t('w.mirage-playbook.sec5.desc01')"></p>
                <ul v-show="isMobile" class="list-caution">
                  <li v-html="$t('s.mirage-playbook.sec5.caution01')"></li>
                </ul>
                <ul class="list-requirement">
                  <li>
                    <div class="heading">
                      <h3 v-html="$t('w.mirage-playbook.sec5.enlist')"></h3>
                      <p v-html="$t('s.mirage-playbook.sec5.part1.word01')"></p>
                    </div>
                    <ul class="list-vigor">
                      <li>
                        <div class="vigor-title">
                          <span v-html="$t('s.mirage-playbook.sec5.part1.word02')"></span>
                        </div>
                        <div>
                          <span class="vigor">8 {{ $t('w.mirage-playbook.sec5.vigor') }}</span>
                        </div>
                      </li>
                      <li>
                        <div class="vigor-title">
                          <span v-html="$t('s.mirage-playbook.sec5.part1.word03')"></span>
                        </div>
                        <div>
                          <span class="vigor">4 {{ $t('w.mirage-playbook.sec5.vigor') }}</span>
                        </div>
                      </li>
                      <li>
                        <div class="vigor-title">
                          <span v-html="$t('s.mirage-playbook.sec5.part1.word04')"></span>
                        </div>
                        <div>
                          <span class="vigor">2 {{ $t('w.mirage-playbook.sec5.vigor') }}</span>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div class="heading">
                      <h3 v-html="$t('w.mirage-playbook.sec5.assault')"></h3>
                      <p v-html="$t('s.mirage-playbook.sec5.part2.word01')"></p>
                    </div>
                    <ul class="list-vigor">
                      <li>
                        <div class="vigor-title">
                          <span v-html="$t('s.mirage-playbook.sec5.part1.word02')"></span>
                        </div>
                        <div>
                          <span class="vigor">16 {{ $t('w.mirage-playbook.sec5.vigor') }}</span>
                        </div>
                      </li>
                      <li>
                        <div class="vigor-title">
                          <span v-html="$t('s.mirage-playbook.sec5.part1.word03')"></span>
                        </div>
                        <div>
                          <span class="vigor">8 {{ $t('w.mirage-playbook.sec5.vigor') }}</span>
                        </div>
                      </li>
                      <li>
                        <div class="vigor-title">
                          <span v-html="$t('s.mirage-playbook.sec5.part1.word04')"></span>
                        </div>
                        <div>
                          <span class="vigor">4 {{ $t('w.mirage-playbook.sec5.vigor') }}</span>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div class="heading">
                      <h3 v-html="$t('w.mirage-playbook.sec5.wound-recovery')"></h3>
                      <p v-html="$t('s.mirage-playbook.sec5.part3.word01')"></p>
                    </div>
                    <ul class="list-vigor">
                      <li>
                        <div class="vigor-title">
                          <span v-html="$t('s.mirage-playbook.sec5.part3.word02')"></span>
                        </div>
                        <div>
                          <span class="vigor">12 {{ $t('w.mirage-playbook.sec5.vigor') }}</span>
                        </div>
                      </li>
                      <li>
                        <div class="vigor-title">
                          <span v-html="$t('s.mirage-playbook.sec5.part3.word03')"></span>
                        </div>
                        <div>
                          <span class="vigor">28 {{ $t('w.mirage-playbook.sec5.vigor') }}</span>
                        </div>
                      </li>
                      <li>
                        <div class="vigor-title">
                          <span v-html="$t('s.mirage-playbook.sec5.part3.word04')"></span>
                        </div>
                        <div>
                          <span class="vigor">56 {{ $t('w.mirage-playbook.sec5.vigor') }}</span>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul v-show="!isMobile" class="list-caution">
                  <li v-html="$t('s.mirage-playbook.sec5.caution01')"></li>
                </ul>
              </div>
            </section>

            <section class="section section7">
              <div class="section__inner">
                <h2 class="section-title" v-html="$t('t.mirage-playbook.sec6')"></h2>
                <p class="desc" v-html="$t('s.mirage-playbook.sec6.desc01')"></p>
                <p class="desc" v-html="$t('s.mirage-playbook.sec6.desc02')"></p>
                <dl class="list-battle">
                  <div class="enlist">
                    <dt v-html="$t('w.mirage-playbook.sec5.enlist')"></dt>
                    <dd>
                      <p v-html="$t('s.mirage-playbook.sec6.desc03')"></p>
                    </dd>
                  </div>
                  <div class="assault">
                    <dt v-html="$t('w.mirage-playbook.sec5.assault')"></dt>
                    <dd>
                      <p v-html="$t('s.mirage-playbook.sec6.desc04')"></p>
                    </dd>
                  </div>
                  <div class="recover">
                    <dt v-html="$t('w.mirage-playbook.sec7.recover')"></dt>
                    <dd>
                      <p v-html="$t('s.mirage-playbook.sec6.desc05')"></p>
                    </dd>
                  </div>
                  <div class="retreat">
                    <dt v-html="$t('w.mirage-playbook.sec6.retreat')"></dt>
                    <dd>
                      <p v-html="$t('s.mirage-playbook.sec6.desc06')"></p>
                    </dd>
                  </div>
                </dl>
              </div>
            </section>

            <section class="section section8">
              <div class="section__inner">
                <div class="wrap-system">
                  <div class="item">
                    <h2 class="section-title" v-html="$t('t.mirage-playbook.sec7')"></h2>
                    <p class="desc" v-html="$t('s.mirage-playbook.sec7.desc01')"></p>
                    <p class="desc" v-html="$t('s.mirage-playbook.sec7.desc02')"></p>
                  </div>
                  <div class="item">
                    <ul class="list-wound">
                      <li class="normal">
                        <div v-if="isMobile" class="wrap-bg"></div>
                        <dl class="define-state">
                          <dt v-html="$t('w.mirage-playbook.sec7.wounded')"></dt>
                          <dd>
                            <ul class="list-desc">
                              <li>
                                <span class="desc-title" v-html="$t('w.mirage-playbook.sec7.chance')"></span>
                                <span class="desc-cont" v-html="$t('w.mirage-playbook.sec7.defeat01')"></span>
                              </li>
                              <li>
                                <span class="desc-title" v-html="$t('w.mirage-playbook.sec7.duration')"></span>
                                <span class="desc-cont" v-html="$t('w.mirage-playbook.sec7.hours01')"/>
                              </li>
                            </ul>
                          </dd>
                        </dl>
                      </li>
                      <li class="serious">
                        <div v-if="isMobile" class="wrap-bg"></div>
                        <dl class="define-state">
                          <dt v-html="$t('w.mirage-playbook.sec7.serious')"></dt>
                          <dd>
                            <ul class="list-desc">
                              <li>
                                <span class="desc-title" v-html="$t('w.mirage-playbook.sec7.chance')"></span>
                                <span class="desc-cont" v-html="$t('w.mirage-playbook.sec7.defeat02')"></span>
                              </li>
                              <li>
                                <span class="desc-title" v-html="$t('w.mirage-playbook.sec7.duration')"></span>
                                <span class="desc-cont" v-html="$t('w.mirage-playbook.sec7.hours02')"></span>
                              </li>
                            </ul>
                          </dd>
                        </dl>
                      </li>
                      <li class="critical">
                        <div v-if="isMobile" class="wrap-bg"></div>
                        <dl class="define-state">
                          <dt v-html="$t('w.mirage-playbook.sec7.critical')"></dt>
                          <dd>
                            <ul class="list-desc">
                              <li>
                                <span class="desc-title" v-html="$t('w.mirage-playbook.sec7.chance')"></span>
                                <span class="desc-cont" v-html="$t('w.mirage-playbook.sec7.defeat03')"></span>
                              </li>
                              <li>
                                <span class="desc-title" v-html="$t('w.mirage-playbook.sec7.duration')"></span>
                                <span class="desc-cont" v-html="$t('w.mirage-playbook.sec7.hours03')"></span>
                              </li>
                            </ul>
                          </dd>
                        </dl>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section class="section section9">
              <div class="section__inner">
                <h2 class="section-title" v-html="$t('t.mirage-playbook.sec8')"></h2>
                <p class="desc" v-html="$t('s.mirage-playbook.sec8.desc01')"></p>
                <p class="desc" v-html="$t('s.mirage-playbook.sec8.desc02')"></p>
              </div>
            </section>

            <section class="section section10">
              <div class="section__inner">
                <h2 class="section-title" v-html="$t('t.mirage-playbook.sec9')"></h2>
                <p class="desc" v-html="$t('s.mirage-playbook.sec9.desc01')"></p>
                <p class="desc" v-html="$t('s.mirage-playbook.sec9.desc02')"></p>
                <div class="wrap-img">
                  <div class="item">
                    <div class="define-bonus">
                      <span v-html="$t('w.mirage-playbook.sec9.character01')"></span>
                      <span class="tobe">{{ $t('s.mirage-playbook.sec9.score-bonus') }} <em>0%</em> </span>
                    </div>
                    <img v-if="isMobile" src="@/assets/img/common/mirage-playbook/party-character01-m.webp" width="315" alt="1character" />
                    <img v-else src="@/assets/img/common/mirage-playbook/party-character01.webp" alt="1character" />
                  </div>
                  <div class="item">
                    <div class="define-bonus">
                      <span v-html="$t('w.mirage-playbook.sec9.character05')"></span>
                      <span class="tobe">{{ $t('s.mirage-playbook.sec9.score-bonus') }} <em>7%</em> </span>
                    </div>
                    <img v-if="isMobile" src="@/assets/img/common/mirage-playbook/party-character02-m.webp" width="315" alt="5characters" />
                    <img v-else src="@/assets/img/common/mirage-playbook/party-character02.webp" alt="5characters" />
                  </div>
                </div>
                <div class="wrap-bonus">
                  <div class="item">
                    <p class="desc" v-html="$t('s.mirage-playbook.sec9.desc03')"></p>
                  </div>
                  <div class="item">
                    <span class="subject" v-html="$t('w.mirage-playbook.sec9.party-bonus')"></span>
                    <ul class="list-bonus">
                      <li>
                        <div class="define-title">
                          <span v-html="$t('w.mirage-playbook.sec9.party-size')"></span>
                          <span class="txt-character" v-html="$t('w.mirage-playbook.sec9.character05')"></span>
                        </div>
                        <span class="tobe">{{ $t('s.mirage-playbook.sec9.score-bonus') }} <em>7%</em> </span>
                      </li>
                      <li>
                        <div class="define-title">
                          <span v-html="$t('w.mirage-playbook.sec9.party-size')"></span>
                          <span class="txt-character" v-html="$t('w.mirage-playbook.sec9.character04')"></span>
                        </div>
                        <span class="tobe">{{ $t('s.mirage-playbook.sec9.score-bonus') }} <em>4%</em> </span>
                      </li>
                      <li>
                        <div class="define-title">
                          <span v-html="$t('w.mirage-playbook.sec9.party-size')"></span>
                          <span class="txt-character" v-html="$t('w.mirage-playbook.sec9.character03')"></span>
                        </div>
                        <span class="tobe">{{ $t('s.mirage-playbook.sec9.score-bonus') }} <em>2%</em> </span>
                      </li>
                      <li>
                        <div class="define-title">
                          <span v-html="$t('w.mirage-playbook.sec9.party-size')"></span>
                          <span class="txt-character" v-html="$t('w.mirage-playbook.sec9.character02')"></span>
                        </div>
                        <span class="tobe">{{ $t('s.mirage-playbook.sec9.score-bonus') }} <em>1%</em> </span>
                      </li>
                      <li>
                        <div class="define-title">
                          <span v-html="$t('w.mirage-playbook.sec9.party-size')"></span>
                          <span class="txt-character" v-html="$t('w.mirage-playbook.sec9.character01')"></span>
                        </div>
                        <span class="tobe">{{ $t('s.mirage-playbook.sec9.score-bonus') }} <em>0%</em> </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </v-tab-item>
          <v-tab-item>
            <section class="section section11">
              <div class="section__inner">
                <h2 class="section-title" v-html="$t('t.mirage-playbook.boss-raid')"></h2>
                <p class="desc" v-html="$t('s.mirage.playbook.boss-raid.desc1')"></p>
              </div>
            </section>
            <section class="section section12">
              <div class="section__inner">
                <div class="wrap-define">
                  <dl class="define bidding">
                    <dt v-html="$t('t.mirage.playbook.bidding-system')"></dt>
                    <dd>
                      <div class="desc">
                        <p v-html="$t('s.mirage.playbook.bidding-system.desc1')"></p>
                        <p v-html="$t('s.mirage.playbook.bidding-system.desc2')"></p>
                        <p v-html="$t('s.mirage.playbook.bidding-system.desc3')"></p>
                      </div>
                      <div class="wrap-img">
                        <div class="area">
                          <figure class="wrap-image">
                            <img v-if="isMobile" src="@/assets/img/common/mirage-playbook/img-bossraid-bidding-m.webp" alt="Bidding System" />
                            <img v-else src="@/assets/img/common/mirage-playbook/img-bossraid-bidding.webp" alt="Bidding System" />
                          </figure>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </section>
            <section class="section section13">
              <div class="section__inner">
                <h3 class="section-title" v-html="$t('t.mirage.playbook.ranking-system')"></h3>
                <p class="desc" v-html="$t('s.mirage.playbook.ranking-system.desc1')"></p>
                <p class="desc" v-html="$t('s.mirage.playbook.ranking-system.desc2')"></p>
                <div class="title-table-rank" v-html="$t('t.mirage.playbook.ranking-system.table1')"></div>
                <ol class="list-table-rank">
                  <li>
                    <div class="title-rank">1st</div>
                    <div class="data-value">40%</div>
                  </li>
                  <li>
                    <div class="title-rank">2nd</div>
                    <div class="data-value">38%</div>
                  </li>
                  <li>
                    <div class="title-rank">3rd</div>
                    <div class="data-value">36%</div>
                  </li>
                  <li>
                    <div class="title-rank">4th</div>
                    <div class="data-value">34%</div>
                  </li>
                  <li>
                    <div class="title-rank">5th</div>
                    <div class="data-value">32%</div>
                  </li>
                  <li>
                    <div class="title-rank">6th</div>
                    <div class="data-value">30%</div>
                  </li>
                  <li>
                    <div class="title-rank">7th</div>
                    <div class="data-value">28%</div>
                  </li>
                  <li>
                    <div class="title-rank">8th</div>
                    <div class="data-value">26%</div>
                  </li>
                  <li>
                    <div class="title-rank">9th</div>
                    <div class="data-value">24%</div>
                  </li>
                  <li>
                    <div class="title-rank">10th</div>
                    <div class="data-value">22%</div>
                  </li>
                </ol>
                <div class="title-table-rank" v-html="$t('t.mirage.playbook.ranking-system.table2')" />
                <ol class="list-table-rank">
                  <li>
                    <div class="title-rank">1st</div>
                    <div class="data-value">30%</div>
                  </li>
                  <li>
                    <div class="title-rank">2nd</div>
                    <div class="data-value">27%</div>
                  </li>
                  <li>
                    <div class="title-rank">3rd</div>
                    <div class="data-value">24%</div>
                  </li>
                  <li>
                    <div class="title-rank">4th</div>
                    <div class="data-value">21%</div>
                  </li>
                  <li>
                    <div class="title-rank">5th</div>
                    <div class="data-value">18%</div>
                  </li>
                  <li>
                    <div class="title-rank">6th</div>
                    <div class="data-value">15%</div>
                  </li>
                  <li>
                    <div class="title-rank">7th</div>
                    <div class="data-value">12%</div>
                  </li>
                  <li>
                    <div class="title-rank">8th</div>
                    <div class="data-value">9%</div>
                  </li>
                  <li>
                    <div class="title-rank">9th</div>
                    <div class="data-value">6%</div>
                  </li>
                  <li>
                    <div class="title-rank">10th</div>
                    <div class="data-value">3%</div>
                  </li>
                </ol>
              </div>
            </section>
            <section class="section section14">
              <div class="section__inner">
                <h3 class="section-title" v-html="$t('t.mirage.playbook.wound-system')" />
                <p class="desc" v-html="$t('s.mirage.playbook.wound-system.desc1')"></p>
                <p class="desc" v-html="$t('s.mirage.playbook.wound-system.desc2')"></p>
                <div class="title-table-rank" v-html="$t('t.mirage.playbook.wound-system.table1')"></div>
                <ol class="list-table-rank">
                  <li>
                    <div class="title-rank">1st</div>
                    <div class="data-value">3%</div>
                  </li>
                  <li>
                    <div class="title-rank">2nd</div>
                    <div class="data-value">6%</div>
                  </li>
                  <li>
                    <div class="title-rank">3rd</div>
                    <div class="data-value">7%</div>
                  </li>
                  <li>
                    <div class="title-rank">4th</div>
                    <div class="data-value">8%</div>
                  </li>
                  <li>
                    <div class="title-rank">5th</div>
                    <div class="data-value">9%</div>
                  </li>
                  <li>
                    <div class="title-rank">6th</div>
                    <div class="data-value">10%</div>
                  </li>
                  <li>
                    <div class="title-rank">7th</div>
                    <div class="data-value">13%</div>
                  </li>
                  <li>
                    <div class="title-rank">8th</div>
                    <div class="data-value">15%</div>
                  </li>
                  <li>
                    <div class="title-rank">9th</div>
                    <div class="data-value">18%</div>
                  </li>
                  <li>
                    <div class="title-rank">10th</div>
                    <div class="data-value">20%</div>
                  </li>
                </ol>
                <p class="desc" v-html="$t('s.mirage.playbook.wound-system.desc3')"></p>
                <div v-if="isMobile" class="status-wound">
                  <div>
                    <img src="@/assets/img/common/mirage-playbook/img-status-wound1-m.webp" alt="wounded" />
                  </div>
                  <div>
                    <img src="@/assets/img/common/mirage-playbook/img-status-wound2-m.webp" alt="seriosly wounded" />
                  </div>
                  <div>
                    <img src="@/assets/img/common/mirage-playbook/img-status-wound3-m.webp" alt="critically wounded" />
                  </div>
                </div>
                <div v-else class="status-wound">
                  <div>
                    <img src="@/assets/img/common/mirage-playbook/img-status-wound1.webp" alt="wounded" />
                  </div>
                  <div>
                    <img src="@/assets/img/common/mirage-playbook/img-status-wound2.webp" alt="seriosly wounded" />
                  </div>
                  <div>
                    <img src="@/assets/img/common/mirage-playbook/img-status-wound3.webp" alt="critically wounded" />
                  </div>
                </div>
                <ul class="list-caution">
                  <li v-html="$t('s.mirage.playbook.wound-system.caution1')"></li>
                </ul>
              </div>
            </section>
            <section class="section section15">
              <div class="section__inner">
                <div class="wrap-define">
                  <dl class="define">
                    <dt v-html="$t('t.mirage.playbook.curse-system')" />
                    <dd>
                      <div class="desc">
                        <p v-html="$t('s.mirage.playbook.curse-system.desc1')"></p>
                        <p v-html="$t('s.mirage.playbook.curse-system.desc2')"></p>
                        <p v-html="$t('s.mirage.playbook.curse-system.desc3')"></p>
                        <ul class="list-caution">
                          <li v-html="$t('s.mirage.playbook.curse-system.caution1')"></li>
                        </ul>
                      </div>
                      <div class="wrap-img">
                        <div class="area">
                          <figure class="wrap-image">
                            <img v-if="!isMobile" src="@/assets/img/common/mirage-playbook/img-curse-system.webp" alt="curse System" />
                          </figure>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </section>
            <section class="section section16">
              <div class="section__inner">
                <h3 class="section-title" v-html="$t('t.mirage.playbook.boss-reward')"></h3>
                <div class="boss-wrap">
                  <div v-if="isMobile" class="boss-name" v-html="$t('t.mirage.playbook.boss-eunsil')"></div>
                  <div class="boss-thumb">
                    <img src="@/assets/img/common/mirage-playbook/img-boss-eunsil.webp" alt="boss eunsil" />
                  </div>
                  <div class="boss-intro">
                    <span v-if="!isMobile" class="boss-name" v-html="$t('t.mirage.playbook.boss-eunsil')"></span>
                    <p class="desc" v-html="$t('s.mirage.playbook.boss-eunsil.desc1')"></p>
                  </div>
                </div>
                <div v-viewer="viewerOption" class="boss-reward">
                  <div class="reward-item by-viewer warrior">
                    <img src="@/assets/img/common/mirage-playbook/reward-warrior-origin.webp" alt="warrior avatar" />
                    <div class="reward-item-title" v-html="$t('w.mirage.playbook.boss-reward.reward1')"></div>
                    <div class="reward-category" v-html="$t('w.rounds.item.class.1')"></div>
                  </div>
                  <div class="reward-item by-viewer sorcerer">
                    <img src="@/assets/img/common/mirage-playbook/reward-sorcerer-origin.webp" alt="sorcerer avatar" />
                    <div class="reward-item-title" v-html="$t('w.mirage.playbook.boss-reward.reward2')"></div>
                    <div class="reward-category" v-html="$t('w.rounds.item.class.2')"></div>
                  </div>
                  <div class="reward-item by-viewer taoist">
                    <img src="@/assets/img/common/mirage-playbook/reward-taoist-origin.webp" alt="taoist avatar" />
                    <div class="reward-item-title" v-html="$t('w.mirage.playbook.boss-reward.reward3')"></div>
                    <div class="reward-category" v-html="$t('w.rounds.item.class.3')"></div>
                  </div>
                  <div class="reward-item by-viewer lancer">
                    <img src="@/assets/img/common/mirage-playbook/reward-lancer-origin.webp" alt="lancer avatar" />
                    <div class="reward-item-title" v-html="$t('w.mirage.playbook.boss-reward.reward4')"></div>
                    <div class="reward-category" v-html="$t('w.rounds.item.class.5')"></div>
                  </div>
                  <div class="reward-item by-viewer arbalist">
                    <img src="@/assets/img/common/mirage-playbook/reward-arbalist-origin.webp" alt="arbalist avatar" />
                    <div class="reward-item-title" v-html="$t('w.mirage.playbook.boss-reward.reward5')"></div>
                    <div class="reward-category" v-html="$t('w.rounds.item.class.4')"></div>
                  </div>
                </div>
                <div class="boss-wrap">
                  <div v-if="isMobile" class="boss-name" v-html="$t('t.mirage.playbook.boss-horang')"></div>
                  <div class="boss-thumb" :class="{ right: !isMobile }">
                    <img src="@/assets/img/common/mirage-playbook/img-boss-horang.webp" alt="boss horang" />
                  </div>
                  <div class="boss-intro">
                    <span v-if="!isMobile" class="boss-name" v-html="$t('t.mirage.playbook.boss-horang')"></span>
                    <p class="desc" v-html="$t('s.mirage.playbook.boss-horang.desc1')"></p>
                  </div>
                </div>
                <div v-viewer="viewerOption" class="boss-reward mount">
                  <div class="reward-item by-viewer mount1">
                    <img src="@/assets/img/common/mirage-playbook/reward-mount-1-origin.webp" alt="mount avatar" />
                    <div class="reward-item-title" v-html="$t('w.mirage.playbook.boss-reward.reward6')"></div>
                    <div class="reward-category" v-html="$t('w.mirage.playbook.boss-reward.mount')"></div>
                  </div>
                  <div class="reward-item by-viewer mount2">
                    <img src="@/assets/img/common/mirage-playbook/reward-mount-2-origin.webp" alt="mount avatar" />
                    <div class="reward-item-title" v-html="$t('w.mirage.playbook.boss-reward.reward7')"></div>
                    <div class="reward-category" v-html="$t('w.mirage.playbook.boss-reward.mount')"></div>
                  </div>
                </div>
              </div>
            </section>

            <section class="section section17">
              <div class="section__inner">
                <div class="img-wrap">
                  <div v-if="isMobile" class="img-title" v-html="$t('t.mirage.playbook.scroll-enhancement')"></div>
                  <div class="img-thumb" :class="{ right: !isMobile }">
                    <img src="@/assets/img/common/mirage-playbook/img-mirage-scroll.webp" alt="mirage scroll" />
                  </div>
                  <div class="img-intro">
                    <span v-if="!isMobile" class="img-title" v-html="$t('t.mirage.playbook.scroll-enhancement')"></span>
                    <p class="desc" v-html="$t('s.mirage.playbook.scroll-enhancement.desc1')"></p>
                    <p class="desc" v-html="$t('s.mirage.playbook.scroll-enhancement.desc2')"></p>
                    <ul class="list-caution">
                      <li v-html="$t('s.mirage.playbook.scroll-enhancement.caution1')"></li>
                      <li v-html="$t('s.mirage.playbook.scroll-enhancement.caution2')"></li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            <section class="section section18">
              <div class="section__inner">
                <div class="wrap-define">
                  <dl class="define reward-items">
                    <dt v-html="$t('t.mirage.playbook.reward-storage')"></dt>
                    <dd>
                      <div class="desc">
                        <p v-html="$t('s.mirage.playbook.reward-storage.desc1')"></p>
                        <p v-html="$t('s.mirage.playbook.reward-storage.desc2')"></p>
                      </div>
                      <div class="wrap-img">
                        <div class="area">
                          <figure class="wrap-image">
                            <img src="@/assets/img/common/mirage-playbook/img-reward-card.webp" alt="reward items" />
                          </figure>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </section>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, watch } from '@vue/composition-api';
import { directive as viewer } from 'v-viewer';
import 'viewerjs/dist/viewer.css';

import goTo from 'vuetify/lib/services/goto';

export default defineComponent({
  name: 'MiragePlaybookContents',
  components: {
    //
  },
  directives: {
    viewer: viewer({
      debug: true,
    }),
  },
  setup(props, { root }) {
    const state = reactive({
      viewerOption: {
        toolbar: false,
        title: false,
        filter(img) {
          return img.parentNode.classList.contains('by-viewer');
        },
      },
    });
    return {
      ...toRefs(state),
    };
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
    contentTab: 0,
    isOpenVideo: false,
  }),
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
  mounted() {
    setTimeout(() => {
      this.isOpenVideo = !this.isOpenVideo;
    }, 400);
  },
  methods: {
    anchoring(e) {
      const tabElement = document.querySelector('.section-tabs');

      e.preventDefault();
      goTo(tabElement);
      this.contentTab = e.target.dataset.tabIndex * 1;
    },
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/mirage-playbook';
</style>
