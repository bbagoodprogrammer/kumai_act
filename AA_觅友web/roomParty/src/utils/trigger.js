const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i)

function trigger(uri) {
	try {
		if (ios) {
			// goWalletpage()
			sendJsData(uri)
		} else {
			javascript: JSInterface.sendJsData(uri)
		}
	} catch (e) {
		console.log(e)
	}
}

export { ios, trigger }
