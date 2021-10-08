import { ios, trigger } from './trigger'

/**
 *储值页（钱包）
 */
function walletpage() {
	trigger(`app://walletpage`)
}

/**
 *派对页
 */
function party_recom_room() {
	trigger(`app://mainPage?page_index=party&page_index_child=party_recom_room`)
}
/**
 *我的派对页
 */
function party_recom_room() {
	trigger(`app://mainPage?page_index=party&page_index_child=party_my_room`)
}

/**
 *配對页
 */
function pair_pair() {
	trigger(`app://mainPage?page_index=pair&page_index_child=pair_pair`)
}

/**
 *搭讪页
 */
function pair_accost() {
	trigger(`app://mainPage?page_index=pair&page_index_child=pair_accost`)
}

/**
 *訊息
 */
function message_msg() {
	trigger(`app://mainPage?page_index=message&page_index_child=message_msg`)
}

/**
 *好友
 */
function message_friend() {
	trigger(
		`app://mainPage?page_index=message&page_index_child=message_friend `
	)
}

/**
 *追踪
 */
function moment_follow() {
	trigger(`app://mainPage?page_index=moment&page_index_child=moment_follow `)
}

/**
 *推荐
 */
function moment_recom() {
	trigger(`app://mainPage?page_index=moment&page_index_child=moment_recom `)
}
/**
 *声音
 */
function moment_sound() {
	trigger(`app://mainPage?page_index=moment&page_index_child=moment_sound `)
}

/**
 *我的主页
 *ios暂不支持此方法
 */
function me() {
	trigger(`app://mainPage?page_index=me`)
}

/**
 *资料编辑页
 *新增方法app://editPersonalDetails，ios暂无不支持
 */
function editPersonalDetails() {
	trigger(`app://eidpersonalDetails`)
}

/**
 *创建房间页
 */
function createroom() {
	trigger(`app://createroom`)
}

/**
 *签到
 */
function taskSign() {
	trigger(`app://taskSign`)
}

/**
 * 動態發佈器
 * ios新方法app://leadSongpage (IOS只有发图片，没有发语音)
 * @param {number} type 发图片=1，t发语音=2
 */
function leadSongpage(type) {
	if (ios) {
		trigger(`app://makeSoundBottlespage`)
	} else {
		trigger(`app://leadSongpage?type=${type}`)
	}
}

/**
 * 用戶資料頁
 * 注：ios uid=xx必须在字符串的最后面
 * @param {string} uid 用户UID
 */
function userInfo(uid) {
	trigger(`app://userInfo?uid=${uid}`)
}

/**
 *CP 小窝
 * 注：ios toUid=xx必须在字符串的最后面
 * @param {string} toUid 用户UID
 */
function cpHouse(toUid) {
	trigger(`app://cpHouse?toUid=${toUid}`)
}

/**
 *作品详情、动态详情
 * 注：ios usid=xx必须在字符串的最后面
 * @param {string} usid 作品id
 */
function workDetails(usid) {
	trigger(`app://workDetails?usid=${usid}`)
}

/**
 *商场
 *ios（只能跳转商场，默认戒指页（不可控））
 * @param {number} page :0 戒指，1头像框 2座驾 3：我的
 */
function headwearShop(page) {
	if (ios) {
		trigger(`app://headwearShop`)
	}
	trigger(`app://headwearShop?page=${page}`)
}

/**
 *私讯
 * 注：ios toUid=xx必须在字符串的最后面
 * @param {string} toUid 用户uid
 */
function chat(toUid) {
	trigger(`app://headwearShop?toUid=${toUid}`)
}

/**
 *话题
 * 注：ios tpid=xx必须在字符串的最后面
 * @param {string} tpid
 */
function topicDetails(tpid) {
	trigger(`app://topicDetails?tpid=${tpid}`)
}

/**
 *进房
 * 注：ios rid=xx必须在字符串的最后面
 * @param {string} rid 房间ID
 */
function room(rid) {
	trigger(`app://room?rid=${rid}`)
}

/**
 *cp签到
 * @param {string} json 服务器返回签到成功的response_data
 */
function onCoupleClockInTask(json) {
	return callAppNew('getStatusBarHeight')
}

/**
 *发起表白
 * @param {string} uid  用户UID
 * @return {*}
 */
