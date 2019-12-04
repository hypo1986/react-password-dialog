
## 简介

基于react-ts封装的组件。


1、弹层显示输入六位数字密码，支持设置两次密码 + 检验，内嵌数字键盘。
```bash
<DialogPwd
	title="设置基金交易密码"
	againTitle="请您再次输入"
	type="set"
	confirmClick={values => this.pwdSubmit(values)}
	layerClick={() => this.pwdClose()}
/>
```

2、弹层显示手机验证码 + 60秒倒计时。
```bash
<DialogSms
	phone={mobile}
	title="身份确认"
	confirmClick={code => this.smsSubmit(code)}
	layerClick={() => this.smsClose()}
	resetSentClick={() => this.smsResetSend()}
/>
```

以上组件主要适用于移动端项目。
