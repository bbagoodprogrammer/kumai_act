<template>
<div>
    <canvas id="canvas_gift" ref="canvas" class="canvas" width="" height=""></canvas>
</div>
</template>
<script>
import { Downloader, Parser, Player } from 'svga.lite';

const downloader = new Downloader();
const parser = new Parser({ disableWorker: !('Worker' in window) });

function loadSvgaData(file) {
    return new Promise((resolve, reject) => {
        ;(async () => {
            const downloader = new Downloader();
            const parser = new Parser();
            const fileData = await downloader.get(file);
            const data = await parser.do(fileData);
            const arr = file.split(/\//);
            if (arr.length) {
                const name = arr[arr.length - 1].split(/\./)[0];
                resolve({name, data});  
            }
        })();
    });
}
function loadAllSvgaData(...files) {
    const list = [];
    files.map(file => {
        list.push(loadSvgaData(file));
    });
    return Promise.all(list);
}
export default {
    data(){
        return {
            loading:true,
            svgaPlay:null,
            sDara:null,
        }
    }, 
    props:{
        start:{
            type: String,
        },
        isGo:{
            type: Boolean,
        },
        url:{
            type: String,
        }
    },
    mounted(){
        this.svgaPlay = new Player(this.$refs.canvas)
        this.svgaPlay.set({
            fillMode: 'forwards',
            startFrame: 1
        })
        ;(async()=>{
            const svgadata = await loadAllSvgaData(this.url)
            await this.svgaPlay.mount(svgadata[0].data);
            this.svgaPlay.start();
            this.svgaPlay.stop();
        })()
    },
    methods:{
        async svgaStart(data) {
            let player = new Player((this.$refs.canvas));
            player.set({ startFrame: 1 })
            const svgadata = await loadAllSvgaData(data)
            await player.mount(svgadata)
            player.start();
        },
        load(){},
        childMethod(){
            this.svgaPlay.set({loop: 1});//砸蛋一次
            this.svgaPlay.start();
        },
        closeEgg(){
            //不用重新加载，打开会延迟关闭盒子
            // this.svgaPlay = new Player(this.$refs.canvas)
            this.svgaPlay.set({
                fillMode: 'forwards',
                startFrame: 0
            })
            // ;(async()=>{
            //     const svgadata = await loadAllSvgaData(this.url)
            //     await this.svgaPlay.mount(svgadata[0].data);
                this.svgaPlay.start();
                this.svgaPlay.stop();
            // })()
                // const svgadata = loadAllSvgaData(this.url)
                // this.svgaPlay.mount(svgadata[0].data);
                // this.svgaPlay.start();
                // this.svgaPlay.stop();
        }
    },
}   
</script>
<style lang="scss">
    .svga_loading{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 9999;
        background: rgba(0, 0, 0, .8);
        display: flex;
        align-items: center;
        justify-content: center;
        span{
            display: block;
            width: .70rem;
            height: .38rem;
            // background: url("../img/loading.gif") no-repeat;
            background-size: .7rem .38rem;
        }
    }
    canvas{
        width: 100%;
    }
</style>