import React from 'react';
import  './button.scss';

const Button = ({ text, onClick, variant, fontSize, padding,borderRadius, width, height , ...props }) => {
  const className = `buttonStyle ${variant === 'primaryBtn' ? 'addBtn' : 'remBtn'}`;
  const style = {
    fontSize: fontSize,
    borderRadius: borderRadius? borderRadius : '5px',
    width: width? width: 'auto',
    height: height ? height: 'auto'
  };

  return (
    <button className={className} onClick={onClick} style={style} {...props}>
      {text}
    </button>
  );
};

export default Button;