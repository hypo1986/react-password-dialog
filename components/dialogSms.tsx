import * as React from 'react'

import style from './dialogSms.scss'

interface Props {
  phone: string
  title?: string
  confirmText?: string
  confirmClick?: (code: any) => void
  resetSentClick?: () => void
  layerClick?: () => void
}
interface State {
  inputVal: string
  isError: boolean
  errorText: string
  timeCount: number
}
let interVal: any
class DialogSms extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      inputVal: '',
      isError: false,
      errorText: '',
      timeCount: 60
    }
  }

  componentDidMount() {
    this.downTime()
  }
  componentWillUnmount() {
    clearInterval(interVal)
  }

  downTime() {
    let { timeCount } = this.state
    let time = timeCount
    interVal = setInterval(() => {
      if (time < 0) {
        clearInterval(interVal)
      } else {
        this.setState({ timeCount: time-- })
      }
    }, 1000)
  }

  inputChange(val: any) {
    if (isNaN(val)) {
      this.setState({
        isError: false,
        errorText: '输入格式错误'
      })
    } else {
      this.setState({
        isError: true,
        errorText: ''
      })
    }
  }

  submitClick() {
    let { isError, inputVal } = this.state
    let { confirmClick } = this.props
    if (isError && confirmClick) {
      confirmClick(inputVal)
    } else {
      this.setState({
        isError: false,
        errorText: '输入格式错误'
      })
    }
  }

  resetSent(e: any) {
    e.stopPropagation()
    let { timeCount } = this.state
    let { resetSentClick } = this.props
    if (resetSentClick && timeCount === 0) {
      resetSentClick()
      this.setState(
        {
          timeCount: 60
        },
        () => {
          this.downTime()
        }
      )
    }
  }

  render() {
    let { phone, title, confirmText, layerClick } = this.props
    let { inputVal, errorText, timeCount } = this.state
    return (
      <div className={style.smsAlert} onClick={layerClick}>
        <div className={style.main} onClick={e => e.stopPropagation()}>
          <div className={style.title}>{title}</div>
          <div className={style.text}>
            <p>预留手机号：{phone}</p>
            <p className={style.smsForm}>
              短信验证码：
              <input
                type="text"
                maxLength={6}
                value={inputVal}
                onChange={e => {
                  this.setState({
                    inputVal: e.target.value
                  })
                  this.inputChange(e.target.value)
                }}
              />
              <span
                className={timeCount === 0 ? style.on : ''}
                onClick={e => this.resetSent(e)}
              >
                重新发送
              </span>
              <i>{timeCount}s</i>
            </p>
            <p className={style.ftError}>{errorText}</p>
          </div>
          <div className={style.btnWrap}>
            <div className={style.confirm} onClick={() => this.submitClick()}>
              {confirmText || '提交'}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DialogSms
