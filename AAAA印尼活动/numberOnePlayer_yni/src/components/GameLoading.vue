<template>
  <div class="gameLoading">
    <span><i :style="{width:progress+'%'}"></i><em>{{progress}}/100</em></span>
  </div>
</template>

<script>
import { Howl } from 'howler';

export default {
  data() {
    return {
      count: 0,
      list: [
        'sound/bg.mp3',
        'sound/hit.mp3',
        'sound/hit_error.mp3',
        require('../img/place.png'),
        require('../img/hammer.png'),
        require('../img/hammer_hit.png'),
        require('../img/gray_mouse.png'),
        require('../img/yellow_mouse.png'),
        require('../img/gray_mouse_hit.png'),
        require('../img/yellow_mouse_hit.png'),
        require('../img/text_1.png'),
        require('../img/text_2.png'),
        require('../img/text_3.png'),
        require('../img/text_mouse_come.png'),

        require('../img/bg_start.png'),
        require('../img/btn_start.png'),
        require('../img/icon_coin.png'),
      ],
    };
  },
  computed: {
    progress() {
      return Math.floor(this.count / this.list.length * 100);
    },
  },
  created() {
    this.sounds = {};
    this.loadImages();
    this.loadSounds();
  },
  methods: {
    isAudio(url) {
      return /\.(mp3|wav|ogg)$/i.test(url);
    },
    getFileName(url) {
      let name = '';
      if (!/^data:/.test(url)) {
        const parts = url.split('/');
        const arr = parts[parts.length - 1].split('.');
        name = arr[0];
      }
      return name;
    },

    loadImages() {
      this.list.forEach(url => {
        if (!this.isAudio(url)) {
          const img = new Image();
          img.onload = img.onerror = this.onLoad;
          img.src = url;
        }
      });
    },
    loadSounds() {
      this.list.forEach(url => {
        if (this.isAudio(url)) {
          const name = this.getFileName(url);
          const sound = new Howl({
            src: [url],
            onload: this.onLoad,
            onloaderror: this.onLoad,
          });
          this.sounds[name] = sound;
        }
      });
    },
    onLoad() {
      this.count++;
      if (this.progress >= 100) {
        const bgSound = this.sounds['bg'];
        bgSound.loop(true);
        bgSound.volume(.5);
        const hitSound = this.sounds['hit'];
        const hitErrorSound = this.sounds['hit_error'];
        const soundApis = {
          playBgSound() {
            bgSound.play();
          },
          playHitSound(error) {
            const sound = error ? hitErrorSound : hitSound;
            sound.play();
          },
          stopAllSound() {
            bgSound.stop();
            hitSound.stop();
            hitErrorSound.stop();
          },
        };
        this.$emit('load', soundApis);
      }
    },
  },
}
</script>

<style lang="scss">
.gameLoading {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    position: relative;
    display: inline-block;
    width: 3rem;
    height: 0.1rem;
    line-height: 0.1rem;
    background: #b85f2c;
    border: 2px solid #ffc973;
    border-radius: 1rem;
    overflow: hidden;
    i {
      display: inline-block;
      background: url("../img/bg_prog2.png");
      background-size: 3rem 0.1rem;
      border-radius: 1rem;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
    }
    em {
      display: none;
    }
  }
}
</style>