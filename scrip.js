window.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('.formulario');
	if (!form) return;
	const input = form.querySelector('input[placeholder="Su Correo"]');
	const group = input.closest('.input-group');
	let errorDiv = group.querySelector('.input-error');
	if (!errorDiv) {
		errorDiv = document.createElement('div');
		errorDiv.className = 'input-error';
		errorDiv.style.display = 'none';
		group.appendChild(errorDiv);
	}
	input.addEventListener('input', () => {
		if (!input.value.includes('@') || !input.value.includes('.')) {
			errorDiv.textContent = 'Correo inválido.';
			errorDiv.style.display = 'block';
		} else {
			errorDiv.textContent = '';
			errorDiv.style.display = 'none';
		}
	});
});
