import { SetStateAction, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as resultModule from '@/store/modules/result'

const waitTime: number = 1000 * 2

type PropsType = {}
const MainTextarea: React.FC<PropsType> = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [isTimingOut, setIsTimingOut] = useState<any>(null)
  const isRequesting = useSelector<resultModule.InitialStateType>(
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
          dispatch(resultModule.requestTranslate(inputValue))
          setIsTimingOut(false)
        }, waitTime),
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
      placeholder='テキストを入力'
      rows={8}
      className='
        resize-auto
        bg-stone-900
        border
        border-stone-600
        rounded-lg
        p-4
      '
      value={inputValue}
      onChange={onChangeHandler}
    />
  )
}

export default MainTextarea
