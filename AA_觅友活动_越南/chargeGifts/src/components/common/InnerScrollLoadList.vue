<template>
  <div>
    <slot :list="list" :loading="loading" :none="none"></slot>
  </div>
</template>

<script>
import axios from 'axios';
import { replaceUrl } from '@/utils';
// <InnerScrollLoadList url="api.php?from={from}&uid={uid}&token={token}" :parse="parse">
//     <template class="scrollable" slot-scope="{list, loading, none}">
//         <ul>
//             <li v-for="(item,index) in list" :key="index">{{item}}</li>
//         </ul>
//         <div v-show="loading" class="scrollLoading">Loading...</div>
//         <div v-show="none" class="scrollNone">List empty</div>
//     </template>
// </InnerScrollLoadList>
export default {
    props: {
        url: {
            type: String,
            required: true
        },
        parse: {
            type: Function
        },
        reset: {
            type: Object
        },
        size: {
            type: Number,
            default: 20
        },
    },
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
        this.scrollable = this.$el;
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
            axios.get(replaceUrl(this.url, {from:this.list.length})).then(res => {
                this.loading = false;

                let arr = res.data;
                if (typeof this.parse == 'function') {
                    arr = this.parse(arr);
                }

                if (arr.slice) {
                    this.loadCount++;
                    if (arr.length) {
                        this.list = this.list.concat(arr);
                        if (arr.length < (this.size || 20)) {
                            this.loadEnd = true;
                        }
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
                    this.load();
                }
            }
        },
    },
}
</script>