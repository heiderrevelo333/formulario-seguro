window.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('.form-container'); 
	if (!form) return;

	const campos = [
		{ sel: 'input[name="nombre_proyecto"]', msg: 'Por favor, ingresa el nombre del proyecto.' },
		{ sel: 'input[name="nombre_cliente"]', msg: 'Por favor, ingresa tu nombre.' },
		{ sel: 'input[name="email_cliente"]', msg: 'Por favor, ingresa un correo válido.', tipo: 'correo' }
	];

	form.querySelectorAll('.input-group').forEach(group => {
		let error = group.querySelector('.input-error');
		if (!error) {
			error = document.createElement('div');
			error.className = 'input-error';
			error.style.display = 'none';
			group.appendChild(error);
		}
	});

	campos.forEach(campo => {
		const input = form.querySelector(campo.sel);
		if (!input) return; 
		const errorDiv = input.closest('.input-group').querySelector('.input-error');
		input.addEventListener('input', () => {
			validarCampo(input, campo, errorDiv);
		});
	});


	form.addEventListener('submit', e => {
		let esFormularioValido = true;

		campos.forEach(campo => {
			const input = form.querySelector(campo.sel);
			if (!input) return;
			const errorDiv = input.closest('.input-group').querySelector('.input-error');
			if (!validarCampo(input, campo, errorDiv)) esFormularioValido = false;
		});

		const recaptchaResponse = typeof grecaptcha !== 'undefined' ? grecaptcha.getResponse() : '';
		const recaptchaGroup = form.querySelector('.g-recaptcha')?.closest('.input-group');
		if (recaptchaGroup && recaptchaResponse.length === 0) {
			const errorDiv = recaptchaGroup.querySelector('.input-error');
			errorDiv.innerHTML = `<span class='icono-error'>❗</span> Por favor, completa la verificación.`;
			errorDiv.style.display = 'block';
			esFormularioValido = false;
		}

		if (!esFormularioValido) {
			e.preventDefault();
		}
	});

	function validarCampo(input, campo, errorDiv) {
		let error = '';
		if (!input.value.trim()) { error = campo.msg; }
		else if (campo.tipo === 'correo' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
			error = 'Por favor, ingresa un correo válido.';
		}
		if (error) {
			errorDiv.innerHTML = `<span class='icono-error'>❗</span> ${error}`;
			errorDiv.style.display = 'block';
			return false;
		} else {
			errorDiv.innerHTML = '';
			errorDiv.style.display = 'none';
			return true;
		}
	}
});
