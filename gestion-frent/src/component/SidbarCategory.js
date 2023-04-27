import React from 'react'
export default function SidbarCategory() {
  return (
    <div className="select-menu">
      <div className="select-btn">
        <span className="sBtn-text">select your option</span>
        <i class="fa-solid fa-bars"></i>
      </div>
      <ul className="options">
        <li className="option">
          <i class="fa-solid fa-bars"></i>
          <span className='option-text'>home</span>
        </li>
      </ul>
    </div>
  );

}