function onGoToAskCouple(uid) {
	return callAppNew('getStatusBarHeight', uid)
}

/**
 *用户资料编辑
 */
function goUserInfo() {
	return callAppNew('goUserInfo')
}

/**
 *数据上报
 * @param {*} json
 * @return {*}
 */
function reportWebEvent(json) {
	return callAppNew('reportWebEvent', json)
}

/**
 *隐藏加载动画
 * @return {*}
 */
function hideLoading() {
	if (ios) {
		return callAppNew('onHideLoading')
	} else {
		return callAppNew('hideLoading')
	}
}

/**
 *相册
 * @return {*}
 */
function goPhotoAlbum() {
	return callAppNew('goPhotoAlbum')
}

/**
 *快速进房抢麦
 * @return {*}
 */
function goGame() {
	return callAppNew('goGame')
}

/**
 *快速进房抢麦
 * @param {*} json
 * @return {*}
 */
function closeWeb(json) {
	return callAppNew('closeWeb', json)
}

/**
 *送礼，房间内
 * @param {*} json
 * @return {*}
 */
function sendLuckyBox(json) {
	return callAppNew('sendLuckyBox', json)
}

/**
 *获取设备号
 * @return {*}
 */
function getDeviceId() {
	return callAppNew('getDeviceId')
}

/**
 *获取状态栏和标题栏高度
 * @return {number}
 */
function getStatusBarHeight() {
	return callAppNew('getStatusBarHeight', undefined, true) || 0
}

/**
 *状态栏主题 light:白色 black：黑色
 * @param {string} skin
 */
function setStatusBarStyle(skin) {
	skin = skin === 'black' ? skin : 'light'
	var args = JSON.stringify({ skin: skin })
	callAppNew('setStatusBarStyle', args)
}

/**
 *设置全屏  true全屏
 * @param {boolean} full
 */
function setFullScreen(full) {
	full = full !== false
	callAppNew('setFullScreen', full)
}

/**
 *APP事件调用
 *
 * @param {string} method  app事件名
 * @param {string boolean number null} data 时间参数
 * @param {boolean} [sync=false]
 * @return {*}
 */
function callAppNew(method, data, sync = false) {
	if (method && typeof method == 'string') {
		const dataValue =
			typeof data == 'string' ||
			typeof data == 'boolean' ||
			typeof data == 'number' ||
			data === null
				? data
				: JSON.stringify(data)
		const hasArgs = typeof dataValue != 'undefined' && data != null
		try {
			if (ios) {
				if (sync) {
					return prompt(JSON.stringify({ method, data }))
				} else {
					hasArgs ? window[method](dataValue) : window[method]()
				}
			} else {
				return hasArgs
					? JSInterface[method](dataValue)
					: JSInterface[method]()
			}
		} catch (e) {}
	}
}

// 其他适配界面  安卓预留，跳转前需向客户端取对应参数
// (ios 没有这个)
// app://gotoPage?data=xx
// data: json数据
// {
//   "page": "com.utalk.hsing.activity.PrivateChatActivity", //activity
//   "datas": [
//     {
//       "paramType": "int",  //数据类型
//       "paramName": "opposite_uid",  //参数key
//       "paramValue": 123      //value
//     },
//     {
//       "paramType": "list",
//       "paramName": "list",
//       "paramValue": [
//         {
//           "paramType": "int",
//           "paramName": "opposite_uid",
//           "paramValue": 123
//         }
//       ]
//     }
//   ]
// }

export {
	walletpage,
	party_recom_room,
	pair_pair,
	pair_accost,
	message_msg,
	message_friend,
	moment_follow,
	moment_recom,
	moment_sound,
	me,
	editPersonalDetails,
	createroom,
	taskSign,
	leadSongpage,
	userInfo,
	cpHouse,
	workDetails,
	headwearShop,
	chat,
	topicDetails,
	room,
	getStatusBarHeight,
	setStatusBarStyle,
	setFullScreen,
	onCoupleClockInTask,
	onGoToAskCouple,
	goUserInfo,
	reportWebEvent,
	hideLoading,
	goPhotoAlbum,
	goGame,
	closeWeb,
	sendLuckyBox,
	getDeviceId,
}
// 分享 获取上麦用户
