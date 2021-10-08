export default function createKeyboardListener(document) {
	class State {
		// Attributes
		constructor() {
			this.obsevers = [];
		}

		// Methods
		subscribe(observerFunction) {
			this.obsevers.push(observerFunction);
		};

		notifyAll(command) {
			// console.log(`keyboardListener.state.notifyAll() -> ${this.obsevers.length} observers notified`);
			for (const observerFunction of this.obsevers) {
				observerFunction(command);
			};
		};
	};
	const state = new State();

	// event listener -> keydown
	document.addEventListener("keydown", (event) => {
		const keyPressed = event.key;
		const command = {
			dinoId: "dinosaur1",
			keyPressed: keyPressed
		};
		state.notifyAll(command);
	});

	return { state };
};