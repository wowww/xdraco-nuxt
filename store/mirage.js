import dayjs from 'dayjs';
import { forEach, merge } from 'lodash';

const closedDuration = Number(process.env.VUE_APP_MIRAGE_CLOSED_DURATION);

export const namespaced = true;

export const state = () => ({
  currentServer: null,
  valleyMeta: null,
  valleyList: null,
  valleyCapture: null, // FIXME: 이름 바꿀 필요 있음.
  serverInfo: null,
  stakeInfo: null,
  stakeInfoLoading: false,
  accountServerInfo: null,
  accountInfo: null,
  rostersLoading: false,
  rosters: [],
  sealList: [],
  visibleMinting: false,
  mintingSymbolIdx: 0,
  visibleChargeVigor: false,

  visibleEnlist: false,
  enlistCharacterUID: '',
  enlistMode: 'enlist',
  enlistClass: 0,
  enlistServer: '',
  enlistValley: 0,

  visibleEnlistResult: false,
  enlistResultResponse: null,

  valleyResult: null,
  valleyRank: null,

  visibleRanking: false,
  visibleMyResult: false,

  visibleRetreat: false,

  allLogList: [],
  logList: [],

  openLoading: false,
  bossRaids: [],
  bossRaid: null,
  items: [],
  bossRaidLogs: [],
  bossRaidLogPageID: 1,
  bossRaidLogPageSize: 10,
  bossRaidLogCount: 0,

  modalBossRaid: {
    visible: false,
    class: '',
  },
  modalSelectedCharacterUID: '',
  modalSelectedValley: {
    serverId: '',
    valleyId: '',
  },
  visibleRecover: false,
  visibleDispel: false,
  visibleSeal: false,
  modalCharacterInfo: {
    visible: false,
    characterUID: '',
  },
  now: null,
  mirageInterval: null,
  metaParty: null,
  metaWound: null,
});

export const getters = {
  bossRaidStatus(state) {
    if (!state.bossRaid || !state.bossRaid.schedule || !state.now) {
      return {
        started: false,
        closed: false,
        locked: false,
      };
    }

    const schedule = state.bossRaid.schedule[0];

    const startAt = dayjs.unix(schedule.StartDT).utcOffset(8, false);
    const endAt = dayjs.unix(schedule.EndDT).utcOffset(8, false);

    return {
      started: state.now.isAfter(startAt),
      closed: state.now.isAfter(endAt),
      locked: state.now.isBefore(endAt) && endAt.unix() - state.now.unix() < closedDuration * 60,
    };
  },
  mirageRaidStatus(state) {
    if (!state.bossRaids || !state.now) {
      return {
        started: false,
        closed: false,
        locked: false,
      };
    }
    const now = state.now.unix();
    const currentRaid = state.bossRaids.find((raid) => raid.StartDT <= now && now <= raid.EndDT);

    if (!currentRaid) {
      return {
        started: false,
        closed: false,
        locked: false,
      };
    }

    const startAt = dayjs.unix(currentRaid.StartDT);
    const endAt = dayjs.unix(currentRaid.EndDT);

    return {
      started: state.now.isAfter(startAt),
      closed: state.now.isAfter(endAt),
      locked: state.now.isBefore(endAt) && endAt.unix() - now < closedDuration * 60,
    };
  },
  mirageStatus(state, getters) {
    return { valleyCaptureLocked: getters.valleyCaptureLocked, raidLocked: getters.mirageRaidStatus.locked };
  },
  mirageLock(state, getters) {
    return getters.mirageStatus.valleyCaptureLocked || getters.mirageStatus.raidLocked;
  },
};

