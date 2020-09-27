import React, {useCallback, useEffect, useState} from "react";
import DocumentModel from "../model/document/document-model";
import {Header} from "./general-elements/header/header";
import iconRocket from '../assets/icons/Smock_Launch_18_N.svg';
import useLogger from "../hooks/useLogger";
import Switch from "./general-elements/switch";
import {useHistory, useLocation } from "react-router-dom";
import LocalSettings from "../model/local/local-settings";
import Author from "../model/document/author";

const numberOfSteps = 4;

export default function Onboarding({model}: { model: DocumentModel }) {
    const logger = useLogger('Onboarding screen');
    const [currentStep, setCurrentStep] = useState(0);
    const [state, setState] = useState({name: '', gravatarMail: '', gravatar: false, privacyPolicy: false});
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

                await LocalSettings.setAuthor(new Author({
                    ...state
                }));

                await LocalSettings.setGravatar(
                    state.gravatar
                );

                history.push('/chat');
            })()
        }
    }, [currentStep])

    const goToNextStep = useCallback(() => setCurrentStep(currentStep + 1), [currentStep]);

    return (
        <>
            <Header title={'Document Chat'}/>

            {/*Steps:*/}
            {currentStep === 0 && <>
                <p> Welcome to Document Chat for Adobe XD: The privacy-first chatting solution for Adobe XD Cloud
                    documents.</p>
                <p>Before we begin, we have to ask some quick questions.</p>
            </>}
            {currentStep === 1 && <>
                <p>We'll start out simple: What's your name?</p>
                <form onSubmit={goToNextStep}>
                    <label>
                        Name:<br/>
                        <input type="text" value={state.name} placeholder="Peter Pan" autoFocus={true}
                               onChange={event => setState({...state, name: event.target.value})}/>
                    </label>
                </form>
            </>}
            {currentStep === 2 && <>
                <p>If you want, you can provide a Gravatar e-mail-address so your coworkers get to see a profile
                    picture.</p>
                <form onSubmit={goToNextStep}>
                    <label>
                        E-Mail-Address:<br/>
                        <input type="text" value={state.gravatarMail} placeholder="peter.pan@example.com" autoFocus={true}
                               onChange={event => setState({...state, gravatarMail: event.target.value})}/>
                    </label>
                </form>
            </>}
            {currentStep === 3 && <>
                <p>It is optional to show Gravatar avatars. While enhancing your experience, it also means sending data
                    to WordPress. Do you want to see avatars under these circumstances?</p>
                <Switch onChange={newVal => setState({...state, gravatar: newVal})} value={state.gravatar}>
                    Use Gravatar avatars
                </Switch>
            </>}
            {currentStep === numberOfSteps && <>
                <p>Last, but not least, the legal stuff. By using this plugin, you agree that you've read and do accept
                    the privacy policy.</p>
                <p>
                    <a href="https://xdplugins.pabloklaschka.de/privacy-policy">Privacy Policy</a>
                </p>
                <p><strong>Your privacy is very important to us, which is why no data leaves the XD document unless
                    you've opted in at a previous step.</strong></p>
                <Switch onChange={newVal => setState({...state, privacyPolicy: newVal})} value={state.privacyPolicy}>
                    I have read and agree to the privacy policy.
                </Switch>
            </>}
            {currentStep > numberOfSteps && <>
                <p>Loading the plugin...</p>
            </>}

            {currentStep <= numberOfSteps &&
            <div className="flex">
                {currentStep > 0 && <button uxp-variant={'secondary'} onClick={() => setCurrentStep(currentStep - 1)}>
                    Back
                </button>}
                <div className="spacer">&nbsp;</div>
                <button uxp-variant={'cta'} onClick={goToNextStep}
                        disabled={!(currentStep < numberOfSteps || state.privacyPolicy)}>
                    {currentStep === 0 ? 'Let\'s do it' : 'Continue'}
                </button>
            </div>
            }
        </>
    )

}
