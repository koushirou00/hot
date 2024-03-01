import React from 'react';

type CategoryProps = {
  category?: string | null;
};

export const Category: React.FC<CategoryProps> = ({ category }) => {
  let classNameText = 'text-xs w-fit rounded-lg text-canter p-1 '; //連結のため半角スペース
  switch (category) {
    case 'スケジュール':
      classNameText += 'bg-[#326ED1] text-white';
      break;
    case '交通情報':
      classNameText += 'bg-gray-900 text-white';
      break;
    case '天気':
      classNameText += 'bg-[#FFD803]';
      break;
    case '会場':
      classNameText += 'bg-[#00a48d] text-white';
      break;
    case '販売':
      classNameText += 'bg-[#EF454A]';
      break;
    default:
      break;
  }

  return <p className={classNameText}>{category}</p>;
};
