# 【音觅】PK赛之家族团战（familyPK）| 接口文档

#### 测试服相关用户数据

* `uid`:10012475 (31)
* `token`:GF9O84K7tw0sEr2OBLIUjSMi-tiHk_tl4FbBRcP07Y48LpgYAJzSTMRMWFjBhmPQv5h-lnVLwBQjU0je_0z4dNYhts-v5H2lI6bVyx4Y0klsP6vuZ37LlGpd6aOC31a8
* `uid`:10012714  (33)
* `token`:Pgu6eRcDEqsAcw4Yn0bdzLp09GtT9RR51-ENyTK545Pm7gmZHB7ol0q2Afy_zFTih-KFknwuaqbF_l3LT8wrLxcQmbayEgDikdnA29o-48EWUUTn76VQ01G3ga-Azum8

### 相关错误码
```
    500   => '校驗失敗', // 校驗失敗
    20000 => '活動未開始', // 活動未開始
    20001 => '活動已結束', // 活動已結束
    20002 => '參數缺失', // 參數缺失
    20003 => '參數錯誤', // 參數錯誤
    20004 => '內部錯誤', // 內部錯誤
    20005 => '操作太頻繁', // 操作太頻繁
    20006 => '非法操作', // 非法操作

    20010 => '家族團隊名稱最多10個字', // 家族團隊名稱最多十個字
    20011 => '家族理念最多100個字', // 家族理念最多100個字

    30001 => '請在9:30-21:30期間再創建哦', // 請在9:30-21:30期間再創建哦
    30002 => '活動已經進入家族爭霸篩選，不可再創建新家族啦', // 活動已經進入家族爭霸篩選，不可在創建新家族啦
    30003 => '財富等級要大於等於2的玩家才可以創建家族哦~', // 財富等級要大於等於2的玩家才可以創建家族哦~
    30004 => '不符合創建家族的標準', //  不符合創建家族的標準
    30005 => '成為家族長前要先創建自己的房間哦，你還沒有自己的房間~', // 成為家族長前要先創建自己的房間哦，你還沒有自己的房間~
    30006 => '您已加入家族，無法創建家族', // 您已加入家族，無法創建家族
    30007 => '您已加入家族，無法加入其他家族', // 您已加入家族，無法加入其他家族
    30008 => '家族不存在', // 家族不存在
    30009 => '你已申請過該家族，請勿重複操作', // 你已申請過該家族，請勿重複操作
    30010 => '對方已經加入其他家族', // 您已加入家族，無法加入其他家族
    30011 => '只允許邀請好友', // 只能邀請好友

    40001 => '已邀請過好友，請勿重複操作',  //已邀請過好友，請勿重複操作
    40002 => '只允許族長同意申請',  // 只允許族長同意申請
    40003 => '沒有收到對方的申請',  // 沒有收到對方的申請
    40004 => '您尚未加入家族',  // 您尚未加入家族
    40005 => '該信件不存在',  // 該信件不存在
    40006 => '族長不允許退出家族',  // 族長不允許退出家族
    
```

## 1.初始化
 * 参数
   
   * `uid` 用户UID
   * `token` 用户token
   
