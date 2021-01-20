<?php


$inviteCode= $_REQUEST['inviteCode'];
$ch = curl_init();
$url= "http://test.17sing.tw/action/index.php?action=signInTask.getInvitedFriends&inviteCode=$inviteCode";
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
$retinfo = curl_exec($ch);
//$ret = curl_getinfo($ch);
$data= array();
$ret=0;
$response_info = json_decode($retinfo, true);
$headImg="";
$days=0;
if($response_info && isset($response_info['response_data'])){
    $retdata = $response_info['response_data'];
    $data=$retdata;
    if(!empty($retdata)){
        $master=$retdata["master"];
        $days=$retdata["days"];
        $headImg=$master["headImg"];
        $ret=1;
    }
}


?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta property="og:title" content="我已連續簽到<?php echo $days; ?>天">
    <meta property="og:description" content="我已在歡歌連續簽到<?php echo $days; ?>天啦，翻牌得獎品，需要你的助力，快來">
    <meta property="og:image" content="<?php echo $headImg; ?>">
    <meta property="og:image:width" content="330">
    <meta property="og:image:height" content="330">
    <title>好友助力</title>
    <script>
        (function (doc, win) {
            var docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function () {
                    var clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    docEl.style.fontSize = Math.round(100 * (Math.min(clientWidth, 750) / 750)) + 'px';
                };
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window);
    </script>
    <script src="//fstatic.cat1314.com/js/vue.min.js"></script>
    <script src="//fstatic.cat1314.com/js/vue-lazyload.js"></script>
    <script src="../utils/openApp.js"></script>
    <link rel="stylesheet" href="../css/app.css">


<body>
    <div id="app">
        <div class="header"></div>
        <div class="singInDay">
            <div class="userMsg">
                <div class="userAv">
                    <img v-lazy="data.master.headImg" alt="" class="av">
                    <strong>{{data.master.nick}}</strong>
                </div>
                <div class="userTips">{{lang.singIn_day.replace('$',data.days)}}</div>
            </div>
        </div>
        <div class="sharePeople" :class="{pt:second <=0}">
            <div class="time" v-if="second >0">{{lang.downTimeTips}}
                {{surplusTime.hour}}:{{surplusTime.minute}}:{{surplusTime.second}}</div>
            <div class="peopleList">
                <span v-for="(item,index) in data.list" :key="index">
                    <img v-lazy="item.headImg" alt="">
                    <strong :class="{act:item.headImg!=''}">{{item.nick}}</strong>
                </span>
                <span v-for="item2 in 3-data.list.length" :key="item2+'d'">
                    <img src="../img/shareBtn.png" alt="">
                    <strong>{{lang.share}}</strong>
                </span>
            </div>
        </div>
        <div class="shareTips">
            <div class="shareBtn" @click="share()">{{second >0?lang.help_him:lang.try_tmor}}</div>
            <p class="verTips">{{lang.new_edition}}</p>
            <div class="tips">
                <h6>{{lang.rule_title}}</h6>
                <p>{{lang.rule_p1}} <br />
                {{lang.rule_p2}} <br />
                {{lang.rule_p3}} <br />
                {{lang.rule_p4}}</p>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        <?php if ($lang=='en'){ ?>
        window.lang = {
            singIn_day:'He/she has checked in for $ consecutive days. Now he/she needs your help. Please help him/her quickly',
            downTimeTips:' Helping countdown',
            share:'To be invited',
            help_him:'Help him',
            try_tmor:'Please try again tomorrow',
            new_edition:'Helping needs to be updated to the latest version',
            rule_title:'Helping rules',
            rule_p1:'1. You can\'t help yourself',
            rule_p2:'2. Each user can only help other users once a day',
            rule_p3:' 3. Update the new version to successfully help',
            rule_p4:' 4. Helping needs to be completed in a limited time and one cannot help beyond the time limit. The invitation needs to be renewed tomorrow',
            be_overdue:' Invitation expired! Please re-share'
        }
    <?php }elseif ($lang=='hi'){ ?>
        window.lang = {
            singIn_day:'लगातार साइन इन के लिए $ दिन हैं, अभी उसे आपकी मदद चाहिए, चलें और मदद करें',
            downTimeTips:'मदद काउंटडाउन',
            share:'आमंत्रण की प्रतीक्षा में',
            help_him:'उसकी मदद करें',
            try_tmor:'कृपया कल कोशिश करें',
            new_edition:'मदद देने के लिए नया वर्शन अपडेट करना चाहिए',
            rule_title:'मदद देने का नियम',
            rule_p1:'1. अपने आपको मदद दे नहीं सकता',
            rule_p2:'2. प्रत्येक उपयोगकर्ता दिन में केवल एक बार अन्य उपयोगकर्ताओं की मदद कर सकता है',
            rule_p3:'3. मदद देने के लिए वर्शन अपडेट करना चाहिए',
            rule_p4:'4. समय सीमा के दौरान में मदद देनी चाहिए, नहीं तो कर नहीं सकती। कल दुबारा आमंत्रण करना चाहिए',
            be_overdue:'इस आमंत्रण की समय सीमा समाप्त है! कृपया पुनः शेयर करें। ',
        }
    <?php } ?>

        var ret = <?php echo($ret); ?>;
        var data = <?php echo(json_encode($data)); ?>;
        var inviteCode = <?php echo("\"".$inviteCode."\""); ?>;
        Vue.use(VueLazyload, {
      preLoad: 1.3,
      error: '../img/default.png',
      loading: '../img/default.png',
      attempt: 1
    })
        new Vue({
            el: '#app',
            data: function () {
                return {
                    surplusTime: {},
                    data: data ? data : {
                        master: {},
                        list: []
                    },
                    // inviteCode: "40707000",
                    timer: null
                }
            },
            created: function () {
                if (ret) {
                    this.downTimeGo(this.second)
                } else {
                    toast(this.lang.be_overdue)
                }
            },
            computed: {
                lang: function(){
                    return  lang
                },
                second: function() {
                    return this.data.leftTime
                },
            
            },
            methods: {
                share: function () {
                    if (this.second <= 0) return
                    openApp("hsing://17sing.tw/" + "\{\"inviteCode\":\"" + inviteCode + "\"\}",
                        null, null,
                        "Gaoge://inviteCode=" + inviteCode)
                },
                downTimeGo: function () {
                    var hour = 0
                    var minute = 0
                    var second = 0
                    var that = this
                    that.timer = setInterval(function () {
                        this.data.leftTime--
                        var hour = parseInt(this.data.leftTime / 60 / 60 % 24, 10);
                        var minute = parseInt(this.data.leftTime / 60 % 60, 10);;
                        var second = parseInt(this.data.leftTime % 60, 10);;
                        hour = hour < 10 ? '0' + hour : hour.toString();
                        minute = minute < 10 ? '0' + minute : minute.toString();
                        second = second < 10 ? '0' + second : second.toString();
                        that.surplusTime = { hour: hour, minute: minute, second: second }
                        if (this.data.leftTime <= 0) {
                            clearInterval(that.timer)
                        }
                    }, 1000)
                }
            }
        })
    </script>
</body>

</html>
