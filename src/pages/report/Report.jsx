// import Stepper from "../../ui/shared/Stepper";
import { useState } from "react";

function Stepper() {
	const steps = ["Posted", "Review", "Fixing", "Finished"];
	const [currentStep, setCurrentStep] = useState(1);
	// const [complete, setComplete] = useState(false);
	return (
		<>
			<div className="flex justify-between items-center">
				{steps.map((step, i) => (
					<div key={i} className="flex flex-col items-center ">
						<div
							className={`w-10 h-10 flex items-center justify-center z-10 relative bg-${
								i === currentStep ? "green-400" : "[#D9D9D9]"
							} rounded-full font-semibold text-white`}
						>
							{i + 1}
						</div>
						{i < steps.length - 1 && (
							<div
								className={`w-2 h-6 bg-${
									i < currentStep - 1 ? "green-400" : "[#D9D9D9]"
								} ${
									i === currentStep - 1 ? "border-b-2 border-green-400" : ""
								}`}
							></div>
						)}
						<p>{step}</p>
					</div>
				))}
			</div>
		</>
	);
}

function Report() {
	return (
		<div className="max-w-5xl bg-white mx-auto p-6">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<div className="bg-[#D9D9D9] w-11 h-11 rounded-full"></div>
					<p>Sou Sodara</p>
				</div>
				<p>Feb 10, 2024 - 12:00 AM</p>
			</div>
			<div className="flex flex-col gap-6">
				<h1 className="text-2xl font-bold mt-6">Title</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in
					dolor est. Nullam egestas enim odio, sed fermentum magna ultrices ut.
					In luctus, nibh nec hendrerit ultricies, risus nulla consequat purus,
					et fermentum ex eros vel ligula. Aenean dignissim semper commodo. In
					sed odio massa. Etiam rutrum, sapien quis porta pharetra, turpis magna
					viverra lacus, at viverra magna lacus nec purus. Etiam iaculis non
					justo id suscipit. Morbi mollis dolor eget mattis imperdiet.
					Suspendisse scelerisque in lectus vel mollis. Interdum et malesuada
					fames ac ante ipsum primis in faucibus. Praesent lacus sapien,
					ultrices varius leo nec, gravida vulputate quam. Nunc nec risus vel
					ligula rutrum ultrices ut vehicula felis. Mauris ut neque ligula.
					Praesent rutrum volutpat lobortis.
				</p>
			</div>
			<div className="bg-[#9D9D9D] w-full h-[300px] my-6"></div>
			<div>
				<h1 className="text-2xl font-bold">Status</h1>
				<div className="w-1/2 flex item-center">
					<Stepper />
				</div>
			</div>
		</div>
	);
}

export default Report;
