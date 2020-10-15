import React from 'react';
import iconCrosshair from '../../../assets/icons/Smock_Crosshairs_18_N.png';
import iconDelete from '../../../assets/icons/Smock_Delete_18_N.png';
import iconEdit from '../../../assets/icons/Smock_Edit_18_N.png';

export function MessageViewer(props: {
	html: string;
	onGoToViewport: () => void;
	ownMessage: boolean;
	onEdit: () => void;
	onDelete: () => void;
}) {
	return (
		<>
			<div
				className="MessageContent"
				dangerouslySetInnerHTML={{ __html: props.html }}
			/>
			<p className={'MessageActions'}>
				<button
					uxp-variant={'action'}
					onClick={props.onGoToViewport}
					title={'Go to viewport position'}>
					<img src={iconCrosshair} alt={'Go to viewport position'} />
				</button>
				{props.ownMessage && (
					<>
						&nbsp;
						<button
							uxp-variant={'action'}
							onClick={props.onEdit}
							title={'Edit message'}>
							<img src={iconEdit} alt={'Edit message'} />
						</button>
						&nbsp;
						<button
							uxp-variant={'action'}
							onClick={props.onDelete}
							title={'Delete message'}>
							<img src={iconDelete} alt={'Delete message'} />
						</button>
					</>
				)}
			</p>
		</>
	);
}
