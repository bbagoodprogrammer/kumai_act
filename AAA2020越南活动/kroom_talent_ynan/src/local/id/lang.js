export default {
    //html/index.html
    title: 'Kontes Master Kroom Populer',
    rule_title: 'Kontes Master Kroom Populer    ',

    //footer
    act_noStart: 'Acara blm mulai    ',  //活動未開始
    act_end: 'Acara udh berakhir    ',  //活動已結束
    singUp: 'Mendaftar    ',  //立即報名
    noRank: 'Blm masuk', //未上榜
    singUp_suc: 'Berhasil daftar    ', //報名成功

    //index
    rule: 'Aturan acara    ',  //活動規則
    gift_title: 'Hadiah acara    ', //活動獎勵
    giftList: [
        {
            img: require("../../img/giftList/gift1.png"),
            name: 'Lencana Master Kroom Populer            '
        },
        {
            img: require("../../img/giftList/gift2.png"),
            name: 'Tema Kroom Populer            '
        },
        {
            img: require("../../img/giftList/gift3.png"),
            name: 'Debut akbar            '
        },
        {
            img: require("../../img/giftList/gift7.png"),
            name: 'Bingkai Hutan jamur            '
        },
        {
            img: require("../../img/giftList/gift5.png"),
            name: 'Koin emas besar            '
        },
        {
            img: require("../../img/giftList/gift6.png"),
            name: 'Kacang emas besar            '
        }
    ],
    //Integral
    integral_lv: 'Level saya      ',//我的達人等級
    integral_coins: 'Koin yg dikonsumsi     ',//消費金幣
    integral_tips: 'Koin yg dikonsumsi di dalam Angpau hadiah / Kotak hadiah keberuntungan / Pukul telur, akan dapatkan hadiah yg sesuai',//在禮物紅包/福運禮物/砸蛋探寶中消費金幣可獲得相應獎勵
    integral_luck: 'Selamat dapatkan',//恭喜獲得
    integral_luckTips: 'Hadiah secara otomatis diberikan ke akun Anda melalui sistem',//獎勵獎通過系統自動發放到您的帳戶上
    integral_ok: 'Ya',//確定
    giftArr: {
        1: {
            gift_tips: 'x30',
            img: require('../../img/get_gift/giftItem_1.png'),
            name: '10 koin',
            act_width: '13%',
            gname: '50 kacang emas'
        },
        2: {
            gift_tips: '7hari',
            img: require('../../img/get_gift/giftItem_2.png'),
            name: '30 koin',
            act_width: '30%',
            gname: 'VIP/7 hari'
        },
        3: {
            img: require('../../img/get_gift/giftItem_7.png'),
            name: '100 koin',
            act_width: '50%',
            gname: 'Naga/10 hari'
        },
        4: {
            img: require('../../img/get_gift/giftItem_8.png'),
            name: '300 koin',
            act_width: '70%',
            gname: 'Rusa/20 hari'
        },
        5: {
            gift_tips: '7hari',
            img: require('../../img/get_gift/giftItem_5.png'),
            name: '500 koin',
            act_width: '100%',
            gname: 'Kota Permen/30 hari'
        },
    },


    //rank
    rank_title1: 'Top Master    ',  //K房達人榜
    rank_title2: 'Top Kroom Populer    ',//人氣K房榜
    rank_timeDown1: 'Acara berakhir Hitung mundur    ', //活動結束倒計時
    rank_timeDown2: ' Acara mulai Hitung mundur', //活動開始倒計時
    rank_day: 'hari    ',//hari
    rank_hour: 'jam    ',//時
    rank_min: 'menit    ',//分
    rank_second: 'detik    ', //秒
    rank_tips1: 'Pemeringkatan berdasarkan koin emas yang dikonsumsi oleh pengguna dalam angpau hadiah / kotak hadiah keberuntungan / Pukul telur', //根據用戶個人在禮物紅包/福運禮盒/砸蛋探寶中所花費的koin進行排名
    rank_tips2: 'Pemeringkatan berdasarkan nilai pesona yang dihasilkan oleh angpau hadiah dan kotak hadiah keberuntungan di kamar selama acara, Setiap kali roket dibuka di dalam ruangan, skornya bertambah 800    ', //根據房間中禮物紅包/福運禮盒產生的魅力值進行排名房間內每開啟一次火箭活動分數增加10000
    loading: 'Sedang dimuat...',//加載中...
    noData: 'Tiada data', //暫無數據

}