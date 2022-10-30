import { SetStateAction, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as translateModule from '@/store/modules/translate'

type PropsType = {}
const MainTextarea: React.FC<PropsType> = () => {
  const waitTime: number = 1000 * 2

  const [inputValue, setInputValue] = useState<string>('')
  const [isTimingOut, setIsTimingOut] = useState<any>(null)

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
          dispatch(translateModule.deleteInput())
          dispatch(translateModule.requestTranslate(inputValue))
          setIsTimingOut(false)
        }, waitTime),
      )
    } else {
      clearInterval(isTimingOut)
      setIsTimingOut(false)
      dispatch(translateModule.deleteInput())
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