export const mutations = {
  setDerby(state, payload) {
    state.derby = payload;
  },
  setValleyList(state, payload) {
    state.valleyList = payload;
  },
  setValleyCapture(state, payload) {
    state.valleyCapture = payload;
  },
  setServerInfo(state, payload) {
    state.serverInfo = payload;
  },
  setStakeInfo(state, payload) {
    state.stakeInfo = { ...payload };
  },
  setStakeInfoLoading(state, payload) {
    state.stakeInfoLoading = payload;
  },
  setAccountServerInfo(state, payload) {
    state.accountServerInfo = payload;
  },
  setAccountInfo(state, payload) {
    state.accountInfo = payload;
  },
  setBalance(state, payload) {
    state.balance = payload;
  },
  setRosters(state, payload) {
    state.rosters = payload;
  },
  setSealList(state, payload) {
    state.sealList = payload;
  },
  setVisibleMinting(state, payload) {
    state.visibleMinting = payload;
  },
  setMintingSymbolIdx(state, payload) {
    state.mintingSymbolIdx = payload;
  },
  setVisibleChargeVigor(state, payload) {
    state.visibleChargeVigor = payload;
  },
  setVisibleRecover(state, payload) {
    state.visibleRecover = payload;
  },
  setVisibleDispel(state, payload) {
    state.visibleDispel = payload;
  },
  setVisibleSeal(state, payload) {
    state.visibleSeal = payload;
  },
  setVisibleEnlist(state, payload) {
    state.visibleEnlist = payload;
  },
  setEnlistMode(state, payload) {
    state.enlistMode = payload;
  },
  setEnlistClass(state, payload) {
    state.enlistClass = payload;
  },
  setEnlistServer(state, payload) {
    state.enlistServer = payload;
  },
  setEnlistValley(state, payload) {
    state.enlistValley = payload;
  },
  setVisibleRanking(state, payload) {
    state.visibleRanking = payload;
  },
  setVisibleMyResult(state, payload) {
    state.visibleMyResult = payload;
  },
  setValleyResult(state, payload) {
    state.valleyResult = payload;
  },
  setValleyRank(state, payload) {
    state.valleyRank = payload;
  },
  setVisibleRetreat(state, payload) {
    state.visibleRetreat = payload;
  },

  setAllLogList(state, payload) {
    state.allLogList = [...payload];
  },
  setLogList(state, payload) {
    state.logList = [...payload];
  },
  setVisibleEnlistResult(state, payload) {
    state.visibleEnlistResult = payload;
  },
  setEnlistResultResponse(state, payload) {
    state.enlistResultResponse = payload;
  },
  setEnlistCharacterUID(state, payload) {
    state.enlistCharacterUID = payload;
  },

  setOpenLoading(state, payload) {
    state.openLoading = payload;
  },
  setBossRaids(state, payload) {
    state.bossRaids = payload;
  },
  setBossRaid(state, payload) {
    state.bossRaid = payload;
  },
  setItems(state, payload) {
    state.items = payload;
  },
  setModalBossRaid(state, payload) {
    state.modalBossRaid = payload;
  },
  setBossRaidLogs(state, payload) {
    state.bossRaidLogs = payload;
  },
  setBossRaidLogCount(state, payload) {
    state.bossRaidLogCount = payload;
  },
  setBossRaidLogPageId(state, payload) {
    state.bossRaidLogPageID = payload;
  },
  setModalCharacterInfo(state, payload) {
    state.modalCharacterInfo = payload;
  },
  clearMirageInterval(state) {
    if (state.mirageInterval) {
      clearInterval(state.mirageInterval);
      state.mirageInterval = null;
    }
  },
  setMirageInterval(state, payload) {
    state.mirageInterval = payload;
  },
  setNow(state) {
    state.now = dayjs();
  },
  setMetaParty(state, payload) {
    state.metaParty = payload;
  },
  setMetaWound(state, payload) {
    state.metaWound = payload;
  },
  setModalSelectedCharacterUID(state, payload) {
    state.modalSelectedCharacterUID = payload;
  },
  setModalSelectedValley(state, payload) {
    state.modalSelectedValley = payload;
  },
};

