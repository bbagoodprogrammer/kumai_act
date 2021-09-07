<template>
  <div v-if="owner_msg" class="landsBox">
    <div class="lands">
      <land v-for="land in land_info" :info="land" :key="land.id" :svgaData="svgaData" :next_land_id="next_land_id" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Land from './Land';
import { preloadImages, getUrlString } from '../utils';
import { getLands } from "../apis"
import { Downloader, Parser } from 'svga.lite'

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })

export default {
  data () {
    return {
      svgaData: {},
      next_land_id: 0
    }
  },
  computed: {
    ...mapState(['owner_msg', 'land_info']),
  },
  created () {
    this.init()
    this.getSvgaData()
  },
  methods: {
    init (uid) {
      const getUid = uid ? uid : getUrlString('uid')
      getLands(getUid).then(res => {
        let list = res.data.response_data.list
        this.next_land_id = res.data.response_data.next_land_id
        this.vxc('setLandInfo', list);
      })
    },
    async getSvgaData () {
      let addres = `http://fstatic.cat1314.com/uc/svga/4a4ee99542c0b8d5cebfb8a49cb2f276_1631005934.svga`
      const fileData = await downloader.get(addres);
      this.svgaData = await parser.do(fileData);
    }
  },
  components: {
    Land,
  },
}
</script>

<style lang="scss">
@keyframes getSeed {
  100% {
    transform: scale(0.96);
  }
}
@keyframes role {
  55% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(-5px);
  }
  65% {
    transform: translateY(0);
  }
}

.landsBox {
  font-size: 0.3rem;
  width: 7.33rem;
  height: 8.18rem;
  position: absolute;
  top: 3.81rem;
  .lands {
    .land {
      position: absolute;
    }
    .land10 {
      top: 0.3rem;
      left: 2.48rem;
    }
    .land8 {
      top: 1.34rem;
      left: 0.85rem;
    }
    .land9 {
      top: 1.34rem;
      right: 1.12rem;
    }
    .land7 {
      top: 2.28rem;
      left: 2.44rem;
    }
    .land6 {
      top: 3.28rem;
      right: 1.09rem;
    }
    .land5 {
      top: 3.28rem;
      left: 0.89rem;
    }
    .land4 {
      top: 4.23rem;
      left: 2.47rem;
    }
    .land3 {
      top: 5.22rem;
      right: 0.84rem;
    }
    .land2 {
      top: 5.22rem;
      left: 0.84rem;
    }
    .land1 {
      top: 6.27rem;
      left: 2.5rem;
    }
  }
}
</style>