* [http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.init&token={token}&uid={uid}](http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.init&token=GF9O84K7tw0sEr2OBLIUjSMi-tiHk_tl4FbBRcP07Y48LpgYAJzSTMRMWFjBhmPQv5h-lnVLwBQjU0je_0z4dNYhts-v5H2lI6bVyx4Y0klsP6vuZ37LlGpd6aOC31a8&uid=10012475)
 ```javascript
 {
    "response_status": {
        "error": "",
        "code": 0
    },
    "response_data": {
        "step": 1,   //活动状态 （0：未开始, 1：进行中, 2：已结束）
        "sTime": 1614254400, //活动开始时间
        "eTime": 1616255999, //活动结束时间
        "downTime": 977669,  //活动结束倒计时
        "newMailCount": 0,  //收到新申请加入信件数量
        "todayScore": 0,  //当前用户当天的守护值
        "tasks": [  //任务列表
            {
                "taskName": "sendGift",  //送礼
                "score": 2,  //送出金币礼物价值的倍数
                "upperLimit": 0,  //无上限
                "haveScore": "8000"  //已获分值
            },
            {
                "taskName": "joinmic",  //上麦
                "score": 5,  //上麦每分钟加成的倍数
                "upperLimit": 200,  //上限
                "haveScore": "200"  //已获分值
            },
            {
                "taskName": "login",  //登陆
                "score": 200,  //奖励分值
                "upperLimit": 200,  //上限
                "haveScore": "200",  //已获分值
                "number": 2  //需要登陆人数
            },
            {
                "taskName": "charge",  //储值
                "score": 1000,  //奖励分值
                "upperLimit": 1000,  //上限分值
                "haveScore": 0,  //已获分值
                "number": 2  //需要储值人数
            }
        ],
        "familyRank": {  //家族排名相关数据
            "rank": 1,  //排名
            "familyId": "1",  //家族序号
            "name": "家族名称",  //家族名称
            "avatar": "http://udatefile.cat1314.com/uc/img/head_10012475_1610416188.png",  //族长头像
            "score": 8400,  //分值
            "familyUser": [ //家族成员贡献
                {
                    "uid": "10012714",  //用户UID
                    "nick": "10012714",  //用户名称
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10012714_1610544078.png"  //用户头像
                },
                {
                    "uid": "10012475",
                    "nick": "10012475",
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10012475_1610416188.png"
                }
            ],
            "team": "red"
        },
        "familyPK": {  //家族PK
            "step": 1, // 进行状态 （0：未开始, 1：进行中, 2：已结束）
            "downTime": 531270  //倒计时
        },
        "familyCompetition": {  //家族争霸
            "step": 0,  // 进行状态 （0：未开始, 1：进行中, 2：已结束）
            "downTime": 0  //倒计时
        }
    }
}
 
 ```


## 2.家族列表
* 参数

    * `orderBy` 排序字段，参数只允许 count ：人数 , time：创建时间（默认为count）
    * `sort` 排序方式，参数只允许 ASC ：正序, DESC：倒序 （默认为DESC）
    * `search`  搜索内容（只允许搜索UID，不支持模糊搜索）
    * `from`  翻页标记 (默认：0)
   
 * [http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.familyList&orderBy={orderBy}&sort={sort}&search={search}&from={from}](http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.familyList&orderBy=count&sort=DESC&search=&from=0)
    ```javascript
    {
        "response_status": {
            "error": "",
            "code": 0
        },
        "response_data": {
            "list": [
                {
                    "familyId": 1,  //家族序号
                    "name": "家族名称", //家族名称
                    "patriarch": "10012475",  //族长
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10012475_1610416188.png",  //族长头像
                    "count": 2  //人数
                },
                {
                    "familyId": 2,
                    "name": "这个是测试家族名",
                    "patriarch": "10012439",
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10012439_1597974161.png",
                    "count": 1
                }
            ]
        }
    }
    ```


## 3.创建家族
* 参数

    * `uid` 用户UID
    * `token` 用户token
    * `title` 家族名称
    * `concept` 家族理念
    * `team` 战队  blue：蓝队,  red：红队 

 * [http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.createFamily&token={token}&uid={uid}&title={title}&concept={concept}&team={team}](http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.createFamily&token=GF9O84K7tw0sEr2OBLIUjSMi-tiHk_tl4FbBRcP07Y48LpgYAJzSTMRMWFjBhmPQv5h-lnVLwBQjU0je_0z4dNYhts-v5H2lI6bVyx4Y0klsP6vuZ37LlGpd6aOC31a8&uid=10012475&title=家族名称&concept=这里是家族的理念&team=red)
    ```javascript
    {
        "response_status": {
            "error": "",
            "code": 0
        },
        "response_data": []
    }
    ```


## 4.申请加入家族
* 参数

    * `uid` 用户UID
    * `token` 用户token
    * `familyId` 家族序号

 * [http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.joinFamily&token={token}&uid={uid}&familyId={familyId}](http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.joinFamily&token=Pgu6eRcDEqsAcw4Yn0bdzLp09GtT9RR51-ENyTK545Pm7gmZHB7ol0q2Afy_zFTih-KFknwuaqbF_l3LT8wrLxcQmbayEgDikdnA29o-48EWUUTn76VQ01G3ga-Azum8&uid=10012714&familyId=1)
    ```javascript
    {
        "response_status": {
            "error": "",
            "code": 0
        },
        "response_data": []
    }
    ```
    
