import styles from "./ListContainer.module.css"
import Button from "./components/Button"
import ListItem from "./components/ListItem"
import { useState, useEffect } from "react"
import axios from "axios"
import ListItemLayout from "./components/ListItemLayout"
import OpenCloseFilters from "./components/OpenCloseFilters"
import ListFilter from "./components/ListFilter"

import Pagination from "./components/Pagination"

import { GITHUB_API } from "./GITHUB_API"

export default function ListContainer() {
  const [inputValue, setInputValue] = useState("is:pr is:open")
  const [checked, setChecked] = useState(false)
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [isOpenMode, setIsOpenMode] = useState(true)
  const [params, setParams] = useState()

  // const MAX_PAGE = getData().totalCount // 30 / 100 = 3.3333 ≒ 4페이지 구성해야 함

  async function getData(params) {
    const data = await axios.get(`${GITHUB_API}/repos/facebook/react/issues`, {
      params,
    })
    setList(data.data)
  }

  useEffect(() => {
    getData({ page, state: isOpenMode ? "open" : "closed", ...params })
  }, [page, isOpenMode, params])

  // console.log({ list })

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
        <OpenCloseFilters isOpenMode={isOpenMode} onClickMode={setIsOpenMode} />
        <div className={styles.container}>
          <ListItemLayout className={styles.listFilter}>
            <ListFilter
              onChangeFilter={(params) => {
                // 필터링된 요소에 맞게 데이터를 불러오기
                // const data = getData('필터링된 데이터');
                // 변경된 데이터를 저장한다는 것은 다시 state를 만들어줘야 한다는 것을 의미한다.
                setParams(params)
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
