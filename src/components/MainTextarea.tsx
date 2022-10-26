import { SetStateAction, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as resultModule from '@/store/modules/result'

type PropsType = {}
const MainTextarea: React.FC<PropsType> = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [isTimingOut, setIsTimingOut] = useState<any>(null)
  const isRequesting = useSelector<resultModule.InitialStateProps>(
    (state) => state.isRequesting,
  )

  const dispatch = useDispatch<any>()

  const onChangeHandler = (e: {
    target: { value: SetStateAction<string> }
  }): void => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    if (inputValue) {
      clearTimeout(isTimingOut)
      setIsTimingOut(
        setTimeout(() => {
          console.log('requesting')
          // dispatch(resultModule.toggleIsRequesting())
          dispatch(resultModule.requestTranslate())
          setIsTimingOut(false)
        }, 1000 * 3),
      )
    } else {
      clearInterval(isTimingOut)
      setIsTimingOut(false)
    }

    // ↓ ESLintのルールを無視する
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  return (
    <textarea
      rows={8}
      className='
        resize-auto
        bg-slate-900
        border
        border-slate-600
      '
      value={inputValue}
      onChange={onChangeHandler}
    />
  )
}

export default MainTextarea
