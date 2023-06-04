import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import styles from "./Card.module.css";
import { useEffect } from 'react';
import React from 'react';

export default function Card(props) {
  return (
    <div className={styles.card}>
      <NavLink to={`/detail/${props.id}`}>
        <h3 className={styles.name}>
          {props.name}
        </h3>
      </NavLink>
      <img src={props.image} alt="Receta" />
      {props.diets && props.diets.length > 0 && (
        <div className={styles.info}>
          <div className={styles.type}>
            {props.diets.map((ele, index) => (
              <span className={styles.diet} key={`${ele}-${index}`}>{ele}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
