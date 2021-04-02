<template>
    <div>
        <slot :list="list" :loading="loading" :none="none"></slot>
    </div>
</template>

<script>
import axios from 'axios';
import { getUrlString } from '../utils';
// 控制好某个时间页面只有一个滚动加载组件在渲染，不然页面滚动到底部会同时触发几个列表加载
// <scroll-load-list url="api.php?from={from}&token={token}" :active="()=>tab==1">
//     <div slot-scope="{list, loading, none}">
//         <ul class="scrollable">
//             <li v-for="item in list" :key="item">{{item}}</li>
//         </ul>
//         <div v-show="loading" class="loading">loading...</div>
//         <div v-show="none" class="none">List empty</div>
//     </div>
// </scroll-load-list>
export default {
    props: ['url', 'parse', 'reset', 'active'],
    data() {
        return {
            loadCount: 0,
            loadEnd: false,

            loading: false,
            none: false,

            list: [],
        };
    },
    watch: {
        reset() {
            this.loadCount = 0;
            this.loadEnd = false;
            this.loading = false;
            this.none = false;
            this.list = [];

            this.load();
        }
    },
    beforeMount() {
        this.load();
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
    },
    methods: {
        load() {
            this.loading = true;
            const token = getUrlString('token') || '';
            axios.get(this.url.replace('{token}', token).replace('{from}', this.list.length)).then(res => {
                this.loading = false;

                let arr = res.data;
                if (typeof this.parse == 'function') {
                    arr = this.parse(arr);
                }

                if (arr.slice) {
                    this.loadCount++;
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
            // return;
            let active = true;
            if (typeof this.active == 'function') {
                active = this.active();
            }
            if (active && !this.loading && !this.loadEnd) {
                const scrollToBottom = (document.documentElement.scrollTop||document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
                if (scrollToBottom) {
                    this.load();
                }
            }
        },
    },
}
</script>