<template>
  <section class="section section-video">
    <div class="section__inner no-gutter">
      <div class="wrap-video" :class="{ 'wrap-video--open': isOpen }">
        <iframe
          src="https://www.youtube.com/embed/ObbtiIcflVA"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'HydraYoutubeVideo',
  components: {
    //
  },
  data: () => ({
    //
    isOpen: false,
  }),
  methods: {
    //
  },
  beforeMount: () => {
    //
  },
  mounted() {
    setTimeout(() => {
      this.isOpen = !this.isOpen;
    }, 400);
  },
});
</script>
