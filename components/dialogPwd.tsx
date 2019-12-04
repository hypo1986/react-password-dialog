import * as React from 'react'
import { toast } from 'frame/components/popup'
import style from './dialogPwd.scss'

interface Props {
  title: string
  againTitle?: string
  confirmText?: string
  type?: string //set: 需要输入两次
  confirmClick?: (values: any) => void
  layerClick?: () => void
}
interface State {
  cTitle: string
  isAgain: boolean
  values: string[]
  oldValues: string[]
}

class DialogPwd extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      cTitle: '',
      isAgain: false,
      values: [],
      oldValues: []
    }
  }

  componentDidMount() {
    let { title } = this.props
    this.setState({
      cTitle: title
    })
  }

  componentWillUnmount() {
    this.setState({
      isAgain: false,
      values: [],
      oldValues: []
    })
  }

  submitClick() {
    let { values } = this.state
    let { confirmClick, type, againTitle = '' } = this.props
    if (values.length === 6 && confirmClick) {
      if (type === 'set') {
        this.setState({
          isAgain: true,
          oldValues: values,
          values: [],
          cTitle: againTitle
        })
      } else {
        confirmClick(values.join(''))
      }
    } else {
      toast('请输入6位数字')
    }
  }

  againSubmitClick() {
    let { values, oldValues } = this.state
    let { confirmClick } = this.props
    let valuesStr = values.join('')
    let oldValuesStr = oldValues.join('')
    if (valuesStr === oldValuesStr && confirmClick) {
      confirmClick(valuesStr)
    } else {
      toast('两次密码不一致')
    }
  }

  keyboardClick(key: string) {
    let { values } = this.state
    if (values.length < 6) {
      this.setState({
        values: values.concat(key)
      })
    }
  }

  keybackClick() {
    let { values } = this.state
    let arr = values.slice()
    arr.pop()
    if (values.length > 0) {
      values.pop()
      this.setState({
        values: arr
      })
    }
  }

  render() {
    let { confirmText, layerClick } = this.props
    let { values, cTitle, isAgain } = this.state || []
    let values1 = values && values.length > 0 ? values[0] : ''
    let values2 = values && values.length > 1 ? values[1] : ''
    let values3 = values && values.length > 2 ? values[2] : ''
    let values4 = values && values.length > 3 ? values[3] : ''
    let values5 = values && values.length > 4 ? values[4] : ''
    let values6 = values && values.length > 5 ? values[5] : ''
    return (
      <div className={style.pwdAlert} onClick={layerClick}>
        <div className={style.main} onClick={e => e.stopPropagation()}>
          <div className={style.title}>{cTitle}</div>
          <div className={style.text}>
            <span>
              <input type="password" disabled={true} value={values1} />
              <input type="password" disabled={true} value={values2} />
              <input type="password" disabled={true} value={values3} />
              <input type="password" disabled={true} value={values4} />
              <input type="password" disabled={true} value={values5} />
              <input type="password" disabled={true} value={values6} />
            </span>
          </div>
          <div className={style.btnWrap}>
            {!isAgain && (
              <div className={style.confirm} onClick={() => this.submitClick()}>
                {confirmText || '提交'}
              </div>
            )}
            {isAgain && (
              <div
                className={style.confirm}
                onClick={() => this.againSubmitClick()}
              >
                {confirmText || '提交'}
              </div>
            )}
          </div>
        </div>
        <div className={style.keyboard} onClick={e => e.stopPropagation()}>
          <ul>
            <li onClick={() => this.keyboardClick('1')}>1</li>
            <li onClick={() => this.keyboardClick('2')}>2</li>
            <li onClick={() => this.keyboardClick('3')}>3</li>
          </ul>
          <ul>
            <li onClick={() => this.keyboardClick('4')}>4</li>
            <li onClick={() => this.keyboardClick('5')}>5</li>
            <li onClick={() => this.keyboardClick('6')}>6</li>
          </ul>
          <ul>
            <li onClick={() => this.keyboardClick('7')}>7</li>
            <li onClick={() => this.keyboardClick('8')}>8</li>
            <li onClick={() => this.keyboardClick('9')}>9</li>
          </ul>
          <ul>
            <li />
            <li onClick={() => this.keyboardClick('0')}>0</li>
            <li onClick={() => this.keybackClick()}>
              <span className={style.back}>×</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default DialogPwd
