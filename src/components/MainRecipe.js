import React from "react";
import styles from "../styles/Main.module.css";

function MainRecipe({ recipe }) {
  return (
    <>
      <img src={recipe.imageUrl} alt={recipe.title} />
      <div>
        <div className={styles.recipe_title}>
          <h2>{recipe.title}</h2>
        </div>
        {recipe.insufficientIngredientsCount ? (
          <div>
            <p className={styles.lack_descript}>
              부족한 재료 <span>{recipe.insufficientIngredientsCount}</span>개
            </p>
            <div className={styles.lack_ingredients}>
              {recipe.insufficientIngredients.map((ingredient, i) => (
                <div key={i}>{ingredient.name}</div>
              ))}
            </div>
          </div>
        ) : (
          <p className={styles.success_message}>지금 만들 수 있어요!</p>
        )}
      </div>
    </>
  );
}

export default MainRecipe;
