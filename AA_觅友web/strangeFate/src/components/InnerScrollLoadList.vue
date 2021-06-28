<template>
    <div>
        <slot :list="list" :loading="loading" :none="none" :end="end"></slot>
    </div>
</template>

<script>
import axios from 'axios';
import {getUrlString} from '../utils';
// <inner-scroll-load-list url="api.php?from={from}&token={token}">
//     <div slot-scope="{list, loading, none}">
//         <ul class="scrollable">
//             <li v-for="item in list" :key="item">{{item}}</li>
//         </ul>
//         <div v-show="loading" class="loading">Loading...</div>
//         <div v-show="none" class="none">List empty</div>
//     </div>
// </inner-scroll-load-list>
export default {
    props: ['url', 'parse', 'reset'],
    data() {
        return {
            loadCount: 0,
            loadEnd: false,

            loading: false,
            none: false,
            end: false,

            now_page: 1,

            list: [],
        };
    },
    watch: {
        reset() {
            this.loadCount = 0;
            this.loadEnd = false;
            this.loading = false;
            this.none = false;
            this.end = false;
            this.list = [];

            this.load();
        }
    },
    beforeMount() {
        this.load();
    },
    mounted() {
        this.scrollable = document.querySelector('.scrollable');
        if (this.scrollable) {
            this.scrollable.addEventListener('scroll', this.onScroll);
        }
    },
    beforeDestroy() {
        if (this.scrollable) {
            this.scrollable.removeEventListener('scroll', this.onScroll);
        }
    },
    methods: {
        load() {
            this.loading = true;
            const uid = getUrlString('uid') || '';
            const token = getUrlString('token') || '';
            const lang = getUrlString('lang') || '';
            const rid = getUrlString('rid') || '';
            axios.get(this.url.replace('{rid}', rid).replace('{lang}', lang).replace('{uid}', uid).replace('{token}', token).replace('{from}', this.list.length).replace('{page}', this.now_page)).then(res => {
                this.loading = false;
                let arr = res.data;
                console.log(arr);
                if (typeof this.parse == 'function') {
                    arr = this.parse(arr);
                }

                if (arr.slice) {
                    this.loadCount++;
                    this.now_page++;
                    if (arr.length) {
                        this.list = this.list.concat(arr);
                    } else {
                        this.loadEnd = true;
                    }
                    if (this.loadCount > 0 && this.list.length === 0) {
                        this.none = true;
                    }
                } else {
                    this.loadEnd = true;
                }
            }).catch(err => {
                this.loading = false;
                this.loadEnd = true;
            });
        },
        onScroll() {
            if (!this.loading && !this.loadEnd) {
                const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 100;
                if (scrollToBottom) {
                    if(this.list.length>=100){
                        this.end = true;
                        console.log(this.end);
                        
                        return;
                    }
                    this.load();
                }
            }
        },
    },
}
</script>