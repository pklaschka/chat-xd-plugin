import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useLogger from '../hooks/useLogger';
import Author from '../model/document/author';
import LocalSettings from '../model/local/local-settings';
import { Header } from './general-elements/header/header';
import Switch from './general-elements/switch';

const numberOfSteps = 4;

export function OnboardingPage() {
	const logger = useLogger('Onboarding screen');
	const [currentStep, setCurrentStep] = useState(0);
	const [state, setState] = useState({
		name: '',
		gravatarMail: '',
		gravatar: false,
		privacyPolicy: false
	});
	const history = useHistory();

	// Submission:
	useEffect(() => {
		logger.debug('changed current step', currentStep);
		if (currentStep > numberOfSteps) {
			// submit
			(async () => {
				if (!state.privacyPolicy)
					throw new Error('privacy policy is required, but not accepted');

				logger.info('Submitting', state);

				await LocalSettings.setAuthor(
					new Author({
						...state
					})
				);

				await LocalSettings.setGravatar(state.gravatar);

				history.push('/chat');
			})();
		}
	}, [currentStep]);

	const goToNextStep = useCallback(() => setCurrentStep(currentStep + 1), [
		currentStep
	]);

	return (
		<>
			<Header title={'Document Chat'} />

			<div className="padding-horiz">
				{/*Steps:*/}
				{currentStep === 0 && (
					<>
						<p>
							{' '}
							Welcome to Document Chat for Adobe XD: The privacy-first chatting
							solution for Adobe XD Cloud documents.
						</p>
						<p>
							<strong>Beta Version Note: </strong>
							Please note that this plugin is currently in a public beta stage.
							There are several known issues and some features of the "big
							release" aren't implemented, yet. I'd love to hear your feedback
							to help shape the plugin to optimally fit your needs.
						</p>
						<p>Before we begin, we have to ask some quick questions.</p>
					</>
				)}
				{currentStep === 1 && (
					<>
						<p>We'll start out simple: What's your name?</p>
						<p>This doesn't have to be you're real name.</p>
						<form onSubmit={goToNextStep}>
							<label>Name:</label>
							<input
								type="text"
								value={state.name}
								placeholder="Anonymous"
								autoFocus={true}
								onChange={(event) =>
									setState({ ...state, name: event.target.value })
								}
							/>
						</form>
					</>
				)}
				{currentStep === 2 && (
					<>
						<p>
							If you want, you can provide a Gravatar e-mail-address so your
							coworkers get to see a profile picture.
						</p>
						<p>
							This is completely optional, but can be used to show your profile
							picture to your coworkers.
						</p>
						<form onSubmit={goToNextStep}>
							<label>
								E-Mail-Address:
								<input
									type="text"
									value={state.gravatarMail}
									placeholder="(none)"
									autoFocus={true}
									onChange={(event) =>
										setState({ ...state, gravatarMail: event.target.value })
									}
								/>
							</label>
						</form>
					</>
				)}
				{currentStep === 3 && (
					<>
						<p>
							It is optional to show Gravatar avatars. While enhancing your
							experience, it also means sending data to WordPress. Do you want
							to see avatars under these circumstances?
						</p>
						<Switch
							onChange={(newVal) => setState({ ...state, gravatar: newVal })}
							value={state.gravatar}>
							Use Gravatar avatars
						</Switch>
					</>
				)}
				{currentStep === numberOfSteps && (
					<>
						<p>
							Last, but not least, the legal stuff. By using this plugin, you
							agree that you've read and do accept the privacy policy.
						</p>
						<p>
							<a href="https://xdplugins.pabloklaschka.de/privacy-policy">
								Privacy Policy
							</a>
						</p>
						<p>
							<strong>
								Your privacy is very important to us, which is why no data
								leaves the XD document unless you've opted in at a previous
								step.
							</strong>
						</p>
						<Switch
							onChange={(newVal) =>
								setState({ ...state, privacyPolicy: newVal })
							}
							value={state.privacyPolicy}>
							I have read and agree to the privacy policy.
						</Switch>
					</>
				)}
				{currentStep > numberOfSteps && (
					<>
						<p>Loading the plugin...</p>
					</>
				)}

				{currentStep <= numberOfSteps && (
					<div className="flex">
						{currentStep > 0 && (
							<button
								uxp-variant={'secondary'}
								onClick={() => setCurrentStep(currentStep - 1)}>
								Back
							</button>
						)}
						<div className="spacer">&nbsp;</div>
						<button
							uxp-variant={'cta'}
							onClick={goToNextStep}
							disabled={!(currentStep < numberOfSteps || state.privacyPolicy)}>
							{currentStep === 0 ? "Let's do it" : 'Continue'}
						</button>
					</div>
				)}
			</div>
		</>
	);
}
