<template>
<div>
    <!-- <div class="svga_loading" v-show="loading">
        <span></span>
    </div> -->
     <!--<canvas v-show="!loading" id="canvas_gift" class="canvas" width="" height=""></canvas> -->
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
        },
        isLoop:{
            // type:String,
        }
    },
    created(){
        // this.svgaPlay = new Player('#canvas_gift');
    },
    mounted(){
        //  const player = new Player(this.$refs.canvas)
        // player.set({
        //     loop: 1000,
        //     fillMode: 'forwards',
        //     startFrame: 1
        // })
        
        // ;(async () => {
        //     // const list = await loadAllSvgaData('http://fstatic.cat1314.com/uc/svga/a03097a586c7221f73b92dee03f1caae_1605754859.svga');
        //     const list = await loadAllSvgaData(this.url);
        //     await player.mount(list[0].data)
        //     // player.stop();
        //     player.start();
        // })()
        this.svgaPlay = new Player(this.$refs.canvas)
        if(this.isLoop){
            this.svgaPlay.set({
                // loop: 1,//播放多少次
                fillMode: 'forwards',
                startFrame: 0
            })
        }else{
            this.svgaPlay.set({
                loop: 1,//播放多少次
                fillMode: 'forwards',
                startFrame: 0
            })
        }
        ;(async()=>{
            // this.svgaStart(this.url);
            // this.svgaPlay = new Player(this.$refs.canvas);
            // this.svgaPlay.set({ startFrame: 1})
            // console.log(this.svgaPlay);
            const svgadata = await loadAllSvgaData(this.url)
            await this.svgaPlay.mount(svgadata[0].data);
            this.svgaPlay.start();
            // this.svgaPlay.stop();
            // this.loading = false;
        })()
    },
    methods:{
        async svgaStart(data) {
            console.log(data);
            // let canvas = document.getElementById('#canvas_gift');
            let player = new Player((this.$refs.canvas));
            player.set({ startFrame: 1 })
            const svgadata = await loadAllSvgaData(data)
            await player.mount(svgadata)
            // if (isGo ) {
                player.start()  
            // }
            // this.plarerArr[className] = {
            //     player
            // }
        },
        load(){
            (async()=>{
                // this.svgaPlay = new Player('#canvas_gift');
                // this.svgaPlay.set({ startFrame: 1,loop:1})
                // this.svgaPlay.set({ startFrame: 1})
                // const player = new Player('#canvas_gift');
                // console.log(this.svgaPlay);
                // const svgadata = await loadSvgaData(this.url)
                // await this.svgaPlay.mount(svgadata);
                // this.svgaPlay.start();
                // this.svgaPlay.stop();
                // this.svgaPlay.$on('stop', () => console.log('event stop'))
                // this.loading = false;
            })()
        },
        childMethod(){
            // console.log('砸');
            // const player = new Player('#canvas_gift');
            // const svgadata = await loadSvgaData(this.url)
            // await player.mount(svgadata);
            this.svgaPlay.set({loop: 1});//砸蛋一次
            this.svgaPlay.start();
            // this.svgaPlay.$on('stop', () => console.log('event stop'))
        },
        closeEgg(){
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
        }
    },
}   
</script>
<style lang="scss">
    // .svga_loading{
    //     position: fixed;
    //     top: 0;
    //     right: 0;
    //     bottom: 0;
    //     left: 0;
    //     z-index: 9999;
    //     background: rgba(0, 0, 0, .8);
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     span{
    //         display: block;
    //         width: .70rem;
    //         height: .38rem;
    //         background: url("../img/loading.gif") no-repeat;
    //         background-size: .7rem .38rem;
    //     }
    // }
    canvas{
        width: 100%;
    }
</style>