## 5.家族详情
* 参数

    * `familyId` 家族序号

 * [http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.familyData&familyId={familyId}](http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.familyData&familyId=1)
    ```javascript
    {
        "response_status": {
            "error": "",
            "code": 0
        },
        "response_data": {
            "name": "家族名称",  //家族名称
            "concept": "这里是家族的理念",  //家族理念
            "list": [
                {
                    "nick": "10012714",  //成员名称
                    "avatar":  "http://udatefile.cat1314.com/uc/img/head_10012714_1610544078.png", //头像
                    "score": 8200,  //贡献分值
                    "patriarch": false  //是否为族长
                },
                {
                    "nick": "10012475",
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10012475_1610416188.png",
                    "score": 0,
                    "patriarch": true
                }
            ]
        }
    }
    ```
    
## 6.好友列表
* 参数

    * `uid` 用户UID
    * `token` 用户token

 * [http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.friends&token={token}&uid={uid}](http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.friends&token=GF9O84K7tw0sEr2OBLIUjSMi-tiHk_tl4FbBRcP07Y48LpgYAJzSTMRMWFjBhmPQv5h-lnVLwBQjU0je_0z4dNYhts-v5H2lI6bVyx4Y0klsP6vuZ37LlGpd6aOC31a8&uid=10012475&from=0)
    ```javascript
    {
        "response_status": {
            "error": "",
            "code": 0
        },
        "response_data": {
            "list": [
                {
                    "uid": 10012425,  //好友UID
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10012425_1601343732.png",  //头像
                    "nick": "10012425"  //好友名称
                },
                {
                    "uid": 10012714,
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10012714_1610544078.png",
                    "nick": "10012714"
                },
                {
                    "uid": 10013237,
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10013237_1559704806.png",
                    "nick": "10013237"
                },
                {
                    "uid": 10,
                    "avatar": "",
                    "nick": ""
                },
                {
                    "uid": 10012558,
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10012558_1607927191.png",
                    "nick": "10012558"
                },
                {
                    "uid": 10012775,
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10012775_1589876132.png",
                    "nick": "10012775"
                },
                {
                    "uid": 10013270,
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10013270_1598336706.png",
                    "nick": "噜啦啦哈哈哈哈哈哈哈"
                },
                {
                    "uid": 10012471,
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10012471_1578967510.png",
                    "nick": "錦繡貳分誰得得得"
                },
                {
                    "uid": 10012774,
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_default_sex0.png",
                    "nick": "10012774"
                },
                {
                    "uid": 10013224,
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10013224_1610680277.png",
                    "nick": "DL-1"
                },
                {
                    "uid": 10012235,
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10012235_1610611676.png",
                    "nick": "翠花"
                },
                {
                    "uid": 10013096,
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10013096_1610420355.png",
                    "nick": "10013096"
                },
                {
                    "uid": 10013218,
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10013218_1598431070.png",
                    "nick": "阿發放去安哇哦額"
                }
            ]
        }
    }
    ```
    
## 7.邀请好友
* 参数

    * `uid` 用户UID
    * `token` 用户token
    * `fuids`  好友的UID  多个以 , 进行拼接
   
 * [http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.invite&token={token}&uid={uid}&fuids={fuids}](http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.invite&token=GF9O84K7tw0sEr2OBLIUjSMi-tiHk_tl4FbBRcP07Y48LpgYAJzSTMRMWFjBhmPQv5h-lnVLwBQjU0je_0z4dNYhts-v5H2lI6bVyx4Y0klsP6vuZ37LlGpd6aOC31a8&uid=10012475&fuids=10013011,10013004)
    ```javascript
    {
        "response_status": {
            "error": "",
            "code": 0
        },
        "response_data": []
    }
    ```
    
## 8.接受加入申请
* 参数

    * `uid` 用户UID
    * `token` 用户token
    * `mailId`  邮件序号
   
 * [http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.accept&token={token}&uid={uid}&mailId={mailId}](http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.accept&token=GF9O84K7tw0sEr2OBLIUjSMi-tiHk_tl4FbBRcP07Y48LpgYAJzSTMRMWFjBhmPQv5h-lnVLwBQjU0je_0z4dNYhts-v5H2lI6bVyx4Y0klsP6vuZ37LlGpd6aOC31a8&uid=10012475&mailId=1)
    ```javascript
    {
        "response_status": {
            "error": "",
            "code": 0
        },
        "response_data": []
    }
    ```
    
