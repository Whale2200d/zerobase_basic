import { useState, useEffect } from "react"
import Modal from "./Modal"
import styles from "./ListFilter.module.css"
import axios from "axios"

import { GITHUB_API } from "../GITHUB_API"

export default function ListFilter({ onChangeFilter }) {
  const [showModal, setShowModal] = useState()
  const [list, setList] = useState([])
  const filterList = [
    // "Author",
    "Label",
    // "Project",
    "Milestone",
    "Assignee",
    // "Sport",
  ]

  async function getData(apiPath) {
    const data = await axios.get(
      `${GITHUB_API}/repos/facebook/react/${apiPath}`,
    )

    let result = []
    // 데이터 schema 가공 : name, title, login
    switch (apiPath) {
      case "assignees":
        result = data.data.map((d) => ({
          name: d.login,
        }))
        break
      case "milestones":
        result = data.data.map((d) => ({
          name: d.title,
        }))
        break
      case "label":
      default:
        result = data.data
    }

    setList(result)
  }

  useEffect(() => {
    if (showModal) {
      const apiPath = `${showModal.toLowerCase()}s`
      getData(apiPath)
    }
  }, [showModal])

  return (
    <>
      <div className={styles.filterLists}>
        {filterList.map((filter) => (
          <ListFilterItem
            searchDataList={list}
            key={filter}
            onClick={() => setShowModal(filter)}
            onClose={() => setShowModal()}
            showModal={showModal === filter}
            onChangeFilter={onChangeFilter}
          >
            {filter}
          </ListFilterItem>
        ))}
      </div>
    </>
  )
}

function ListFilterItem({
  children,
  onChangeFilter,
  placeholder,
  searchDataList,
  onClick,
  onClose,
  showModal,
}) {
  const [list, setList] = useState(searchDataList)

  useEffect(() => {
    setList(searchDataList)
  }, [searchDataList])

  return (
    <div className={styles.filterItem}>
      <span role="button" onClick={onClick}>
        {children} ▼
      </span>
      <div className={styles.modalContainer}>
        <Modal
          title={children}
          opened={showModal}
          onClose={onClose}
          placeholder={placeholder}
          searchDataList={list}
          onClickCell={(params) => {
            // 클릭된 정보를 통해 리스트를 필터링할 것이다.
            // const data = getData('필터링된 정보')
            // onChangeFilter(data);
            onChangeFilter(params)
          }}
        />
      </div>
    </div>
  )
}
