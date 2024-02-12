import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/main.module.css";

function Recipe() {
  return (
    <Link to="/" className={styles.recipe}>
      <img src="" />
      <div>
        <div className={styles.recipe_title}>
          <h2>존맛탱 계란찜 레시피</h2>
          {/* <svg
            width="23"
            height="23"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.74435 1.96973C6.81404 1.82858 6.92183 1.70974 7.05552 1.62664C7.18922 1.54355 7.3435 1.49951 7.50091 1.49951C7.65833 1.49951 7.81261 1.54355 7.9463 1.62664C8.08 1.70974 8.18779 1.82858 8.25748 1.96973L9.68341 4.8591L12.8719 5.32317C13.0277 5.34565 13.1742 5.4113 13.2947 5.51271C13.4152 5.61411 13.5049 5.74721 13.5537 5.89695C13.6024 6.04669 13.6083 6.2071 13.5707 6.36001C13.533 6.51293 13.4533 6.65226 13.3406 6.76223L11.0325 9.01129L11.5772 12.1866C11.6038 12.3418 11.5866 12.5014 11.5273 12.6473C11.468 12.7932 11.369 12.9196 11.2416 13.0121C11.1142 13.1047 10.9634 13.1598 10.8064 13.1711C10.6493 13.1825 10.4922 13.1496 10.3528 13.0763L7.50091 11.5763L4.64904 13.0763C4.50966 13.1496 4.35255 13.1825 4.19547 13.1711C4.03839 13.1598 3.88763 13.1047 3.76022 13.0121C3.63282 12.9196 3.53387 12.7932 3.47457 12.6473C3.41527 12.5014 3.39798 12.3418 3.42466 12.1866L3.96841 9.01129L1.66216 6.76129C1.54973 6.65134 1.47026 6.51216 1.43272 6.35945C1.39518 6.20674 1.40106 6.04657 1.44971 5.89703C1.49836 5.74749 1.58783 5.61451 1.70803 5.51311C1.82823 5.41171 1.97437 5.34592 2.12998 5.32317L5.31748 4.8591L6.74435 1.96973Z"
              fill="#FFD600"
            />
          </svg> */}
          {/* 
          <svg
            width="23"
            height="23"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.74435 1.96973C6.81404 1.82858 6.92183 1.70974 7.05552 1.62664C7.18922 1.54355 7.3435 1.49951 7.50091 1.49951C7.65833 1.49951 7.81261 1.54355 7.9463 1.62664C8.08 1.70974 8.18779 1.82858 8.25748 1.96973L9.68341 4.8591L12.8719 5.32317C13.0277 5.34565 13.1742 5.4113 13.2947 5.51271C13.4152 5.61411 13.5049 5.74721 13.5537 5.89695C13.6024 6.04669 13.6083 6.2071 13.5707 6.36001C13.533 6.51293 13.4533 6.65226 13.3406 6.76223L11.0325 9.01129L11.5772 12.1866C11.6038 12.3418 11.5866 12.5014 11.5273 12.6473C11.468 12.7932 11.369 12.9196 11.2416 13.0121C11.1142 13.1047 10.9634 13.1598 10.8064 13.1711C10.6493 13.1825 10.4922 13.1496 10.3528 13.0763L7.50091 11.5763L4.64904 13.0763C4.50966 13.1496 4.35255 13.1825 4.19547 13.1711C4.03839 13.1598 3.88763 13.1047 3.76022 13.0121C3.63282 12.9196 3.53387 12.7932 3.47457 12.6473C3.41527 12.5014 3.39798 12.3418 3.42466 12.1866L3.96841 9.01129L1.66216 6.76129C1.54973 6.65134 1.47026 6.51216 1.43272 6.35945C1.39518 6.20674 1.40106 6.04657 1.44971 5.89703C1.49836 5.74749 1.58783 5.61451 1.70803 5.51311C1.82823 5.41171 1.97437 5.34592 2.12998 5.32317L5.31748 4.8591L6.74435 1.96973Z"
              fill="#D9D9D9"
              stroke="#B0B0B0"
            />
          </svg> */}
        </div>

        {/** 조건문 필요 */}
        {/* <p className={styles.pink_descript}>바로 만들 수 있어요!</p> */}
        {/** else 조건문 필요 */}
        <p className={styles.lack_descript}>
          부족한 재료 <span>1</span>개
        </p>
        <div className={styles.lack_materials}>
          <div>양파</div>
          <div>양파</div>
          <div>양파</div>
        </div>
      </div>
    </Link>
  );
}

export default Recipe;
