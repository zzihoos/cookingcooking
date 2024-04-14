import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Category from "../components/Category";
import Ingredient from "../components/Ingredient";
import styles from "../styles/Refrigerator.module.css";

const Refrigerator = () => {
  const baseURL = "http://localhost:8080";
  const userId = localStorage.getItem("id");
  const [responseList, setResponseList] = useState([]);
  const [selectCategory, setSelectCategory] = useState(0);
  const [ingredientList, setIngredientList] = useState({
    cold: [],
    outside: [],
    frozen: [],
  });

  const handleSelectCategory = index => {
    setSelectCategory(index);
  };

  useEffect(() => {
    const filtered = responseList.filter(
      ingredient =>
        selectCategory === 0 || ingredient.categoryId === selectCategory,
    );

    const coldIngredients = [];
    const outsideIngredients = [];
    const frozenIngredients = [];

    filtered.forEach(f => {
      if (f.storagePlace === "COLD") {
        coldIngredients.push(f);
      } else if (f.storagePlace === "OUTSIDE") {
        outsideIngredients.push(f);
      } else if (f.storagePlace === "FROZEN") {
        frozenIngredients.push(f);
      }
    });

    setIngredientList({
      cold: coldIngredients,
      outside: outsideIngredients,
      frozen: frozenIngredients,
    });
  }, [selectCategory, responseList]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token_nickname")) {
      navigate("/home");
      return;
    }
    axios.get(`${baseURL}/fridges/${userId}/ingredients`).then(response => {
      setResponseList(response.data);
    });
  }, []);
  const items = [
    "전체",
    "과일",
    "채소",
    "육류",
    "해산물",
    "유제품",
    "음료/주류",
    "조미료/향신료",
    "견과류/곡류",
    "디저트",
    "요리",
    "기타",
  ];

  return (
    <div>
      <div id="wrapper" className={styles.wrapper}>
        <div className={styles.category}>
          <Category items={items} onClick={handleSelectCategory} />
        </div>

        <div className={styles.line} style={{ margin: "10px auto 40px" }}>
          <p>실온</p>
          <hr />
        </div>
        <div className={styles.ingredient_box}>
          {ingredientList.outside.map((ingredient, index) => (
            <div key={index}>
              <Ingredient name={ingredient.name} dday={ingredient.dday} />
            </div>
          ))}
        </div>

        <div className={styles.line}>
          <p>냉장고</p>
          <hr />
        </div>
        <div className={styles.ingredient_box}>
          {ingredientList.cold.map((ingredient, index) => (
            <div key={index}>
              <Ingredient name={ingredient.name} dday={ingredient.dday} />
            </div>
          ))}
          {ingredientList.frozen.map((ingredient, index) => (
            <div key={index}>
              <Ingredient
                name={ingredient.name}
                dday={ingredient.dday}
                isFrozen={true}
              />
            </div>
          ))}
        </div>
        <Link to="/refrigerator_add" className={styles.ingredient_add_button}>
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7458 9.46042C15.8332 12.8666 16.4769 16.2676 17.0368 19.6194C17.3004 21.197 17.5447 22.7697 17.7469 24.3563C17.8899 25.479 17.8897 24.3736 17.8909 23.9492C17.9027 19.4906 17.8563 15.0311 17.8909 10.5726C17.9167 7.2393 18.0657 17.241 17.9604 20.5728C17.9414 21.172 17.8719 22.9692 17.8958 22.3702C17.9545 20.9038 18.009 19.4372 18.0696 17.9709C18.1532 15.9484 18.2986 13.9347 18.6754 11.9431C18.7242 11.6851 18.6373 11.3107 18.8641 11.1784C18.9012 11.1567 18.9079 11.2549 18.9137 11.2976C18.9653 11.6795 19.0075 12.843 19.013 13.0553C19.0946 16.1775 18.8264 25.5404 18.6952 22.4198C18.6289 20.8409 18.4292 19.2722 18.3526 17.6929C18.2284 15.1309 18.2484 12.5657 18.2484 10.0016C18.2484 9.68055 18.2484 9.35946 18.2484 9.03837C18.2484 8.94346 18.2394 8.49575 18.2881 9.00362C18.4573 10.7701 18.4581 12.5644 18.4072 14.3363C18.3532 16.2208 18.0582 18.0706 17.9306 19.9471C17.928 19.9847 17.802 21.4575 17.9802 21.4218C18.0447 21.4089 18.0505 21.3671 18.0597 21.3027C18.1251 20.8449 18.0902 20.3092 18.1093 19.8577C18.2083 17.527 18.3437 15.1987 18.5066 12.8716C18.6054 11.4593 18.6538 10.0335 18.4569 8.62625C18.3981 8.2059 18.3168 7.70873 18.1342 7.31542C18.0003 7.02715 18.1202 7.95225 18.1491 8.26875C18.523 12.3715 19.1364 16.4257 18.6754 20.5529C18.4375 22.6821 17.6809 24.6299 17.1957 26.6999C17.1398 26.9385 16.6623 28.0505 17.1063 28.0505C17.3349 28.0505 17.3359 28.0334 17.3645 27.7724C17.5355 26.2128 17.659 24.6351 17.6128 23.0653C17.5967 22.5178 17.6684 21.5846 17.2652 21.1289C16.5511 20.3216 15.2493 19.8274 14.3158 19.396C12.9061 18.7445 11.4576 18.3049 9.98611 17.8319C9.71675 17.7453 9.33251 17.6381 9.90666 17.7028C13.5762 18.1163 17.2163 18.333 20.9147 18.1199C21.9957 18.0576 23.0795 17.9695 24.1571 17.8617C24.2974 17.8477 23.8732 17.86 23.735 17.8319C20.6721 17.2089 17.6878 16.6976 14.5442 16.9729C14.3467 16.9902 12.9005 17.1439 13.9683 17.2361C15.4851 17.367 17.0374 17.3557 18.5562 17.2907C21.142 17.18 23.9242 17.127 26.461 16.5608C27.4164 16.3475 24.5103 16.3679 23.5314 16.3523C20.1596 16.2985 16.7683 16.3224 13.4022 16.531C11.6979 16.6366 9.98737 16.7898 8.30287 17.0772C8.17909 17.0983 7.46689 17.1561 7.33464 17.385C6.67122 18.5333 13.8654 19.0896 14.0775 19.103C16.0998 19.2307 18.159 19.2356 20.1799 19.0633C20.9755 18.9955 21.9348 18.9502 22.6873 18.6661C23.1723 18.483 21.5652 17.4744 21.2474 17.4347C21.161 17.4239 20.5362 17.4469 20.5523 17.4595C21.5504 18.2407 23.2403 18.4944 24.455 18.6462C24.9104 18.7031 26.6649 19.065 26.0141 17.9958C25.7253 17.5213 25.5433 17.5312 25.0012 17.7624C24.2312 18.0908 23.564 18.6175 22.9455 19.1725C22.9136 19.2012 22.3684 19.632 22.4192 19.7336C22.545 19.9851 23.4728 19.828 23.7003 19.828"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M18 0.125C8.14383 0.125 0.125 8.14383 0.125 18C0.125 27.8562 8.14383 35.875 18 35.875C27.8562 35.875 35.875 27.8562 35.875 18C35.875 8.14383 27.8562 0.125 18 0.125ZM24.875 19.375H19.375V24.875C19.375 25.2397 19.2301 25.5894 18.9723 25.8473C18.7144 26.1051 18.3647 26.25 18 26.25C17.6353 26.25 17.2856 26.1051 17.0277 25.8473C16.7699 25.5894 16.625 25.2397 16.625 24.875V19.375H11.125C10.7603 19.375 10.4106 19.2301 10.1527 18.9723C9.89487 18.7144 9.75 18.3647 9.75 18C9.75 17.6353 9.89487 17.2856 10.1527 17.0277C10.4106 16.7699 10.7603 16.625 11.125 16.625H16.625V11.125C16.625 10.7603 16.7699 10.4106 17.0277 10.1527C17.2856 9.89487 17.6353 9.75 18 9.75C18.3647 9.75 18.7144 9.89487 18.9723 10.1527C19.2301 10.4106 19.375 10.7603 19.375 11.125V16.625H24.875C25.2397 16.625 25.5894 16.7699 25.8473 17.0277C26.1051 17.2856 26.25 17.6353 26.25 18C26.25 18.3647 26.1051 18.7144 25.8473 18.9723C25.5894 19.2301 25.2397 19.375 24.875 19.375Z"
              fill="var(--grey80)"
            />
          </svg>

          <p>재료등록</p>
        </Link>
      </div>
      <Navigation />
    </div>
  );
};

export default Refrigerator;