export const actions = {
  fetchValleyList({ commit }) {
    this.$dracoWebApi.get('/mirage/meta/valley').then(({ data }) => {
      commit('setValleyList', data.data);
    });
  },
  fetchServerInfo({ commit }) {
    this.$dracoWebApi
      .get('/mirage/serverinfo')
      .then(({ data }) => {
        if (data.code === 200) {
          commit('setValleyCapture', data.data);
        } else {
          commit('setValleyCapture', null);
        }
      })
      .catch(() => {
        commit('setValleyCapture', null);
      });
  },
  fetchAccountServerInfo({ commit, rootState }) {
    if (!rootState.accessToken) {
      return;
    }

    this.$dracoWebApi
      .get('/mirage/myserverinfo')
      .then(({ data }) => {
        if (data.code === 200) {
          const result = {};
          forEach(data.data, (server) => {
            forEach(server, (valley, key) => {
              result[key] = valley;
            });
          });

          commit('setAccountServerInfo', result);
        } else {
          commit('setAccountServerInfo', null);
        }
      })
      .catch(() => {
        commit('setAccountServerInfo', null);
      });
  },
  fetchStakeInfo({ commit }, serverId) {
    if (!serverId) {
      return;
    }
    commit('setStakeInfo', null);
    commit('setStakeInfoLoading', true);
    const valleyInfo = {
      Valley: {
        1: {
          Info: {
            Ratio: '0.00',
            BlackIron: 0,
            Septaria: 0,
            TotalMyScore: 0,
            TotalScore: 36930751,
            CurrentSlotCnt: '249',
          },
          Character: [],
        },
        2: {
          Info: {
            Ratio: '0.00',
            BlackIron: 0,
            Septaria: 0,
            TotalMyScore: 0,
            TotalScore: 11097054,
            CurrentSlotCnt: '49',
          },
          Character: [],
        },
        3: {
          Info: {
            Ratio: '0.00',
            BlackIron: 0,
            Septaria: 0,
            TotalMyScore: 0,
            TotalScore: 1725096,
            CurrentSlotCnt: '5',
          },
          Character: [],
        },
        Sum: {
          Info: {
            Ratio: '0.00',
            BlackIron: 0,
            Septaria: 0,
            TotalMyScore: 0,
            TotalScore: 49752901,
          },
        },
      },
    };
    this.$dracoWebApi
      .get('/mirage/stakeinfo', { params: { serverID: serverId } })
      .then(({ data }) => {
        if (data.code !== 200) {
          throw data.code;
        }
        commit('setStakeInfo', merge(valleyInfo, data.data));
      })
      .catch(() => {
        commit('setStakeInfo', null);
      })
      .finally(() => {
        commit('setStakeInfoLoading', false);
      });
  },
  fetchLastResult({ commit }, serverId) {
    this.$dracoWebApi
      .get('/mirage/lastresult', { params: { serverID: serverId } })
      .then(({ data }) => {
        if (data.code !== 200) {
          throw data.code;
        }
        commit('setValleyResult', data.data);
      })
      .catch(() => {
        commit('setValleyResult', null);
      });
  },
  fetchRank({ commit }, serverId) {
    this.$dracoWebApi
      .get('/mirage/rank', { params: { serverID: serverId } })
      .then(({ data }) => {
        if (data.code !== 200) {
          throw data.code;
        }
        commit('setValleyRank', data.data);
      })
      .catch(() => {
        commit('setValleyRank', null);
      });
  },
  fetchAccountInfo({ commit, rootState }) {
    if (!rootState.accessToken) {
      return;
    }

    this.$dracoWebApi
      .get('/mirage/accountinfo')
      .then(({ data }) => {
        if (data.code !== 200) {
          throw data.code;
        }
        commit('setAccountInfo', data.data);
      })
      .catch(() => {
        commit('setAccountInfo', null);
      });
  },
  fetchMyCharacters({ commit, rootState }) {
    if (!rootState.accessToken) {
      return;
    }

    this.$dracoWebApi
      .get('/mirage/mycharacters')
      .then(({ data }) => {
        if (data.code !== 200) {
          throw data.code;
        }
        const items = data.data.sort((a, b) => {
          const state = a.State - b.State;

          if (state > 0) {
            return 1;
          }

          if (state < 0) {
            return -1;
          }

          return b.MirageScore - a.MirageScore;
        });

        commit('setRosters', [...items]);
      })
      .catch(() => {
        commit('setRosters', []);
      });
  },
  fetchSealList({ commit, rootState }) {
    if (!rootState.accessToken) {
      return;
    }

    this.$dracoWebApi
      .get('/mirage/seallists')
      .then(({ data }) => {
        if (data.code === 200) {
          commit('setSealList', data.data || []);
        } else {
          commit('setSealList', []);
        }
      })
      .catch(() => {
        commit('setSealList', []);
      });
  },
  fetchLog({ commit, rootState }, serverID) {
    if (!rootState.accessToken) {
      return;
    }

    this.$dracoWebApi
      .get('/mirage/log', { params: { serverID } })
      .then(({ data }) => {
        commit('setLogList', data.data);
      })
      .catch(() => {
        commit('setLogList', []);
      });
  },
  fetchAllLog({ commit, rootState }) {
    this.$dracoWebApi
      .get('/mirage/loglists')
      .then(({ data }) => {
        commit(
          'setAllLogList',
          data.data.filter((item) => item.LogType !== '30201'),
        );
      })
      .catch(() => {
        commit('setAllLogList', []);
      });
  },
  fetchBossRaidList({ commit }) {
    this.$dracoWebApi
      .get('/bossraid/lists', { params: { scheduleUID: 'NULL', raidType: 'NULL', step: 'NULL' } })
      .then(({ data }) => {
        if (data.code === 200) {
          commit('setBossRaids', data.data.lists || []);
        }
      })
      .catch(() => {
        commit('setBossRaids', []);
      });
  },
  fetchBossRaid({ commit }, scheduleId) {
    this.$dracoWebApi
      .$get('/bossraid/scheduleinfo', { params: { scheduleUID: scheduleId } })
      .then(({ data }) => {
        if (data.code === 200) {
          commit('setBossRaid', data.data);
        }
      })
      .catch(() => {
        commit('setBossRaid', null);
      });
  },
  fetchItem({ state, commit, rootState }, itemIdx) {
    if (itemIdx == '0') {
      return;
    }
    const idx = state.items.findIndex((item) => item.itemID === itemIdx);

    if (idx > -1) {
      return;
    }

    this.$dracoWebApi
      .get('/bossraid/item', { params: { itemidx: itemIdx, languageCode: this.$i18n.locale } })
      .then(({ data }) => {
        if (data.code === 200) {
          commit('setItems', [...state.items, { itemIdx, ...data.data }]);
        }
      })
      .catch(() => {
        console.error('item not found');
      });
  },
  closeModalBossRaid({ commit }) {
    commit('setBossRaids', {
      visible: false,
      class: 0,
    });
  },
  fetchBossRaidLogs({ commit, state, rootState }, pageId) {
    if (!state.bossRaid || !state.bossRaid.schedule) {
      return;
    }

    const schedule = state.bossRaid.schedule[0];
    this.$dracoWebApi
      .get('/bossraid/battlelog', {
        params: {
          scheduleUID: schedule.ScheduleUID,
          raidType: schedule.RaidType,
          languageCode: this.$i18n.locale,
          pageID: pageId || 1,
          pageSize: state.bossRaidLogPageSize,
        },
      })
      .then(({ data }) => {
        if (data.code === 200) {
          commit('setBossRaidLogs', [...state.bossRaidLogs, ...data.data.lists] || []);
          commit('setBossRaidLogCount', data.data.totalCount || data.data.lists.length || 0);
          commit('setBossRaidLogPageId', pageId || 1);
        } else {
          commit('setBossRaidLogs', []);
          commit('setBossRaidLogCount', 0);
          commit('setBossRaidLogPageId', 1);
        }
      })
      .catch(() => {
        commit('setBossRaidLogs', []);
        commit('setBossRaidLogCount', 0);
        commit('setBossRaidLogPageId', 1);
      });
  },
  startCheckLocked({ commit, state }) {
    if (state.mirageInterval) {
      return;
    }

    const interval = setInterval(() => {
      commit('setNow');
    }, 1000);

    commit('setMirageInterval', interval);
  },
  stopCheckLocked({ commit }) {
    commit('clearMirageInterval');
  },
  fetchBossRaidMetaParty({ commit }) {
    this.$dracoWebApi.get('/bossraid/meta/partybonus').then(({ data }) => {
      if (data.code === 200) {
        commit('setMetaParty', data.data);
      }
    });
  },
  fetchBossRaidMetaWound({ commit }) {
    this.$dracoWebApi.get('/bossraid/meta/wound').then(({ data }) => {
      if (data.code === 200) {
        commit('setMetaWound', data.data);
      }
    });
  },
  openModalEnlist({ commit }, { characterId, serverId, valleyId, klass, isAssault = false }) {
    commit('setModalSelectedCharacterUID', characterId);
    commit('setModalSelectedValley', {
      serverId,
      valleyId,
      klass,
      isAssault,
    });
    commit('setVisibleEnlist', true);
  },
  closeModalEnlist({ commit }) {
    commit('setVisibleEnlist', false);
  },
  openModalRetreat({ commit }, { characterId, serverId, valleyId }) {
    console.log(characterId, serverId, valleyId);
    commit('setModalSelectedCharacterUID', characterId);
    commit('setModalSelectedValley', {
      serverId,
      valleyId,
      klass: null,
    });
    commit('setVisibleRetreat', true);
  },
  closeModalRetreat({ commit }) {
    commit('setVisibleRetreat', false);
  },
  openModalEnlistResult({ commit }, { characterId, data }) {
    commit('setModalSelectedCharacterUID', characterId);
    commit('setEnlistResultResponse', data);
    commit('setVisibleEnlistResult', true);
  },
};
