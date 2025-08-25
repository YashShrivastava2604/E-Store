import React, { Suspense, useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";

const SplineRobot = ({ pageState = "none" }) => {
	// States to hold all our key 3D objects
	const [robot, setRobot] = useState(null);
	const [heroMessage, setHeroMessage] = useState(null);
	const [loginMessage, setLoginMessage] = useState(null);
	const [signupMessage, setSignupMessage] = useState(null);

	// When the scene loads, find all the objects we need and store them
	const onSplineLoad = (splineApp) => {
		const robotObject = splineApp.findObjectByName("Robot");
		if (robotObject) {
			// Immediately force its rotation to be straight on load
			robotObject.rotation.y = 0;
			setRobot(robotObject);
		} else {
			console.error("Could not find 'Robot' object in Spline scene.");
		}
		
		setHeroMessage(splineApp.findObjectByName("HeroMessage"));
		setLoginMessage(splineApp.findObjectByName("LoginPageMessage"));
		setSignupMessage(splineApp.findObjectByName("SignUpPageMessage"));
	};

	// Logic to control message visibility based on the pageState prop
	useEffect(() => {
		if (heroMessage && loginMessage && signupMessage) {
			heroMessage.visible = pageState === "hero";
			loginMessage.visible = pageState === "login";
			signupMessage.visible = pageState === "signup";
		}
	}, [pageState, heroMessage, loginMessage, signupMessage]);


	// Mouse-following logic for the robot's body
	useEffect(() => {
		if (robot) {
			const handleMouseMove = (event) => {
				const { clientX } = event;
				const sensitivity = 0.8;
				robot.rotation.y = ((clientX / window.innerWidth - 0.5) * sensitivity);
			};

			window.addEventListener("mousemove", handleMouseMove);
			return () => window.removeEventListener("mousemove", handleMouseMove);
		}
	}, [robot]);

	return (
		<div className='absolute inset-0 z-0'>
			<Suspense fallback={<div className='w-full h-full bg-gray-100' />}>
				<Spline
					// PASTE YOUR MOST RECENT .splinecode LINK HERE
					scene='https://prod.spline.design/Tr-ubidncoLpUH05/scene.splinecode'
					onLoad={onSplineLoad}
				/>
			</Suspense>
		</div>
	);
};

export default SplineRobot;