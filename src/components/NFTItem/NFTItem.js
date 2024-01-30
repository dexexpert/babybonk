import { useState } from 'react';
import s from './NFTItem.module.css';
import { SvgBNB } from 'assets/svg';

const NFTItem = ({ image, title, color, babybonk, bnb, onClick }) => {
	const [isHover, setIsHover] = useState(false);
	return (
		<div
			className={s.root}
			onMouseOver={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			onClick={onClick}
		>
			<div
				className={`absolute top-[70px] sm:top-[80px] md:top-[30px] lg:top-[50px] ${
					isHover
						? 'right-[40px] sm:right-[25px] md:right-[15px] lg:right-[35px]'
						: 'right-[50px] sm:right-[50px] md:right-[20px] lg:right-[40px]'
				} font-genotics text-[40px] sm:text-[32px] md:text-[32px] z-10`}
				style={{ transition: 'all 0.2s', color: color }}
			>
				{title}
			</div>
			<img
				src={`/assets/images/${image}.png`}
				alt={image}
				className=" hover:scale-[1.1] z-0"
				style={{ transition: 'all 0.3s' }}
			/>
			<div className="flex items-center justify-between mt-4">
				<div className="flex items-center justify-between gap-1">
					<img
						src="/assets/images/babybonk.png"
						className="w-[24px] h-[24px] sm:w-[24px] sm:h-[24px] md:w-[26px] md:h-[26px]"
						alt="babybonk"
					/>
					<div className="disc font-impact text-[16px] sm:text-[14px] md:text-[12px] lg:text-[16px]">
						{babybonk} BABYBONK
					</div>
				</div>
				<div className="flex items-center justify-between gap-1">
					<SvgBNB className="w-[24px] h-[24px] sm:w-[24px] sm:h-[24px] md:w-[26px] md:h-[26px]" />
					<div className="font-impact text-[16px] sm:text-[14px] md:text-[12px] lg:text-[18px]">
						{bnb} BNB
					</div>
				</div>
			</div>
		</div>
	);
};

export default NFTItem;
