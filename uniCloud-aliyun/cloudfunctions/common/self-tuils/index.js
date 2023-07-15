const uniID = require("uni-id-common")
// 获取用户信息，校验 token 真实性，确认当前用户
const getUserInfo = async function(that){
	// 获取 token
	const token = that.getUniIdToken()
	const clientInfo = that.getClientInfo()
	// 获取uniID
	const uniIDIns = uniID.createInstance({clientInfo})
	// 校验 token
	return await uniIDIns.checkToken(token)
}

module.exports = {
	getUserInfo
}
