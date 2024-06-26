import React, { useState } from "react";
import styles from "../styles/SearchBox.module.css";

// 검색창 input 컴포넌트
function SearchWindow(props) {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = e => {
    const inputValue = e.target.value;
    setSearchText(inputValue);
    props.onSearch(inputValue); // 검색어 변경 시 부모 컴포넌트로 검색어 전달
  };

  return (
    <div className={styles.search_window}>
      <input
        placeholder={props.placeholder}
        className={styles.search_input}
        onChange={handleSearchChange}
        value={searchText}
      ></input>
      <button className={styles.magnifier}>
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.1953 17.798L16.6682 16.27L22.9281 22.7664L21.4552 24.2944L15.1953 17.798Z"
            fill="#6C6C6C"
          />
          <path
            d="M10.4167 19.9655C15.019 19.9655 18.75 16.0935 18.75 11.3173C18.75 6.541 15.019 2.66907 10.4167 2.66907C5.81429 2.66907 2.08333 6.541 2.08333 11.3173C2.08333 16.0935 5.81429 19.9655 10.4167 19.9655Z"
            fill="#6C6C6C"
          />
          <path
            d="M16.901 19.6087L18.3734 18.0801L22.9026 22.7804L21.4297 24.309L16.901 19.6087Z"
            fill="#292929"
          />
          <path
            d="M10.4167 18.3439C14.1561 18.3439 17.1875 15.198 17.1875 11.3172C17.1875 7.43653 14.1561 4.29059 10.4167 4.29059C6.67724 4.29059 3.64583 7.43653 3.64583 11.3172C3.64583 15.198 6.67724 18.3439 10.4167 18.3439Z"
            fill="#D9EEFF"
          />
          <path
            d="M14.0104 8.18228C13.125 7.10125 11.8229 6.45264 10.4167 6.45264C9.01042 6.45264 7.70833 7.10125 6.82292 8.18228C6.61458 8.39848 6.66667 8.77684 6.875 8.93899C7.08333 9.1552 7.44792 9.10115 7.60417 8.88494C8.33333 8.02012 9.32292 7.53366 10.4167 7.53366C11.5104 7.53366 12.5 8.02012 13.2292 8.88494C13.3333 8.99304 13.4896 9.10115 13.6458 9.10115C13.75 9.10115 13.9063 9.0471 13.9583 8.99304C14.1667 8.77684 14.1667 8.39848 14.0104 8.18228Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
}

export default SearchWindow;
