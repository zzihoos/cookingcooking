/** 일치하는 아이디가 있는지, 비밀번호가 맞는지 알려주는 텍스트 작성할 것 */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/LoginJoin.module.css";
import "../App.css";

const Login = () => {
  const baseURL = "http://localhost:8080";
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validEmpty, setValidEmpty] = useState("");
  const [validMatch, setValidMatch] = useState("");

  const handleSubmitClick = e => {
    e.preventDefault();
    // input이 비어있는지 확인
    if (userName.trim() === "") {
      setValidEmpty("아이디");
      return;
    } else if (password.trim() === "") {
      setValidEmpty("비밀번호");
      return;
    } else {
      setValidEmpty("");
    }

    axios
      .post(baseURL + "/auth/signin", {
        name: userName,
        password: password,
      })
      .then(response => {
        // 아이디, 비밀번호 Match Check
        if (!response.data.success) {
          setValidMatch(response.message);
          return;
        }

        localStorage.clear();
        localStorage.clear();
        localStorage.setItem("id", response.data.userId);
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        // expirationTime
        navigate("/");
      });
  };

  useEffect(() => {
    setValidEmpty("");
    setValidMatch("");
  }, [userName, password]);

  return (
    <form className={styles.home}>
      <img src="../../images/logo.jpg" alt="logo" className={styles.logo}></img>
      <div className={styles.input_container}>
        <input
          name="userName"
          value={userName}
          onChange={e => setUsername(e.target.value)}
        ></input>
        <p className={userName ? ` ${styles.active}` : ""}>아이디</p>
      </div>

      {userName && (
        <div className={styles.input_container}>
          <input
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></input>
          <p className={password ? ` ${styles.active}` : ""}>비밀번호</p>
        </div>
      )}
      {validEmpty !== "" ? (
        <p className={styles.inconsistency}>{validEmpty}를 입력하세요</p>
      ) : (
        ""
      )}
      {validMatch !== "" ? (
        <p className={styles.inconsistency}>{validMatch}</p>
      ) : (
        ""
      )}
      <input
        type="submit"
        value="로그인"
        className={`button pink_back`}
        onClick={handleSubmitClick}
      ></input>
      <Link to="../join" className={styles.join_button}>
        회원가입
      </Link>
    </form>
  );
};

export default Login;
