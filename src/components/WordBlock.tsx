import React, { useState } from 'react'
import { Transition } from 'react-transition-group'
// import { FaLink } from 'react-icons/fa'
import { MdOpenInNew } from 'react-icons/md'

const dictionaries = [
  { url: 'https://jisho.org/search/', name: 'jisho' },
  { url: 'https://ejje.weblio.jp/content/', name: 'Weblio' },
]

type PropsType = {
  rsWord: string
  pvWord: string
}

const WordBlock: React.FC<PropsType> = ({ rsWord, pvWord }) => {
  const [dropdown, setDropdown] = useState<boolean>(false)
  // const [isClicked, setIsClicked] = useState<boolean>(false)

  // const onClickHandler = () => {
  //   setIsClicked(isClicked)
  // }
  const onMouseEnterHandler = () => {
    setDropdown(true)
  }
  const onMouseLeaveHandler = () => {
    setDropdown(false)
  }
  // const onBlurHandler = () => {
  //   setDropdown(false)
  //   setIsClicked(false)
  // }

  return (
    <span
      className='
        relative
        mr-2
      '
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      // onClick={onClickHandler}
    >
      <button
        className={`
          inline-block
          border-b-2
          border-solid
          ${
            /* isClicked */ dropdown
              ? 'border-sky-500 bg-sky-200 dark:bg-sky-800'
              : 'border-stone-500'
          }
          py-1
          px-[1px]
        `}
        // onBlur={onBlurHandler}
      >
        {pvWord}
      </button>
      <Transition
        in={dropdown}
        timeout={{
          enter: 20,
          exit: 200,
        }}
      >
        {(state: string) => {
          return (
            state !== 'exited' && (
              <div
                className={`
                  bg-stone-100 shadow-xl
                  dark:bg-stone-700
                  absolute
                  left-0
                  top-[100%]
                  whitespace-nowrap
                  divide-solid
                  divide-y
                  dark:divide-stone-700
                  duration-200
                  ${
                    state.match(/(entered)/)
                      ? 'translate-y-2 opacity-1 z-10'
                      : 'opacity-0'
                  }
                `}
              >
                {[rsWord, pvWord].map((word, i) => (
                  <React.Fragment key={pvWord + i}>
                    <p
                      className='
                        font-bold
                        text-xl
                        p-4
                        border-l-8
                        dark:border-stone-700
                        bg-white
                        dark:bg-stone-600
                      '
                    >
                      {word}
                    </p>

                    {dictionaries.map((dict) => {
                      return (
                        <p key={dict.name} className='block'>
                          <a
                            className='
                              w-full
                              p-4
                              flex
                              hover:bg-stone-300
                              dark:hover:bg-stone-600
                              items-center
                              justify-between
                            '
                            href={dict.url + word}
                            target='_blank'
                            rel='noreferrer'
                          >
                            <span className='mr-4'>{dict.name}</span>
                            <MdOpenInNew />
                          </a>
                        </p>
                      )
                    })}
                  </React.Fragment>
                ))}
              </div>
            )
          )
        }}
      </Transition>
    </span>
  )
}

export default WordBlock
