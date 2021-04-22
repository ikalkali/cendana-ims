import React from "react";
import "./Card.css";

const Card = (props) => {
  return (
    <React.Fragment>
      <div className={`card ${props.className}`}>
        {props.header && (
          <header
            className={`card-header ${props.status} ${props.classHeader}`}
          >
            <h2>{props.header}</h2>
            <h2 className="card-header__detail">{props.headerFlex}</h2>
          </header>
        )}
        <div className="card-content">{props.children}</div>
        {props.footerStrip && (
          <footer className="card-footer">{props.footer}</footer>
        )}
      </div>
    </React.Fragment>
  );
};

export default Card;
