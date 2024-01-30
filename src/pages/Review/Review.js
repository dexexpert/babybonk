import s from './Review.module.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Review() {
	const [showCount, setShowCount] = useState(1);
	const navigate = useNavigate();
	useEffect(() => {
		const mainDiv = document.getElementById('root');
		mainDiv.style.transition = 'none';
		mainDiv.style.opacity = '1';
		const loadingDiv = document.getElementById('loading');
		loadingDiv.style.zIndex = '-1';
		loadingDiv.style.opacity = '0';
		const handleReviewOpen = () => {
			setTimeout(() => {
				setShowCount(2);
			}, 1000);
			setTimeout(() => {
				setShowCount(3);
			}, 2000);
			setTimeout(() => {
				setShowCount(4);
			}, 3000);
			setTimeout(() => {
				setShowCount(5);
			}, 4000);
		};
		handleReviewOpen();
	}, []);

	const handleReviewClose = () => {
		const reviewDiv = document.getElementById('review');
		reviewDiv.style.display = 'none';
		const mainDiv = document.getElementById('root');
		mainDiv.style.height = '100vh';
		mainDiv.style.width = '100vw';
		mainDiv.style.transition = 'all 1s';
		mainDiv.style.opacity = '0';
		const loadingDiv = document.getElementById('loading');
		setTimeout(() => {
			loadingDiv.style.zIndex = '11';
			loadingDiv.style.opacity = '1';

			loadingDiv.play();
		}, 1000);
		loadingDiv.addEventListener('ended', function () {
			setTimeout(() => {
				loadingDiv.style.zIndex = '-1';
				loadingDiv.style.opacity = '0';
				loadingDiv.pause();
			}, 1000);
			navigate('/');
		});
	};
	return (
		<div className={s.root} id="review">
			<div className="bg-[#161616] rounded-[4px] m-[32px] flex flex-col relative max-h-[calc(100%_-_64px] max-w-full w-[85vw] px-[20px] md:px-[40px] py-[20px]">
				<div className="grid grid-cols-8 sm:grid-cols-9 md:grid-cols-10 justify-center gap-x-0 gap-y-4 md:gap-y-6 lg:gap-y-10 mx-auto mt-8">
					{showCount > 0 ? (
						<img
							src="/assets/images/tank.png"
							alt="tank1"
							className={`flex flex-col items-center col-span-4 sm:col-span-3 md:col-span-2 fadeIn `}
						/>
					) : (
						<img
							src="/assets/images/tank.png"
							alt="tank1"
							className={`flex flex-col items-center col-span-4 sm:col-span-3 md:col-span-2 fadeIn `}
						/>
					)}
					{showCount > 1 && (
						<img
							src="/assets/images/tank.png"
							alt="tank1"
							className={`flex flex-col items-center col-span-4 sm:col-span-3 md:col-span-2 fadeIn `}
						/>
					)}
					{showCount > 2 && (
						<img
							src="/assets/images/tank.png"
							alt="tank1"
							className={`flex flex-col items-center col-span-4 sm:col-span-3 md:col-span-2 fadeIn `}
						/>
					)}
					<div
						className={`flex-col items-center hidden sm:flex sm:col-span-1 md:hidden fadeIn`}
					></div>
					{showCount > 3 && (
						<img
							src="/assets/images/tank.png"
							alt="tank1"
							className={`flex flex-col items-center col-span-4 sm:col-span-3 md:col-span-2 fadeIn `}
						/>
					)}
					<div
						className={`flex flex-col items-center col-span-2 sm:col-span-1 md:hidden fadeIn`}
					></div>
					{showCount > 4 && (
						<img
							src="/assets/images/tank.png"
							alt="tank1"
							className={`flex flex-col items-center col-span-4 sm:col-span-3 md:col-span-2 fadeIn `}
						/>
					)}
				</div>
				<div className="flex items-center justify-center w-full mt-20 pb-[40px] lg:pb-[20px]">
					<div
						className={
							'text-[16px] md:text-[24px] font-normal text-white px-[32px] py-[16px] bg-[#ffffff0f] hover:bg-[#FF6200] cursor-pointer font-genotics'
						}
						onClick={handleReviewClose}
					>
						BACK TO SHOP
					</div>
				</div>
			</div>
		</div>
	);
}

export default Review;
