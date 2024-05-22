import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Main.module.css";
import Ingredient from "../components/Ingredient";
import Navigation from "../components/Navigation";
import MainRecipe from "../components/MainRecipe";
import AxiosAuth from "../components/AxiosAuth";
import AxiosCommon from "../components/AxiosCommon";

const Main = () => {
  const [authUser, setAuthUser] = useState(false);
  const [lackIngredients, setLackIngredients] = useState([]);
  const [recommendRecipes, setRecommendRecipes] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
    console.log(token);
    const fetchUserData = async () => {
      if (token) {
        try {
          await fetchUserInfo();
          await GetRecommendRecipe();
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      } else {
        await GetGuestRecommendRecipe();
      }
    };
    fetchUserData();
  }, [token]);

  const fetchUserInfo = async () => {
    // 로그인 사용자의 재료 정보 가져오기
    const response = await AxiosAuth.get(`/fridges/ingredients`);
    // 재료 정보를 받은 후에 부족한 재료를 업데이트
    const lackIngredients = response.data.filter(
      ingredient => ingredient.dday <= 3,
    );
    setLackIngredients(lackIngredients);
    setAuthUser(true);
  };

  const GetRecommendRecipe = async () => {
    const response = await AxiosAuth.get(`/recipes/recommendations`);
    setRecommendRecipes(response.data);
  };

  const GetGuestRecommendRecipe = async () => {
    const response = await AxiosCommon.get(`/recipes/recommendations/guest`);
    setRecommendRecipes(response.data);
  };

  return (
    <div>
      <div id="wrapper">
        <header></header>
        {/* 메인 이미지 */}
        <div className={styles.main_image}>
          <img src="/images/mainpage_food_image.jpg" />
          <div className={styles.main_phrase}>
            <h1>요리조리</h1>
            <p>냉장고 관리를 간편하게 해보세요!</p>
          </div>
        </div>
        <div className={styles.container}>
          {/* 소비기한 임박 재료 리스트 */}
          {lackIngredients.length > 0 && (
            <div className={styles.close_to_expiration}>
              <h1>
                <span>소비기한이 임박한 재료</span>가 있어요!
              </h1>
              <div className={styles.ingredient_box}>
                {lackIngredients.map((ingredient, index) => (
                  <div key={index}>
                    <Ingredient
                      name={ingredient.name}
                      dday={ingredient.dday}
                      src={ingredient.imageUrl}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* 메인 버튼 3개 */}
          <div
            className={styles.main_buttons}
            style={{
              marginTop: lackIngredients.length <= 0 ? "20px" : "5px",
            }}
          >
            <div className={styles.button_box1}>
              <Link to="/refrigerator" className={styles.main_button}>
                <svg
                  width="35"
                  height="35"
                  viewBox="0 0 28 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.1601 29.452C12.5329 29.452 15.2732 26.5136 15.2732 22.8976C15.2732 20.9893 14.5357 19.319 13.142 17.9636C12.8842 17.7118 12.8257 17.5742 12.8257 17.1976L12.8372 13.4808L16.4329 11.2083L16.398 15.5529L14.4182 16.7829C14.0904 16.9838 13.95 17.3352 14.1259 17.6872C14.3013 18.0011 14.6646 18.0638 14.9689 17.8881L16.386 17.009L16.3745 18.9429C16.3745 19.3693 16.6083 19.6961 17.0066 19.6961C17.4048 19.6961 17.6511 19.357 17.6511 18.9424L17.6272 17.0213L19.0328 17.8881C19.3376 18.0761 19.7003 18.0006 19.8642 17.6872C20.0516 17.3352 19.9112 16.9961 19.5829 16.7829L17.6157 15.5524L17.5922 11.2077L21.0585 13.3929V15.8411C21.0585 16.2306 21.2813 16.5322 21.6441 16.5445C21.9839 16.5445 22.2182 16.2306 22.2182 15.8792L22.2297 14.1338L23.7987 15.1131C24.1505 15.3392 24.5482 15.2765 24.7481 14.9245C24.947 14.5602 24.7946 14.1585 24.4433 13.9452L22.8388 12.9788L24.2559 12.0997C24.5607 11.9111 24.6776 11.5345 24.5137 11.2211C24.3379 10.8815 23.9746 10.8193 23.6468 11.0326L21.6561 12.2502L18.1778 10.1288L21.6911 7.99399L23.6818 9.22452C23.9981 9.41256 24.3493 9.36274 24.5487 9.02363C24.7126 8.7097 24.5837 8.33256 24.2909 8.15738L22.8738 7.26542L24.4548 6.31185C24.818 6.09756 24.947 5.70863 24.7476 5.33203C24.5602 4.9806 24.162 4.90506 23.8462 5.10595L22.2532 6.11042V4.37792C22.2532 3.98845 22.0188 3.6997 21.6796 3.6997C21.3048 3.6997 21.0939 3.98899 21.0939 4.41542L21.0819 6.85131L17.5922 9.04881L17.6157 4.67899L19.5944 3.44899C19.9227 3.23524 20.0516 2.88381 19.8757 2.5447C19.7118 2.23077 19.3491 2.15524 19.0443 2.34381L17.6272 3.21006L17.6507 1.31417C17.6507 0.887203 17.4048 0.548096 17.0066 0.548096C16.6203 0.548096 16.3745 0.887203 16.3745 1.31417L16.386 3.2106L14.9804 2.34381C14.6646 2.15524 14.3128 2.23131 14.1374 2.5447C13.9615 2.88381 14.0904 3.23577 14.4182 3.44899L16.3975 4.67899L16.4324 9.04881L12.8492 6.77577V5.92238C12.8492 3.29792 11.3617 1.55256 9.1601 1.55256C6.94652 1.55256 5.45948 3.29792 5.45948 5.92238L5.47097 17.1976C5.47097 17.5742 5.41251 17.7118 5.16617 17.9636C3.76107 19.319 3.03503 20.9893 3.03503 22.8976C3.03503 26.5136 5.76378 29.452 9.1601 29.452ZM9.1601 27.6311C6.72417 27.6311 4.74494 25.4968 4.74494 22.8976C4.74494 21.3279 5.43599 19.9093 6.6772 19.0179C7.04046 18.7543 7.18087 18.516 7.18087 18.0011V5.99738C7.18087 4.35274 7.98885 3.29792 9.1596 3.29792C10.3194 3.29792 11.1158 4.35274 11.1158 5.99792V18.0011C11.1158 18.5154 11.2563 18.7543 11.6195 19.0179C12.8607 19.9093 13.5518 21.3285 13.5518 22.8976C13.5518 25.4968 11.5845 27.6311 9.1596 27.6311M15.8468 10.1283L12.8367 11.9363V8.30792L15.8468 10.1283ZM9.14811 25.9361C9.52136 25.9365 9.891 25.8577 10.2358 25.7044C10.5805 25.551 10.8936 25.3261 11.157 25.0426C11.4204 24.7591 11.6289 24.4225 11.7705 24.0523C11.9122 23.682 11.9841 23.2854 11.9823 22.8852C11.9823 21.7051 11.3617 20.7381 10.4598 20.211C10.085 19.9972 9.95659 19.8467 9.95659 19.2311V16.7706C9.95659 16.1176 9.60532 15.7158 9.14861 15.7158C8.70339 15.7158 8.34013 16.1176 8.34013 16.7706V19.2311C8.34013 19.8467 8.21121 19.9972 7.83695 20.211C6.93503 20.7381 6.31443 21.7051 6.31443 22.8852C6.31258 23.2854 6.38453 23.6819 6.52614 24.0521C6.66774 24.4223 6.87621 24.7589 7.13955 25.0424C7.40289 25.3259 7.71591 25.5509 8.06062 25.7042C8.40532 25.8576 8.7749 25.9364 9.14811 25.9361Z"
                    fill="#54B1FF"
                  />
                </svg>
                <h1>나의 냉장고 관리</h1>
              </Link>
            </div>
            <div className={styles.button_box2}>
              <Link to="/recipelist" className={styles.main_button}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.87 6.6875V3.3125C4.87 3.08872 4.95889 2.87411 5.11712 2.71588C5.27536 2.55764 5.48997 2.46875 5.71375 2.46875C5.93752 2.46875 6.15213 2.55764 6.31037 2.71588C6.4686 2.87411 6.5575 3.08872 6.5575 3.3125V6.6875C6.5575 6.91127 6.4686 7.12589 6.31037 7.28412C6.15213 7.44235 5.93752 7.53125 5.71375 7.53125C5.48997 7.53125 5.27536 7.44235 5.11712 7.28412C4.95889 7.12589 4.87 6.91127 4.87 6.6875ZM15.5575 3.3125V16.25C15.5575 16.4738 15.4686 16.6884 15.3104 16.8466C15.1521 17.0049 14.9375 17.0937 14.7137 17.0937C14.49 17.0937 14.2754 17.0049 14.1171 16.8466C13.9589 16.6884 13.87 16.4738 13.87 16.25V13.1562H10.7762C10.5525 13.1562 10.3379 13.0674 10.1796 12.9091C10.0214 12.7509 9.9325 12.5363 9.9325 12.3125C9.95885 10.9428 10.1316 9.57993 10.4479 8.24703C11.1573 5.31078 12.5172 3.3357 14.3812 2.53906C14.5094 2.48408 14.6492 2.46174 14.7881 2.47403C14.927 2.48632 15.0608 2.53286 15.1773 2.60949C15.2938 2.68611 15.3896 2.79044 15.4559 2.91312C15.5223 3.0358 15.5572 3.17302 15.5575 3.3125ZM13.87 4.92406C12.9278 5.91406 12.3934 7.39062 12.096 8.61265C11.8735 9.55133 11.7272 10.5065 11.6587 11.4687H13.87V4.92406ZM9.08875 3.24218C9.0701 3.01841 8.96332 2.8112 8.7919 2.66616C8.62048 2.52111 8.39846 2.4501 8.17468 2.46875C7.95091 2.4874 7.7437 2.59417 7.59866 2.76559C7.45361 2.93701 7.3826 3.15903 7.40125 3.38281L7.6825 6.71984C7.6825 7.24199 7.47507 7.74274 7.10586 8.11196C6.73665 8.48117 6.23589 8.68859 5.71375 8.68859C5.1916 8.68859 4.69084 8.48117 4.32163 8.11196C3.95242 7.74274 3.745 7.24199 3.745 6.71984L4.02625 3.38281C4.03548 3.27201 4.0228 3.16047 3.98893 3.05457C3.95505 2.94867 3.90066 2.85047 3.82883 2.76559C3.75701 2.68072 3.66918 2.61081 3.57034 2.55988C3.47151 2.50895 3.36361 2.47798 3.25281 2.46875C3.142 2.45951 3.03047 2.47219 2.92457 2.50607C2.81866 2.53994 2.72047 2.59434 2.63559 2.66616C2.55071 2.73798 2.48081 2.82581 2.42988 2.92465C2.37895 3.02348 2.34798 3.13138 2.33875 3.24218L2.0575 6.61718V6.6875C2.05884 7.51008 2.33701 8.30828 2.8472 8.95354C3.35739 9.5988 4.0699 10.0536 4.87 10.2446V16.25C4.87 16.4738 4.95889 16.6884 5.11712 16.8466C5.27536 17.0049 5.48997 17.0937 5.71375 17.0937C5.93752 17.0937 6.15213 17.0049 6.31037 16.8466C6.4686 16.6884 6.5575 16.4738 6.5575 16.25V10.2446C7.35759 10.0536 8.07011 9.5988 8.58029 8.95354C9.09048 8.30828 9.36865 7.51008 9.37 6.6875V6.61718L9.08875 3.24218Z"
                    fill="#6C6C6C"
                  />
                </svg>
                <h1>레시피 리스트</h1>
              </Link>
              <Link to="/shoppingbasket" className={styles.main_button}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 4H6.5L9 16M9 16H17M9 16C8.46957 16 7.96086 16.2107 7.58579 16.5858C7.21071 16.9609 7 17.4696 7 18C7 18.5304 7.21071 19.0391 7.58579 19.4142C7.96086 19.7893 8.46957 20 9 20C9.53043 20 10.0391 19.7893 10.4142 19.4142C10.7893 19.0391 11 18.5304 11 18C11 17.4696 10.7893 16.9609 10.4142 16.5858C10.0391 16.2107 9.53043 16 9 16ZM17 16C16.4696 16 15.9609 16.2107 15.5858 16.5858C15.2107 16.9609 15 17.4696 15 18C15 18.5304 15.2107 19.0391 15.5858 19.4142C15.9609 19.7893 16.4696 20 17 20C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18C19 17.4696 18.7893 16.9609 18.4142 16.5858C18.0391 16.2107 17.5304 16 17 16ZM8.5 13H17.8L19 7H7.3"
                    stroke="#6C6C6C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h1>장바구니</h1>
              </Link>
            </div>
          </div>

          {/** 오늘의 추천 레시피 */}
          <div>
            <div className={styles.recipe_main_title}>
              <h1>오늘의 추천 레시피</h1>
              <Link to="/recipelist">더보기{">"}</Link>
            </div>
            <div className={styles.recipe_list}>
              {recommendRecipes.map((recipe, index) => (
                <Link
                  to={`/recipeinfo/${recipe.id}`}
                  className={styles.recipe}
                  key={index}
                >
                  <MainRecipe recipe={recipe} authUser={authUser} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Main;
