import * as React from 'react'
// import { Link } from 'react-router-dom'
import { mClient } from 'frame/net/clientFactory'
import { connect } from 'react-redux'
import { setVars } from '../../../redux/action'
import requireVisitor from 'frame/hoc/requireVisitor'
import style from './cardAuth.scss'
import { Header } from 'frame/components'
import { DialogSms, DialogPwd } from '../components/index'
import { RouteComponentProps } from 'react-router'
import { toast } from 'frame/components/popup'

interface MatchParams {
  id: string
}

interface Props extends RouteComponentProps<MatchParams> {
  init: () => void
  history: any
  visitor: any
  cartAuthData: any
}

interface State {
  inputVal: string
  isShowSms: boolean
  isShowPwd: boolean
  wayVal: number
  accoreqserial: string
  otherserial: string
  xjbAccountStatus: string
  yinliancdcard: string
}
@requireVisitor
export class CardAuth extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      inputVal: '',
      isShowSms: false,
      isShowPwd: false,
      wayVal: 1,
      accoreqserial: '',
      otherserial: '',
      xjbAccountStatus: '',
      yinliancdcard: ''
    }
  }

  componentDidMount() {
    this.props.init()
  }

  confirmSubmit(value?: string) {
    //do
  }

  submitForm() {
    //do
  }
  sentSmsApi() {
    //do
  }

  smsSubmit(code: any) {
    //do
  }

  tabWay(val: number) {
    this.setState({
      wayVal: val
    })
  }

  smsResetSend() {
    this.sentSmsApi()
  }

  smsClose() {
    this.setState({
      isShowSms: false
    })
  }

  pwdClose() {
    this.setState({
      isShowPwd: false
    })
  }

  pwdSubmit(values: string) {
    this.setState({
      isShowPwd: false
    })
    this.confirmSubmit(values)
  }

  public render() {
    let { visitor, cartAuthData } = this.props
    let { fortuneAccount = [] } = cartAuthData
    let { mobile } = visitor || ''
    let { isShowSms, isShowPwd, wayVal } = this.state
    return (
      <div>
        <div className={style.botBtn}>
          text ...
        </div>
        {isShowSms && (
          <DialogSms
            phone={mobile}
            title="身份确认"
            confirmClick={code => this.smsSubmit(code)}
            layerClick={() => this.smsClose()}
            resetSentClick={() => this.smsResetSend()}
          />
        )}
        {isShowPwd && (
          <DialogPwd
            title="设置基金交易密码"
            againTitle="请您再次输入"
            type="set"
            confirmClick={values => this.pwdSubmit(values)}
            layerClick={() => this.pwdClose()}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    cartAuthData: state.vars.cartAuthData || {},
    visitor: state.vars.visitor
  }
}
const mapDispatchToProps = (dispath: any, props: any) => {
  return {
    init: () => {
      //do
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardAuth)
