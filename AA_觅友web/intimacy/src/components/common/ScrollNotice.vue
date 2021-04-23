<template>
    <div class="scrollNotice">
        <ul :class="{scrollActive}">
            <li v-for="(item,index) in list" :key="index">{{item.nick}}獲得了{{item.coins}}金幣</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            timer: null,
            scrollActive: false,
        };
    },
    props: {
        list: {
            type: Array,
            default: []
        },
    },
    watch: {
        list(newVal) {
            clearInterval(this.timer);
            if (this.list.length) {
                this.timer = setInterval(() => {
                    this.scrollActive = true;
                    setTimeout(() => {
                        this.list.push(this.list[0]);
                        this.list.shift();
                        this.scrollActive = false;
                    }, 500);
                }, 3000);
            }
        },
    },
    destroyed() {
        clearInterval(this.timer);
    },
}
</script>

<style lang="scss">
$h:.5rem;

.scrollNotice {
    height: $h;
    text-align: center;
    overflow: hidden;
    background: linear-gradient(270deg,rgba(#000,0) 0%, rgba(#000,.4) 7%, rgba(#000,.4) 92%, rgba(#000,0) 100%);
    ul {
        width: 100%;
        &.scrollActive {
            transition: all .5s;
            margin-top: -$h;
        }
    }
    li {
        color: #fff;
        font-size: .26rem;
        width: 100%;
        height: $h;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>