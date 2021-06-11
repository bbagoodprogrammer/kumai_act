<template>
    <div class="page pageApply">
        <div class="title">
            <h6>{{lang.apply_title}}</h6>
            <p>{{lang.apply_desc}}</p>
        </div>
        
        <IconTips v-if="cardOk" icon="success" :message="lang.card_submited" />
        <div v-else class="form">
            <div class="demo"><img :src="images.card"></div>
            
            <div class="desc">
                <h6>{{lang.card_title}}</h6>
                <p v-html="getLangHtml(lang.card_desc)"></p>
            </div>

            <div class="upload">
                <div v-if="card" class="preview" :style="{backgroundImage:'url('+card+')'}">
                    <span v-if="cardBase64"><i></i><em>{{lang.re_upload}}</em><input ref="file2" @change="select" type="file" accept="image/png,image/gif,image/jpg,image/jpeg"></span>
                </div>
                <div v-else class="select">
                    <div><i><input ref="file1" @change="select" type="file" accept="image/png,image/gif,image/jpg,image/jpeg"></i><strong>{{lang.upload_title}}</strong><em>{{lang.upload_desc}}</em></div>
                </div>
            </div>
        </div>

        <div class="submit">
            <p><em>{{lang.agree_agreement}}</em><a @click.prevent="agreement" href="">{{lang.apply_agreement}}</a></p>
            <div><a @click.prevent="submit" href="">{{lang.submit_apply}}</a></div>
        </div>

        <div v-show="loading" class="applyLoading">
            <div><i></i><span>{{progress}}</span></div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getLangHtml, toast, getBase64Image } from '../utils';
import { status, cardMaxWidth } from '../config';
import { apply } from '../apis';
import IconTips from '../components/mods/IconTips';

export default {
    data() {
        return {
            loading: false,
            progress: '',
        };
    },
    computed: {
        ...mapState(['status', 'card']),
        ...mapGetters(['signed']),
        cardBase64() {
            return /^data:image/.test(this.card);
        },
        cardOk() {
            return this.signed || this.status == status.CHECKING || this.status == status.REJECT;
        },
    },
    methods: {
        getLangHtml,
        agreement() {
            this.$router.push('/agreement');
        },
        async select(e) {
            const files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                toast(this.lang.upload_title);
                return;
            }
            const file = files[0];

            const base64Str = await getBase64Image(file, cardMaxWidth);

            this.$store.commit('setCardImage', base64Str);

            if (this.$refs.file1) {
                this.$refs.file1.value = '';
            }
            if (this.$refs.file2) {
                this.$refs.file2.value = '';
            }
            
            // const oldSize = parseInt(file.size / 1024);
            // const newSize = parseInt((base64Str.length - base64Str.length / 8 * 2) / 1024);
            // const compress = Math.max(0, parseInt((oldSize - newSize) / oldSize * 100));
            // toast(`old:${oldSize}KB new:${newSize}KB compress:${compress}%`);
        },
        async submit() {
            let image = this.card;
            if (image) {
                if (!this.cardBase64) {
                    image = '';
                }
                this.loading = true;
                const res = await apply(image, evt => {
                    if (evt.lengthComputable) {
                        this.progress = Math.round(evt.loaded / evt.total * 100) + '%';
                    }
                });
                if (res.data) {
                    const {response_status, response_data} = res.data;
                    if (response_status && response_status.error === '') {
                        this.$store.commit('setStatus', status.CHECKING);
                        this.$router.replace('/result');
                    } else if (response_status.error) {
                        toast(response_status.error);
                    } else {
                        console.warn(res.data);
                    }
                }
                this.loading = false;
            } else {
                toast(this.lang.upload_title);
            }
        },
    },
    components: {
        IconTips,
    },
}
</script>

<style lang="scss">
.pageApply {
    padding: $page-padding;
    background: #fff;

    .title {
        h6 {
            color: $text-black;
            padding-bottom: .06rem;
        }
        p {
            font-size: $font-small;
        }
    }

    .form {
        padding-bottom: 1.2rem;
    }

    .demo {
        height: 3.8rem;
        text-align: center;
        padding: .16rem 0;
        img {
            height: 100%;
        }
    }

    .desc {
        text-align: center;
        h6 {
            color: $text-black;
        }
        p {
            font-size: .24rem;
            line-height: .34rem;
        }
    }

    .upload {
        width: 6rem;
        height: 3.8rem;
        margin: .25rem auto;
        background: $bg-gray;
        border-radius: .12rem;
        overflow: hidden;
        & > div {
            height: 100%;
            box-sizing: border-box;
        }
        .preview {
            position: relative;
            background-position: center center;
            background-size: contain;
            background-repeat: no-repeat;
            span {
                display: block;
                position: absolute;
                top: .2rem;
                right: .2rem;
                color: #fff;
                background: rgba(#000, .4);
                border-radius: 1rem;
                padding: 0 .14rem;
                i, em {
                    display: inline-block;
                    vertical-align: middle;
                    margin: 0 .01rem;
                }
                i {
                    width: .2rem;
                    height: .2rem;
                    // background: url("../img/icon_ref.png");
                    background-size: 100% 100%;
                }
                em {
                    font-size: .2rem;
                    height: .4rem;
                    line-height: .38rem;
                }
                input {
                    position: absolute;
                    left: 0;
                    top: 0;
                    zoom: 10;
                    opacity: 0;
                }
            }
        }
        .select {
            border: 1px solid #ccc;
            border-radius: .12rem;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            i {
                display: inline-block;
                width: 1.38rem;
                height: 1.38rem;
                position: relative;
                overflow: hidden;
                // background: url("../img/icon_add.png");
                background-size: 100% 100%;
                input {
                    zoom: 10;
                    opacity: 0;
                }
            }
            strong {
                display: block;
                color: $text-black;
                padding-bottom: .07rem;
            }
            em {
                font-size: .28rem;
            }
        }
    }

    .submit {
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        padding-bottom: .3rem;
        text-align: center;
        background: #fff;
        p {
            padding-bottom: .1rem;
            em, a {
                font-size: $font-small;
            }
            a {
                color: #67A0E2;
                text-decoration: underline;
            }
        }
        div {
            a {
                display: inline-block;
                width: 4.8rem;
                height: .88rem;
                line-height: .88rem;
                color: #fff;
                background: $skin;
                border-radius: .44rem;
                &.disabled {
                    background: #ccc;
                }
            }
        }
    }
}

.applyLoading {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100000;
    background: rgba(0, 0, 0, .4);
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    i {
        display: inline-block;
        width: .7rem;
        height: .38rem;
        background: url("./common/Loading/loading.gif");
        background-size: contain;
    }
    span {
        display: block;
        color: rgba(255, 255, 255, .8);
        font-size: 80%;
    }
}
</style>