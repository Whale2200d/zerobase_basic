import styles from "./App.module.css"

import Header from "./Header"
import ListContainer from "./ListContainer"
import Footer from "./Footer"

function App() {
  return (
    <>
      <div className={styles.nav}>Nav</div>
      <Header />
      <ListContainer />
      <Footer />
    </>
  )
}

// 여러 번 사용될 수 있는 컴포넌트는 components 파일에 담고 버튼 컴포넌트로 구분한다.

export default App
