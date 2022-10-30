import { Transition, SwitchTransition } from 'react-transition-group'
import * as translateModule from '@/store/modules/translate'
import { useSelector, useDispatch } from 'react-redux'

import { HiOutlineSwitchHorizontal } from 'react-icons/hi'

type TranstionNamePropsType = {
  name: string
  leftSide?: boolean
}

const TransitionLnagName: React.FC<TranstionNamePropsType> = ({ name, leftSide }) => {
  const timeout = 100

  return (
    <SwitchTransition >
      <Transition key={name} timeout={timeout}
      >
        {(state: string) => (
          <div
            className={`
              duration-200 translate-x
              ease-out
              ${state.match(/(entered)/) ? `opacity-1` : `${leftSide ? 'translate-x-full' : '-translate-x-full'} opacity-0`}
           `}
          >
            {name}
          </div>
        )}
      </Transition>
    </SwitchTransition>
  )
}

type PropsType = {}

const LanguageSwitch: React.FC<PropsType> = () => {
  const pair = useSelector<
    { translate: translateModule.InitialStateType },
    translateModule.InitialStateType['currentLangPair']
  >((state) => state.translate.currentLangPair)

  const langs = useSelector<
    { translate: translateModule.InitialStateType },
    translateModule.InitialStateType['langs']
  >((state) => state.translate.langs)

  const sourceLang = langs.find((lang) => lang.code == pair.source)
  const targetLang = langs.find((lang) => lang.code == pair.target)

  const dispatch = useDispatch()

  const onClickHandler = (): void => {
    dispatch(translateModule.switchPair())
  }

  return (
    <div
      className='
        grid
        grid-cols-3
        justify-items-center
        items-center
        w-[240px]
        mx-auto
        my-4
      '
    >
      <TransitionLnagName name={sourceLang.name} leftSide/>
      <div>
        <button
          onClick={onClickHandler}
          className='
            p-1
            border-2
            border-solid
            border-stone-500
            rounded-full
            transition-colors
            duration-200
            hover:bg-stone-500
          '
        >
          <HiOutlineSwitchHorizontal />
        </button>
      </div>
      <TransitionLnagName name={targetLang.name} />
    </div>
  )
}

export default LanguageSwitch
