import { useSelector } from 'react-redux'
import * as translateModule from '@/store/modules/translate'

import WordBlock from '@/components/WordBlock'

const DisplayArea: React.FC = () => {
  const status = useSelector<
    { translate: translateModule.InitialStateType },
    translateModule.InitialStateType['status']
  >((state) => state.translate.status)
  const isRequesting = useSelector<
    { translate: translateModule.InitialStateType },
    translateModule.InitialStateType['isRequesting']
  >((state) => state.translate.isRequesting)
  const result = useSelector<
    { translate: translateModule.InitialStateType },
    translateModule.InitialStateType['result']
  >((state) => state.translate.result)

  return (
    <div
      className='
        bg-stone-100
        dark:bg-stone-900
        border
        border-stone-600
        rounded-lg
        p-4
      '
    >
      {isRequesting && (
        <div
          className='
            flex
            items-center gap-2
          '
        >
          <span
            className='
              inline-block
              h-4
              w-4
              bg-orange-600
              rounded-full
              animate-ping
            '
          ></span>
          <span
            className='
              text-orange-600/60
              font-bold
              animate-pulse
            '
          >
            {status}
          </span>
        </div>
      )}
      <div>
        {/* <pre className='whitespace-pre'>{JSON.stringify(result, null, 2)}</pre> */}
        {(result.source.length &&
          result.target.length && [
            <div key='source' className='pb-4'>
              <p>
                <small
                  className='
                    bg-orange-400
                    text-black
                    font-bold
                    px-[4px]
                    py-[1px]
                    rounded-sm
                    inline-block
                    mb-2
                  '
                >
                  Source
                </small>
              </p>
              {result.source.map(({ translatedWord, word }, i) => {
                return (
                  <WordBlock
                    key={word + i}
                    rsWord={translatedWord}
                    pvWord={word}
                  />
                )
              })}
            </div>,
            <div key='target'>
              <p>
                <small
                  className='
                    bg-sky-400
                    text-black
                    font-bold
                    px-[4px]
                    py-[1px]
                    rounded-sm
                    inline-block
                    mb-2
                  '
                >
                  Result
                </small>
              </p>
              {result.target.map(({ translatedWord, word }, i) => {
                return (
                  <WordBlock
                    key={word + i}
                    rsWord={translatedWord}
                    pvWord={word}
                  />
                )
              })}
            </div>,
          ]) ||
          false}
      </div>
    </div>
  )
}

export default DisplayArea
