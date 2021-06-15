<template>
    <div v-show="svgaShow" @touchmove.prevent="" class="svga">
        <canvas id="canvas"></canvas>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { Player } from 'svga.lite';
import { urls } from '../config';
// import { loadImages } from '../utils';
// import { loadSvgaData, replaceSvgaImage } from '../utils/svga';
// import images from '../config/images';
let svgaData;
let player;

export default {
    data() {
        return {
            ready: false,
        };
    },
    computed: {
        ...mapState(['resultCard', 'svgaShow']),
    },
    watch: {
        svgaShow(show) {
            if (show) {
                if (this.ready) {
                    this.playSvga();
                } else {
                    this.$store.commit('updateState', {svgaShow:false, resultShow:true});
                }
            }
        },
    },
    mounted() {
        (async()=>{
            svgaData = await loadSvgaData(urls.svga);
            player = new Player('#canvas');
            player.set({ loop: 1 });
            player.$on('end', ()=>{
                setTimeout(()=>{
                    this.$store.commit('updateState', {svgaShow:false, resultShow:true});
                }, 500);
            });
            this.ready = true;
        })()
        loadImages(...images.sbig);
        // setTimeout(()=>{
        //     this.$store.commit('updateState', {resultCard:1, svgaShow:true});
        // }, 1000);
    },
    methods: {
        async playSvga() {
            if (svgaData && player) {
                svgaData = replaceSvgaImage(svgaData, 'result', images.sbig[this.resultCard]);
                svgaData = replaceSvgaImage(svgaData, 'number', images.bnumbers[this.resultCard]);
                await player.mount(svgaData);
                player.start();
            }
        },
    },
}
</script>

<style lang="scss">
.svga {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(#000, .2);
    canvas {
        width: 7.5rem;
        height: 7.5rem;
    }
}
</style>