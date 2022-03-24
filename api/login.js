// 登录相关接口  
// 账户密码登录
const passWordLogin = '/v1/manageUser/passWordLogin';  
// 手机号登录
const phoneLogin = '/v1/manageUser/phoneLogin';
// 登录时的手机验证码
const sendLoginPhoneVerificationCode = '/v1/manageUser/sendLoginPhoneVerificationCode';
// 获取绑定信息
const getBindInfo = '/v1/manageUser/getBindInfo';
// 生成图片验证码 
const getVerify = '/v1/manageUser/getVerify';
// 获取手机验证码
const sendRetrievePwPhoneCaptcha = '/v1/manageUser/sendRetrievePwPhoneCaptcha';
// 修改密码
const updatePhonePasswordByCode = '/v1/manageUser/updatePhonePasswordByCode';
// 获取二次验证方式   
const getSecondVerification = '/v1/manageUser/getSecondVerification';
// 手机号完整度验证
const mobilePhoneIntegrityVerification = '/v1/manageUser/mobilePhoneIntegrityVerification';
// 获取邮箱验证码  
const sendSecondaryEmailVerificationCode = '/v1/manageUser/sendSecondaryEmailVerificationCode';
// 邮箱验证码登录 
const secondEmailLogin = '/v1/manageUser/secondEmailLogin';
// 二次验证获取手机验证码
const sendSecondPhoneVerificationCode = '/v1/manageUser/sendSecondPhoneVerificationCode';
// 手机验证码登录 
const secondPhoneLogin = '/v1/manageUser/secondPhoneLogin';
// 邮箱完整度
const mobileEmailIntegrityVerification = '/v1/manageUser/mobileEmailIntegrityVerification';
// 获取标题  
const getIndexTitle = '/v1/index/getIndexTitle';
// 首次登录修改新密码
const updateFirstPassword = '/v1/manageUser/updateFirstPassword';
export{
	passWordLogin,
	phoneLogin,
	sendLoginPhoneVerificationCode,
	getBindInfo,
	getVerify,
	sendRetrievePwPhoneCaptcha,
	updatePhonePasswordByCode,
	getSecondVerification,
	mobilePhoneIntegrityVerification,
	sendSecondaryEmailVerificationCode,
	secondEmailLogin,
	sendSecondPhoneVerificationCode,
	secondPhoneLogin,
	mobileEmailIntegrityVerification,
	getIndexTitle,
	updateFirstPassword
}