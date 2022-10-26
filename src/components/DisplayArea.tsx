import { useSelector, useDispatch } from 'react-redux'

const DisplayArea: React.FC = () => {
  const status = useSelector((state: any) => state.result.status)
  const isRequesting = useSelector((state: any) => state.result.isRequesting)

  return (
    <div
      className='
        bg-slate-900
        border
        border-slate-600
      '
    >
      {isRequesting && (
        <div
          className='
            flex
            items-center gap-2
            p-2
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
    </div>
  )
}

export default DisplayArea
