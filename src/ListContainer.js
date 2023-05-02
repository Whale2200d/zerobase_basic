import styles from "./ListContainer.module.css"
import Button from "./components/Button"
import ListItem from "./components/ListItem"
import { useState, useEffect } from "react"
import axios from "axios"
import ListItemLayout from "./components/ListItemLayout"
import cx from "clsx"
import Modal from "./components/Modal"
import Pagination from "./components/Pagination"

export default function ListContainer() {
  const [inputValue, setInputValue] = useState("is:pr is:open")
  const [checked, setChecked] = useState(false)
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)

  // const MAX_PAGE = getData().totalCount // 30 / 100 = 3.3333 ≒ 4페이지 구성해야 함

  async function getData(pageParam) {
    const data = await axios.get(
      `https://api.github.com/repos/facebook/react/issues`,
      { params: { page: pageParam } },
    )
    setList(data.data)
  }

  useEffect(() => {
    getData(page)
  }, [page])

  return (
    <>
      <div className={styles.listContainer}>
        <div className={styles.topSection}>
          <input
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            style={{
              fontSize: "14px",
              backgroundColor: "green",
              color: "white",
            }}
          >
            New Issue
          </Button>
        </div>
        <OpenCloseFilters />
        <div className={styles.container}>
          <ListItemLayout className={styles.listFilter}>
            <ListFilter
              onChangeFilter={(filteredData) => {
                // 필터링된 요소에 맞게 데이터를 불러오기
                // const data = getData('필터링된 데이터');
                // 변경된 데이터를 저장한다는 것은 다시 state를 만들어줘야 한다는 것을 의미한다.
              }}
            />
          </ListItemLayout>
          {list.map((item) => (
            <ListItem
              key={item.id}
              data={item}
              checked={checked}
              onChangeCheckBox={() => setChecked((checked) => !checked)}
            />
          ))}
        </div>
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          maxPage={10}
          currentPage={page}
          onClickPageButton={(number) => setPage(number)}
        />
      </div>
    </>
  )
}

function ListFilter({ onChangeFilter }) {
  return (
    <>
      <div className={styles.filterLists}>
        <ListFilterItem>Author</ListFilterItem>
        <ListFilterItem>Label</ListFilterItem>
        <ListFilterItem>Projects</ListFilterItem>
        <ListFilterItem>Milestones</ListFilterItem>
        <ListFilterItem>Assignee</ListFilterItem>
        <ListFilterItem>Sport</ListFilterItem>
      </div>
    </>
  )
}

function ListFilterItem({ onClick, children, onChangeFilter }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className={styles.filterItem}>
      <span role="button" onClick={() => setShowModal(true)}>
        {children} ▼
      </span>
      <div className={styles.modalContainer}>
        <Modal
          opened={showModal}
          onClose={() => setShowModal(false)}
          placeholder="Filter labels"
          searchDataList={["Data", "Labels", "Apple"]}
          onClickCell={() => {
            // 클릭된 정보를 통해 리스트를 필터링할 것이다.
            onChangeFilter()
          }}
        />
      </div>
    </div>
  )
}

function OpenCloseFilters({ data }) {
  const [isOpenMode, setIsOpenMode] = useState(true)

  // Open, Close 버튼으로 List의 Open/Close 갯수 유무 확인
  // const data = getData();
  // const openedData = data.filter((d) => d.state === 'open');
  // const closedData = data.filter((d) => d.state === 'close');
  const OpenedModeDataSize = 1
  const ClosedModeDataSize = 2

  return (
    <>
      <OpenCloseFilter
        size={OpenedModeDataSize}
        state="Open"
        selected={isOpenMode}
        onClick={() => setIsOpenMode(true)}
      />
      <OpenCloseFilter
        size={ClosedModeDataSize}
        state="Closed"
        selected={!isOpenMode}
        onClick={() => setIsOpenMode(false)}
      />
    </>
  )
}

function OpenCloseFilter({ size, state, selected, onClick }) {
  return (
    <span
      role="button"
      className={cx(styles.textFilter, { [styles.selected]: selected })}
      onClick={onClick}
    >
      {size} {state}
    </span>
  )
}
