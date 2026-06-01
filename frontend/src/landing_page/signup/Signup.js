import React from "react";

function Signup() {
	const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";
	const dashboardLoginUrl = `${dashboardUrl.replace(/\/$/, "")}/login`;

	const redirectToDashboard = () => {
		window.location.assign(dashboardLoginUrl);
	};

	return (
		<div className="container py-5">
			<div className="row align-items-center gy-4">
				<div className="col-md-6 text-center">
					<img
						src="media/images/signup.png"
						alt="Signup"
						style={{ width: "85%", maxWidth: "420px" }}
					/>
				</div>
				<div className="col-md-6">
					<h1 className="mb-3">Open a Zerodha account</h1>
					<p className="text-muted mb-4">
						Modern platforms and apps with direct mutual funds and stock investing.
					</p>
					<div className="d-flex gap-3 flex-wrap">
						<button
							type="button"
							className="btn btn-primary btn-lg px-4"
							onClick={redirectToDashboard}
						>
							Continue Signup
						</button>
						<button
							type="button"
							className="btn btn-outline-primary btn-lg px-4"
							onClick={redirectToDashboard}
						>
							Login
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup;
