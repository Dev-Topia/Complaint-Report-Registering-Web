import { useState } from "react";
import "../../index.css";

function Stepper() {
	const steps = ["Posted", "Review", "Fixing", "Finished"];
	const [currentStep, setCurrentStep] = useState(1);
	const [complete, setComplete] = useState(false);
	return (
		<>
			<div className="flex justify-between">
				{steps?.map((step, i) => (
					<div
						key={i}
						className={`step-item ${currentStep === i + 1 && "active"} ${
							(i + 1 < currentStep || complete) && "complete"
						}`}
					>
						<div className="step">{i + 1}</div>
						<p>{step}</p>
					</div>
				))}
			</div>
			<button
				className="btn"
				onClick={() => {
					currentStep === steps.length
						? setComplete(true)
						: setCurrentStep((prev) => prev + 1);
				}}
			>
				Next
			</button>
		</>
	);
}

export default Stepper;
