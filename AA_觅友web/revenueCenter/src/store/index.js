import Vue from "vue";
import vuex from "vuex";
import { loadData, getInitInfo } from "../apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        loading: false
        // balance: 0, // 当前账号钻石
        // consume: 0, // 消费钻石(总消费consume+reflect)
        // reflect: 0, // 提现钻石(总消费consume+reflect)
        // daily_income: 0, // 今天获取钻石
        // goods_list: [
        //     // 兑换商品列表
        //     {
        //         id: 7, // 兑换ID
        //         name: "100金币", // 奖励名称
        //         url_front: "", // 奖励图片
        //         url_resource: "", // 预览图，如果为空不能预览
        //         price: 1000, // 兑换花费
        //         num: 100, // 个数
        //         days: 0, // 天数（金币，戒子没有天数）
        //         type: 4 //类型 =0头像框 =1座驾 =2戒子 =3背包礼物 =4金币
        //     }
        // ]
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },

        setInitInfo(state, data) {
            Object.assign(state, data);
        }
    },
    actions: {
        async getInitInfo(state, nums) {
            try {
                await loadData(getInitInfo, "setInitInfo", false, nums);
            } catch (e) {
                console.log("getInitInfo", e);
            }
        }
    }
});