## 9.拒绝加入申请
* 参数

    * `uid` 用户UID
    * `token` 用户token
    * `mailId`  邮件序号
   
 * [http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.reject&token={token}&uid={uid}&mailId={mailId}](http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.reject&token=GF9O84K7tw0sEr2OBLIUjSMi-tiHk_tl4FbBRcP07Y48LpgYAJzSTMRMWFjBhmPQv5h-lnVLwBQjU0je_0z4dNYhts-v5H2lI6bVyx4Y0klsP6vuZ37LlGpd6aOC31a8&uid=10012475&mailId=1)
    ```javascript
    {
        "response_status": {
            "error": "",
            "code": 0
        },
        "response_data": []
    }
    ```
    
## 10.退出家族
* 参数

    * `uid` 用户UID
    * `token` 用户token
   
 * [http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.quitFamily&token={token}&uid={uid}](http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.quitFamily&token=GF9O84K7tw0sEr2OBLIUjSMi-tiHk_tl4FbBRcP07Y48LpgYAJzSTMRMWFjBhmPQv5h-lnVLwBQjU0je_0z4dNYhts-v5H2lI6bVyx4Y0klsP6vuZ37LlGpd6aOC31a8&uid=10012475)
    ```javascript
    {
        "response_status": {
            "error": "",
            "code": 0
        },
        "response_data": []
    }
    ```
    
## 11.守护动态
* 参数

    * `uid` 用户UID
    * `token` 用户token
    * `from`  翻页标记 (默认：0)
   
 * [http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.history&token={token}&uid={uid}&from={from}](http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.history&token=GF9O84K7tw0sEr2OBLIUjSMi-tiHk_tl4FbBRcP07Y48LpgYAJzSTMRMWFjBhmPQv5h-lnVLwBQjU0je_0z4dNYhts-v5H2lI6bVyx4Y0klsP6vuZ37LlGpd6aOC31a8&uid=10012475&from=0)
    ```javascript
    {
        "response_status": {
            "error": "",
            "code": 0
        },
        "response_data": {
            "list": [
                {
                    "type": "charge",  //完成家族储值任务
                    "score": 1000,  //奖励分值
                    "time": 1615278500  //时间
                },
                {
                    "type": "login", //完成登陆任务
                    "score": 200,  //奖励分值
                    "time": 1615278300  //时间
                },
                {
                    "type": "sendGift",  //送礼
                    "uid": 10012475,  //收礼UID
                    "gid": 48,  //礼物ID
                    "score": 8000,  //奖励分值
                    "time": 1615278094,  //时间
                    "nick": "10012475",  //用户名称
                    "giftName": "banner返币"  //礼物名称
                },
                {
                    "type": "joinmic", //完成上麦任务
                    "uid": 10012714,  //用户UID
                    "score": 28,  //奖励分值
                    "time": 1615277584,  //时间
                    "nick": "10012714"  //用户名称
                }
            ]
        }
    }
    ```
    
## 12.申请加入家族列表
* 参数

    * `uid` 用户UID
    * `token` 用户token
   
 * [http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.applyList&token={token}&uid={uid}](http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.applyList&token=GF9O84K7tw0sEr2OBLIUjSMi-tiHk_tl4FbBRcP07Y48LpgYAJzSTMRMWFjBhmPQv5h-lnVLwBQjU0je_0z4dNYhts-v5H2lI6bVyx4Y0klsP6vuZ37LlGpd6aOC31a8&uid=10012475)
    ```javascript
    {
        "response_status": {
            "error": "",
            "code": 0
        },
        "response_data": {
            "list": [
                {
                    "uid": 10012439,  //用户UID
                    "nick": "10012439",  //用户名称
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10012439_1597974161.png",  //用户头像
                    "mailId": 2,  //邮件序号
                    "time": 1615282140  //时间
                }
            ]
        }
    }
    ```
    
    
