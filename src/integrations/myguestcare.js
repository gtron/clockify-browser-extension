const STORAGE_KEY = 'clockify_defaults';

(async () => {
	clockifyButton.render(
		'.navbar-top-name',
		{ observe: false },
		async (elem) => {

			const container = $('.navbar-top-name .change-client');
			const tenantCode = $('.navbar-top-name>span').textContent;

			const defaults = {
				small: false,
				...JSON.parse( (await localStorage.getItem(STORAGE_KEY)) || '{}'),
				...JSON.parse( (await sessionStorage.getItem(STORAGE_KEY)) || '{}'),
			};


			const description = `[${tenantCode}] `;

			const link = clockifyButton.createButton({
				description,
				projectName: defaults.projectName,
				taskName: defaults.taskName,
				small: defaults.small,
			});
			container.append(link);

			setTimeout( () => {
				link.title = `Project: ${defaults.projectName || 'Empty'}\nTask: ${defaults.taskName || 'Empty'}`;
			}, 1000);

			if( ! await sessionStorage.getItem(STORAGE_KEY) || window.location.href.endsWith('setup') ) {

				const pElement = document.createElement('a');
				pElement.onclick = () => {
					const proj = prompt('Progetto di default', 'SUP - Supporto Telefonico');
					if(proj) setProject(proj);
				};
				pElement.textContent = '[Progetto di default]';

				container.appendChild(pElement);

				const attivita = document.createElement('a');
				attivita.onclick = () => {
					const act = prompt('Attività', 'Generico');
					if(act) setActivity(act);
				};
				attivita.textContent = '[Attività]';

				container.appendChild(attivita);
			}
		}
	);
})();



const setProject = async (text) => {
	const current = JSON.parse( await sessionStorage.getItem(STORAGE_KEY) || '{}' );

	await sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
		taskName: 'Generico',
		small: false,
		...current,
		projectName: text
	}));
}
const setActivity = async (text) => {
	const current = JSON.parse( await sessionStorage.getItem(STORAGE_KEY) || '{}' );

	await sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
		small: false,
		...current,
		taskName: text,
	}));
}

