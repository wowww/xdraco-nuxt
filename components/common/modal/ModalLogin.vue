<template>
  <v-dialog content-class="dialog-login" v-model="openDracoLogin" max-width="360" persistent>
    <div class="content">
      <v-btn class="btn-close" @click="setOpenDracoLogin(false)" fab plain x-small>
        <v-icon color="#000" size="26">mdi-close</v-icon>
      </v-btn>
      <h3 class="title"><em>Mir4</em></h3>
      <h4 class="sub-title">Please log in to use the MIR4 X DRACO</h4>

      <div class="sns-provider">
        <template v-if="cookieNotAvailable">
          <h4 class="accept-cookie-title">We use cookies</h4>
          <p class="accept-desc">
            Browser setting error.<br />
            Please log in again after changing your browser setting.
          </p>
        </template>
        <template v-else>
          <div class="g-signin2" data-onsuccess="onSignIn"></div>
          <button type="button" class="btn-sns btn-google" @click="googleLogin">Sign in with <strong>Google</strong></button>
          <vue-apple-signin v-show="false" :ref="appleBtn"></vue-apple-signin>
          <button type="button" class="btn-sns btn-apple" @click="appleLogin">Sign in with <strong>Apple</strong></button>
          <button type="button" class="btn-sns btn-facebook" @click="fbLogin2">Sign in with <strong>Facebook</strong></button>
        </template>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from '@vue/composition-api';
import Cookies from 'js-cookie';
import qs from 'qs';
import Vue from 'vue';
import { useMutations, useState } from 'vuex-composition-helpers/dist';

import { dracoStorage } from '@/utils/baseUtil';

export default defineComponent({
  name: 'ModalLogin',
  // eslint-disable-next-line no-unused-vars
  setup(props, { root }) {
    const cookieAccept = ref(false);

    const appleBtn = ref(null);

    const instance = getCurrentInstance();
    const vm = instance?.proxy || new Vue({});

    const { openDracoLogin, cookieNotAvailable } = useState(['openDracoLogin', 'cookieNotAvailable']);
    const { setOpenDracoLogin } = useMutations(['setOpenDracoLogin']);

    const googleLogin = () => {
      const CLIENT_ID = '413577644384-7dp0qc878r83ri254s2j6mljm3fsakuk.apps.googleusercontent.com';
      const AUTHORIZE_URI = 'https://accounts.google.com/o/oauth2/v2/auth';

      const queryStr = qs.stringify({
        client_id: CLIENT_ID,
        redirect_uri: `${process.env.VUE_APP_DRACO_REDIRECT_URI}/google`,
        response_type: 'code',
        scope: 'profile email',
      });

      const loginUrl = `${AUTHORIZE_URI}?${queryStr}`;

      Cookies.set('xdraco-prev-path', root.$route.path);

      window.location.assign(loginUrl);
    };

    const uuidv4 = () => {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        // eslint-disable-next-line no-bitwise
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
      );
    };

    const appleLogin = () => {
      Cookies.set('xdraco-prev-path', root.$route.path);
      document.getElementById('appleid-signin').click();
    };

    const fbLogin2 = () => {
      Cookies.set('xdraco-prev-path', root.$route.path);
      window.location.href = `https://www.facebook.com/v12.0/dialog/oauth?${qs.stringify({
        client_id: '419848625819718',
        redirect_uri: `${process.env.VUE_APP_DRACO_REDIRECT_URI}/facebook`,
        state: uuidv4(),
      })}`;
    };

    const fbInit = async () => {
      // eslint-disable-next-line func-names
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: '419848625819718', // You will need to change this
          cookie: true, // This is important, it's not enabled by default
          version: 'v13.0',
        });
      };
    };
    const fnLoadSDK = async (d, s, id) => {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      // eslint-disable-next-line prefer-const
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    };

    const fbLogin = async () => {
      await fnLoadSDK(document, 'script', 'facebook-jssdk');
      await fbInit();
      // eslint-disable-next-line func-names
      window.FB.login(function (response) {
        if (response.authResponse) {
          // alert('You are logged in &amp; cookie set!');
          // Now you can redirect the user or do an AJAX request to
          // a PHP script that grabs the signed request from the cookie.
        } else {
          // alert('User cancelled login or did not fully authorize.');
        }
      });
      return false;
    };

    // eslint-disable-next-line consistent-return
    const authenticate = async (provider) => {
      console.log(vm);

      vm.$auth.authenticate(provider).then((res) => {
        console.log(res);
        // Execute application logic after successful social authentication
      });
    };

    const agreeCookie = () => {
      dracoStorage.set('draco-cookie-accept', true, { expires: 365 });
      cookieAccept.value = true;
    };

    onMounted(() => {});

    watch(
      () => openDracoLogin.value,
      () => {
        if (openDracoLogin.value) {
          cookieAccept.value = dracoStorage.get('draco-cookie-accept') ? dracoStorage.get('draco-cookie-accept') === 'true' : false;
        }
      },
    );

    return {
      cookieNotAvailable,
      cookieAccept,
      agreeCookie,
      appleBtn,
      openDracoLogin,
      setOpenDracoLogin,
      authenticate,
      googleLogin,
      appleLogin,
      fbLogin,
      fbLogin2,
    };
  },
});
</script>