## 13.其他动态列表
* 参数

    * `uid` 用户UID
    * `token` 用户token
    * `from`  翻页标记 (默认：0)
   
 * [http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.otherList&token={token}&uid={uid}&from={from}](http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.otherList&token=GF9O84K7tw0sEr2OBLIUjSMi-tiHk_tl4FbBRcP07Y48LpgYAJzSTMRMWFjBhmPQv5h-lnVLwBQjU0je_0z4dNYhts-v5H2lI6bVyx4Y0klsP6vuZ37LlGpd6aOC31a8&uid=10012475&from=0)
    ```javascript
    {
        "response_status": {
            "error": "",
            "code": 0
        },
        "response_data": {
            "list": [
                {
                    "uid": 10012714, //用户UID
                    "time": 1615276436,  //时间
                // status:
                // 1: 已同意
                // 2: 已拒绝
                // 3: 他已加入其他家族
                // 4: 他已退出家族
                    "status": 1,
                    "nick": "10012714" //用户名称
                }
            ]
        }
    }
    ```
    
## 14.守护榜
* 参数

    * `uid` 用户UID
    * `token` 用户token
    * `type`  榜单类型  pk：家族PK  , finals：家族争霸
    * `team`  战队  blue：蓝队,  red：红队  (type为pk时必须带上，finals则不需要)
    * `from`  翻页标记 (默认：0)
   
 * [http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.rank&token={token}&uid={uid}&type={type}&team={team}&from={from}](http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.rank&token=GF9O84K7tw0sEr2OBLIUjSMi-tiHk_tl4FbBRcP07Y48LpgYAJzSTMRMWFjBhmPQv5h-lnVLwBQjU0je_0z4dNYhts-v5H2lI6bVyx4Y0klsP6vuZ37LlGpd6aOC31a8&uid=10012475&type=pk&team=red&from=0)
    ```javascript
    {
        "response_status": {
            "error": "",
            "code": 0
        },
        "response_data": {
            "list": [
                {
                    "rank": 1,  //排名
                    "familyId": 1,  //家族序号
                    "uid": 10012475,  //用户UID
                    "nick": "10012475",  //用户名称
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10012475_1610416188.png",  //用户头像
                    "score": 8400,  //分值
                    "rid": 10966,  //族长的房间ID
                    "familyUser": [ //贡献的家族成员
                        {
                            "uid": "10012714",  //UID
                            "nick": "10012714",  //名称
                            "avatar": "http://udatefile.cat1314.com/uc/img/head_10012714_1610544078.png"  //头像
                        }
                    ]
                },
                {
                    "rank": 2,
                    "familyId": 2,
                    "uid": 10012439,
                    "nick": "10012439",
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10012439_1597974161.png",
                    "score": 0,
                    "rid": 10246,
                    "familyUser": []
                }
            ],
            "userRanking": {  //个人排名情况
                "rank": 1,  //排名
                "familyId": "1",  //家族序号
                "name": "家族名称",  //家族名称
                "avatar": "http://udatefile.cat1314.com/uc/img/head_10012475_1610416188.png",  //族长头像
                "score": 8400,  //分值
                "familyUser": [  //家族成员
                    {
                        "uid": "10012714",  //UID
                        "nick": "10012714",  //名称
                        "avatar": "http://udatefile.cat1314.com/uc/img/head_10012714_1610544078.png"  //头像
                    },
                    {
                        "uid": "10012475",
                        "nick": "10012475",
                        "avatar": "http://udatefile.cat1314.com/uc/img/head_10012475_1610416188.png"
                    }
                ],
                "team": "red"  //战队
            }
        }
    }
    ```
    
## 15.贡献榜 （不同时段贡献数据不同）
* 参数

    * `type`  榜单类型  pk：家族PK  , finals：家族争霸
    * `familyId`  家族序号
   
 * [http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.contributionRank&familyId={familyId}&type={type}](http://t.new.activity.udateapp.com/index.php?signture=innerserver&action=familyPK.contributionRank&familyId=1&type=pk)
    ```javascript
    {
        "response_status": {
            "error": "",
            "code": 0
        },
        "response_data": {
            "name": "家族名称",  //家族名称
            "concept": "这里是家族的理念",  //家族理念
            "list": [
                {
                    "nick": "10012714",  //贡献用户名称
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10012714_1610544078.png",  //贡献用户头像
                    "score": 8200,  //分值
                    "patriarch": false  //是否为族长
                }
            ]
        }
    }
    ```