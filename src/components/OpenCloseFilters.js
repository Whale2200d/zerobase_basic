import OpenCloseFilter from "./OpenCloseFilter"

export default function OpenCloseFilters({ isOpenMode, onClickMode }) {
  // const [isOpenMode, setIsOpenMode] = useState(true)

  // Open, Close 버튼으로 List의 Open/Close 갯수 유무 확인
  // const data = getData();
  // const openedData = data.filter((d) => d.state === 'open');
  // const closedData = data.filter((d) => d.state === 'close');
  // const OpenedModeDataSize = 1
  // const ClosedModeDataSize = 2

  return (
    <>
      <OpenCloseFilter
        // size={OpenedModeDataSize}
        state="Open"
        selected={isOpenMode}
        onClick={() => onClickMode(true)}
      />
      <OpenCloseFilter
        // size={ClosedModeDataSize}
        state="Closed"
        selected={!isOpenMode}
        onClick={() => onClickMode(false)}
      />
    </>
  )
}
