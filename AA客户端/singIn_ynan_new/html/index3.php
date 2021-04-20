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
    <meta property="og:title" content="Đã điểm danh liên tục <?php echo $days; ?> ngày">
    <meta property="og:description" content="Tôi đã điểm danh liên tục <?php echo $days; ?> ngày, được lật bài nhận thưởng, cần bạn hỗ trợ, mau đến ngay">
    <meta property="og:image" content="<?php echo $headImg; ?>">
    <meta property="og:image:width" content="330">
    <meta property="og:image:height" content="330">
    <title>Bạn bè hỗ trợ</title>
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
                <div class="userTips">Liên tục điểm danh {{data.days}} ngày, cần bạn hỗ trợ, mau hỗ trợ nhé</div>
            </div>
        </div>
        <div class="sharePeople" :class="{pt:second <=0}">
            <div class="time" v-if="second >0">Đếm ngược hỗ trợ
                {{surplusTime.hour}}:{{surplusTime.minute}}:{{surplusTime.second}}</div>
            <div class="peopleList">
                <span v-for="(item,index) in data.list" :key="index">
                    <img v-lazy="item.headImg" alt="">
                    <strong :class="{act:item.headImg!=''}">{{item.nick}}</strong>
                </span>
                <span v-for="item2 in 3-data.list.length" :key="item2+'d'">
                    <img src="../img/shareBtn.png" alt="">
                    <strong>Đợi mời</strong>
                </span>
            </div>
        </div>
        <div class="shareTips">
            <div class="shareBtn" @click="share()">{{second >0?"Hỗ trợ ngay":"Mời mai thử lại"}}</div>
            <p class="verTips">Hỗ trợ cần cập nhật bản mới nhất</p>
            <div class="tips">
                <h6>Thể lệ hỗ trợ</h6>
                <p>1. Không thể hỗ trợ chính mình <br />
                2. Mỗi người mỗi ngày chỉ được hỗ trợ người khác 1 lần <br />
                3. Cần cập nhật bản mới nhất mới có thể hỗ trợ <br />
                4. Cần hỗ trợ trong thời hạn quy định, quá hạn không thể hỗ trợ, cần mời lại vào hôm sau</p>
            </div>
        </div>
    </div>
    <script type="text/javascript">
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
                    toast(`Lời mời quá hạn! Mời chia sẻ lại.`)
                }
            },
            computed: {
                second() {
                    return this.data.leftTime
                }
            },
            methods: {
                share: function () {
                    if (this.second <= 0) return
                    const scheme = getString('app') == 'singall' ? 'HatKara' : getString('app')
                    openApp("singnowapp://singnowapp.com/" + "\{\"inviteCode\":\"" + inviteCode + "\"\}",
                        null, null,
                        `${scheme}://inviteCode=` + inviteCode)
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
