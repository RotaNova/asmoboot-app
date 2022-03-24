// 我的相关接口  
// 获取基本信息
const getUserBasicInfo = '/v1/setAccount/getUserBasicInfo';  
// 修改基本信息
const updateUserBasicInfo = '/v1/setAccount/updateUserBasicInfo';  
// 退出登录
const logout = '/v1/manageUser/logout'; 
// 获取安全设置
const getSecuritySettings = '/v1/setAccount/getSecuritySettings'; 
// 设置二次验证方式
const loginSecondaryAuthentication = '/v1/setAccount/loginSecondaryAuthentication'; 
// 通过旧密码修改密码
const updatePasswordByOldPassword = '/v1/setAccount/updatePasswordByOldPassword'; 
// 通过旧密码修改密码
const sendUpdateEmailVerificationCode = '/v1/setAccount/sendUpdateEmailVerificationCode'; 
// 确认邮箱验证码
const checkUpdateEmailVerificationCode = '/v1/setAccount/checkUpdateEmailVerificationCode'; 
// 邮箱修改密码 
const updateEmailPasswordByCode = '/v1/setAccount/updateEmailPasswordByCode'; 
// 获取手机验证码
const sendUpdatePhoneVerificationCode = '/v1/setAccount/sendUpdatePhoneVerificationCode'; 
// 验证手机验证码
const checkUpdatePhoneVerificationCode = '/v1/setAccount/checkUpdatePhoneVerificationCode'; 
// 手机号修改
const updatePhonePasswordByCode = '/v1/setAccount/updatePhonePasswordByCode'; 
// 获取解绑手机号验证码 
const sendUnbindPhoneVerificationCode = '/v1/setAccount/sendUnbindPhoneVerificationCode'; 
// 解绑手机号 
const unbindPhone = '/v1/setAccount/unbindPhone'; 
// 获取绑定手机号验证码  
const sendBindPhoneVerificationCode = '/v1/setAccount/sendBindPhoneVerificationCode'; 
// 绑定手机号 
const bindPhone = '/v1/setAccount/bindPhone'; 
// 获取解绑邮箱验证码
const sendUnbindEmailVerificationCode = '/v1/setAccount/sendUnbindEmailVerificationCode'; 
// 解绑邮箱 
const unbindMailbox = '/v1/setAccount/unbindMailbox'; 
// 获取绑定邮箱验证码 
const sendBindEmailVerificationCode = '/v1/setAccount/sendBindEmailVerificationCode'; 
// 绑定邮箱 
const bindMailbox = '/v1/setAccount/bindMailbox'; 

export{
	getUserBasicInfo,
	updateUserBasicInfo,
	logout,
	getSecuritySettings,
	loginSecondaryAuthentication,
	updatePasswordByOldPassword,
	sendUpdateEmailVerificationCode,
	checkUpdateEmailVerificationCode,
	updateEmailPasswordByCode,
	sendUpdatePhoneVerificationCode,
	checkUpdatePhoneVerificationCode,
	updatePhonePasswordByCode,
	sendUnbindPhoneVerificationCode,
	unbindPhone,
	sendBindPhoneVerificationCode,
	bindPhone,
	sendUnbindEmailVerificationCode,
	unbindMailbox,
	sendBindEmailVerificationCode,
	bindMailbox
}