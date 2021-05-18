/**
 * api接口集合
 */
const API = {
    //初始化
    init: "/index.php?action=trueLove.init&token={token}&uid={uid}",
    //进入活动
    subscribe: "/index.php?action=trueLove.subscribe&token={token}&uid={uid}",
    //弹出窗口的邀请列表
    acceptableInvita:
        "/index.php?action=trueLove.acceptableInvita&token={token}&uid={uid}",
    //好友列表
    friends: "/index.php?action=trueLove.friends&token={token}&uid={uid}",
    //灵魂默契点击
    cooperateClick:
        "/index.php?action=trueLove.cooperateClick&token={token}&uid={uid}",
    //打招呼
    sayHello: "/index.php?action=trueLove.sayHello&token={token}&uid={uid}",
    //榜单
    rank: "/index.php?action=trueLove.rank&token={token}&uid={uid}&from={from}",
    //邀请好友
    invite:
        "/index.php?action=trueLove.invite&token={token}&uid={uid}&to_uid={to_uid}",
    //拒绝邀请
    reject:
        "/index.php?action=trueLove.reject&token={token}&uid={uid}&mail_id={mail_id}",
    //接受邀请
    accept:
        "/index.php?action=trueLove.accept&token={token}&uid={uid}&mail_id={mail_id}",
    //解除关系
    relieve: "/index.php?action=trueLove.relieve&token={token}&uid={uid}",
    //拒绝解除关系
    rejectRelieve:
        "/index.php?action=trueLove.rejectRelieve&token={token}&uid={uid}&mail_id={mail_id}",
    //接受解除关系
    acceptRelieve:
        "/index.php?action=trueLove.acceptRelieve&token={token}&uid={uid}&mail_id={mail_id}",
    //日常动态
    history:
        "/index.php?action=trueLove.history&token={token}&uid={uid}&from={from}",
    //制作成功广播
    notice: "/index.php?action=trueLove.notice",
    //邀请信箱
    invitedMail:
        "/index.php?action=trueLove.invitedMail&token={token}&uid={uid}&from={from}",
    //其他信箱
    otherMail:
        "/index.php?action=trueLove.otherMail&token={token}&uid={uid}&from={from}",
    //领取完成任務
    finishTheTask:
        "/index.php?action=trueLove.finishTheTask&token={token}&uid={uid}&task_name={task_name}",
    //点击制作
    makingRings:
        "/index.php?action=trueLove.makingRings&token={token}&uid={uid}&rid={rid}"
};

export default API;
