export default {
    //html/index.html
    title: "Perjalanan Luar Angkasa",
    noAct: "Acara belum dimulai",
    actEd: "Acara telah berakhir",
    not_people: "Menunggumu",
    act_tm: "Acara Waktu：",
    //ball
    space_station: "Stasiun luar angkasa",
    landing_star: "Mendarat di planet",
    landing_nums: "Jumlah pendaratan：",
    landing_nums2: "Jumlah pendaratan",
    mysterious_star: "Planet misterius",
    starTips:
        "Saat terima gift yg ditentukan berupa 80 koin, bilah kemajuan+1<br />Ketika bilah kemajuan capai 100%, kemungkinan planet misterius muncul berlipat ganda selama 30 menit dan bilah kemajuan diatur ulang.",
    starTips2:
        "Jelajahi ribuan mil galaksi, melihat keindahan antarbintang, perjalanan ini tidak menyesal",
    starTips3: "Anda telah mendarat di semua planet, selamat dapatkan【$、%】",
    star_get: "Terima",
    landing_addres: "Mendarat di",
    landing_addres_tips:
        "Selama perjalanan luar angkasa yang panjang, Anda telah datang ke sebuah planet misterius.",
    landing_downTime:
        "（Probabilitas planet misterius berlipat ganda, tersisa $ menit% detik）",

    //history
    history_tab1: "Catatan pendaratan",
    history_tab2: "Catatan Pecahan",

    //index
    index_ruleTips1: "Aturan&Gift",
    index_ruleTips2: "Catatan Travel",
    index_tab1: "Travel in space",
    index_tab2: "Jelajah Antarbintang",
    index_firstTips:
        "Mari kita melakukan perjalanan luar angkasa<br />jelajahi alam semesta yang luas bersama-sama",
    fly: "Terbang",
    //slice
    slice_tips1:
        " Anda akan dapatkan 1 kupon jalan jika gift yg ditentukan berupa 100 koin dikirimkan, pecahan UFO dapat ditarik dengan gunakan kupon jalan. Ketika pecahan horizontal(①②③, ④⑤⑥, ⑦⑧⑨) dan semua UFO dikumpulkan, hadiah luar angkasa yg sesuai dapat diperoleh.",
    ufoLuck: "Tarik pecahan UFO",
    ticket: "Kupon jalan",
    ticket_used: "Digunakan: $",
    ticket_userNums: "Sisa: $",
    giftList: [
        {
            img: require(`../../img/gift_1.png`),
            name: "1000 kacang"
        },
        {
            img: require(`../../img/gift_2.png`),
            name: "1000 koin"
        },
        {
            img: require(`../../img/gift_3.png`),
            name: "Space Meong<br/>Hadiah efek khusus*1"
        }
    ],
    frame_get: "Dapatkan",
    //rank
    tm_tips1: "Hitung mundur",
    tm_tips2: "Hitung mundur",
    tm_tips3: "Acara tekah berakhir",
    rank_day: "hari",
    rank_hour: "jam",
    rank_min: "menit",
    rank_second: "detik",
    noData: "Tidak ada data untuk sementara",

    //rule
    rule_tab1: "Aturan",
    rule_tab2: "Hadiah",
    rule_tips: [
        {
            h5: "1. Mulai perjalanan luar angkasa",
            p:
                "Pemain dapat menjadi astronot setelah menerima hadiah terus memulai perjalanan luar angkasa, dan melihat keindahan antarbintang yang indah di alam semesta. Pemain akan mendapatkan 1 kali kesempatan untuk mendarat di planet saat mereka menerima hadiah yg ditentukan berupa 100 koin emas. Astronot perlu mendarat secara manual di planet setelah mendapatkan kesempatan pendaratan. Jumlah yang belum mendarat akan menjadi tidak valid setelah acara berakhir.",
            gift: [
                {
                    img: require(`../../img/ruleGift/1.png`),
                    name: "Batu Energi<br/>50 koin"
                },
                {
                    img: require(`../../img/ruleGift/2.png`),
                    name: "Pil  Obat Listrik<br/>1000 koin"
                },
                {
                    img: require(`../../img/ruleGift/14.png`),
                    name: "Pedang Cahaya<br/>5000 koin"
                },
                {
                    img: require(`../../img/ruleGift/3.png`),
                    name: "Teleskop Luar Angkasa<br/>9000 koin"
                },
                {
                    img: require(`../../img/ruleGift/4.png`),
                    name: "Spacecraft<br/>12000 koin"
                }
            ]
        },
        {
            h5: "2. Menempati planet",
            p:
                "Astronot dengan jumlah pendaratan terbanyak di suatu planet dapat menempati planet tersebut. Selama waktu acara, jumlah pendaratan diperbarui secara real time, dan para astronot dapat bersaing untuk planet. Setelah acara berakhir, pemain yang mempertahankan status pendudukan akan menerima hadiah yang sesuai untuk menempati planet. Jika jumlah pendaratan sama, yang mencapainya lebih dulu akan dapat menempati planet tersebut."
        },
        {
            h5: "3. Planet misterius",
            p:
                "Planet misterius itu langka. Semua astronot menerima hadiah yang ditentukan berupa 80 koin emas, bilah kemajuan planet misterius+1%. Ketika bilah kemajuan planet misterius mencapai 100%, kemungkinan planet misterius muncul berlipat ganda selama 30 menit, dan bilah kemajuan diatur ulang."
        },
        {
            h5: "4. Stasiun luar angkasa",
            p:
                "Astronot yang telah mendarat di semua planet (termasuk planet misterius) dapat kembali ke stasiun luar angkasa dan menerima hadiah dari stasiun luar angkasa. Astronot yang mendarat terbanyak di planet, avatarnya akan muncul di stasiun luar angkasa."
        },
        {
            h5: "5. Jelajah antarbintang",
            p:
                "Pemain bisa mendapatkan kupon jalan jika berikan berupa 100 koin emas  sebagai hadiah yang ditentukan. Gunakan 1 kupon jalan dapat menarik pecahan UFO 1 kali. Pemain akan dapatkan hadiah yang sesuai ketika pecahan horizontal dikumpulkan, juga akan mendapatkan mount UFO(10 hari) saat semua pecahan dikumpulkan."
        },
        {
            h5: "6. Lainnya",
            p:
                "-Selama acara, jika pemain berpartisipasi dalam acara dengan cara yang tidak pantas, AloChat berhak untuk mendiskualifikasi pemain atau pelanggar dari daftar, memblokir akunnya, dan ambil kembali semua hadiahnya sesuai dengan keadaan serius tanpa pemberitahuan sebelumnya, termasuk namun tidak terbatas pada：<br /> a）Komentar jahat, rumor, sindiran, dll. kepada pemain yang berpartisipasi selama acara."
        }
    ],
    gift_title1:
        "1. Hadiah untuk menempati planet dan memasuki stasiun luar angkasa",
    gift_p1:
        " Hadiah untuk menempati planet akan secara otomatis dikirimkan oleh sistem setelah acara berakhir. Hadiah stasiun luar angkasa secara otomatis dikirimkan oleh sistem saat memasuki stasiun luar angkasa, setiap pemain hanya dapat menerima hadiah stasiun luar angkasa 1 kali saja.",
    gift_title2: "2. Hadiah Jelajah Antarbintang",
    gift_p2:
        "Hadiah jelajah antarbintang dikirimkan secara otomatis, dan setiap pemain bisa mendapatkan hadiahnya 1 kali, total bisa dapat 4 kali.",
    gift_title3: "3. Daftar hadiah",
    gift_p3:
        "Top 1: Tema kamar space travelling(10 hari)+Tamu Universe-gift efek khusus<br />Top 2: Tema room space travelling(5 hari)+Perjalanan Universe-gift efek khusus<br />Top 3: Space ball-gift efek khusus",
    gift_p4:
        "*Semua hadiah yang diperoleh dalam acara tersebut berlaku selama 7 hari, silakan kirimkannya sesegera mungkin ya.",
    gift_lastTips:
        "*Hak interpretasi akhir acara ini adalah milik penyelenggara",
    giftArr2: [
        {
            img: require(`../../img/ruleGift/10.png`),
            name: "Space Travelling<br/>tema kamar"
        },
        {
            img: require(`../../img/ruleGift/15.png`),
            name: "Tamu Universe<br/>gift efek khusus"
        },
        {
            img: require(`../../img/ruleGift/12.png`),
            name: "Perjalanan Universe<br/>gift efek khusus"
        },
        {
            img: require(`../../img/ruleGift/13.png`),
            name: "Space Ball<br/>gift efek khusus"
        }
    ],
    gift_tips: [
        {
            title: "-Menempati planet biasa",
            gift: [
                {
                    img: require(`../../img/ruleGift/5.png`),
                    name: "Bintang Mimpi<br/>Bingkai avatar 7 hari"
                },
                {
                    img: require(`../../img/ruleGift/6.png`),
                    name: "Planet Biru<br/>Hadiah dinamis*1"
                }
            ]
        },
        {
            title: "-Menempati planet misterius",
            gift: [
                {
                    img: require(`../../img/ruleGift/7.png`),
                    name: "Mimpi Manis<br/>Bingkai avatar 7 hari"
                },
                {
                    img: require(`../../img/ruleGift/6.png`),
                    name: "Planet Biru<br/>Hadiah dinamis*1"
                }
            ]
        },
        {
            title: "-Datang ke stasiun luar angkasa",
            gift: [
                {
                    img: require(`../../img/ruleGift/8.png`),
                    name: "Jejak Bintang<br/>Bingkai avatar 7 hari"
                },
                {
                    img: require(`../../img/ruleGift/9.png`),
                    name: "Astronot<br/>Lencana 15 hari"
                }
            ]
        }
    ]
};
