import { useSelector, useDispatch } from 'react-redux'

import WordBlock from '@/components/WordBlock'

const DisplayArea: React.FC = () => {
  const status = useSelector((state: any) => state.result.status)
  const isRequesting = useSelector((state: any) => state.result.isRequesting)

  return (
    <div
      className='
        bg-stone-900
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
        <WordBlock rsWord='sushi' pvWord='寿司' />
        <WordBlock rsWord='mushroom' pvWord='きのこ' />
      </div>
    </div>
  )
}

export default DisplayArea
