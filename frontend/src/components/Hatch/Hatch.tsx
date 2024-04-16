import React from 'react';
import style from './Hatch.module.css';

type HatchProps = {
  num: number;
  imageUrl: string | null | undefined;
  isOpen: boolean;
  toggleHatch: (num: number) => void;
};

const Hatch: React.FC<HatchProps> = ({ num, imageUrl, isOpen, toggleHatch }) => {
  return (
    <button className={`${style.hatch} ${isOpen ? style.open : ''}`} onClick={() => toggleHatch(num)}>
      <div className={style.cover}>{num}</div>
      <div className={style.content} style={{ backgroundImage: `url(${imageUrl})` }}></div>
    </button>
  );
};

export default Hatch;
