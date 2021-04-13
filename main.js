document.addEventListener("DOMContentLoaded", function () { //DOM Ready
	/**
	 * Capture all of the rows except for the totals row
	 **get a NodeList of items we are about
	 */
	const item_rows = document.querySelectorAll(".calculator .row[data-type]");
	const goal_dropdowns = document.querySelectorAll("#age, #sex");

	goal_dropdowns.forEach(function (dropdown) {
		dropdown.addEventListener("change", goal_setup_listener);
	})

	/**
	 * Iterate through them
	 */
	item_rows.forEach(function (row) {
		/**
		 * For each row establish an event listener for change and keyup
		 *
		 * To keep things DRY, we created a function called item_input_listener that fires for each event
		 * This allows the same code to be used for multiple events
		 */
		const qty_field = row.querySelector("[name='qty']");
		qty_field.addEventListener("change", item_input_listener);
		qty_field.addEventListener("keyup", item_input_listener);
	});
});

let fruit_goal;
let vegetable_goal;
let grain_goal;
let dairy_goal;
let protein_goal;
let age = false;
let sex = false;

/**
 * Listen to the dropdowns to establish goals
 */
function goal_setup_listener(e) {
	age = document.querySelector("#age").value;
	sex = document.querySelector("#sex").value;

	console.log("Age", age);
	console.log("Sex", sex);

	/**
	 * If both dropdowns have selections
	 */
	if (age && sex) {
		if (age === "age_1" && sex === "male") {
			fruit_goal = 14;
			vegetable_goal = 21;
			protein_goal = 45.5;
			dairy_goal = 21;
			grain_goal = 56;
		}

		if (age === "age_2" && sex === "male") {
			fruit_goal = 14;
			vegetable_goal = 21;
			protein_goal = 42;
			dairy_goal = 21;
			grain_goal = 49;
		}

		if (age === "age_3" && sex === "male") {
			fruit_goal = 14;
			vegetable_goal = 17.5;
			protein_goal = 38.5;
			dairy_goal = 21;
			grain_goal = 42;
		}

		if (age === "age_1" && sex === "female") {
			fruit_goal = 10.5;
			vegetable_goal = 17.5;
			protein_goal = 35;
			dairy_goal = 21;
			grain_goal = 42;
		}

		if (age === "age_2" && sex === "female") {
			fruit_goal = 10.5;
			vegetable_goal = 14;
			protein_goal = 35;
			dairy_goal = 21;
			grain_goal = 35;
		}

		if (age === "age_3" && sex === "female") {
			fruit_goal = 10.5;
			vegetable_goal = 14;
			protein_goal = 35;
			dairy_goal = 21;
			grain_goal = 35;
		}

		//to automatically refresh fields if something is updated
		document.querySelectorAll("[name='qty']").forEach(function (input) {
			if (input.value > 0) {
				input.dispatchEvent(new Event("change"));
			}
		});
	}
}

/**
 * Fired on qty input
 *
 * The event is fired when a user types or uses other methods for changing the quantity
 * @param {Event Object} e
 * @returns
 */
function item_input_listener(e) {
	const row = e.target.closest(".row"); // trace back the parent row from the qty field that is the source of the event
	let qty = row.querySelector("[name='qty']").value; // capture the value

	if (qty === "") { // if the qty is blank, short circuit the function so there are no errors
		return false;
	}

	qty = parseFloat(qty); // if the qty is not blank, ensure it is a number

	if (qty < 0) { //if the number is negative, force it back to zero
		console.log("negative number");
		row.querySelector("[name='qty']").value = 0;
		row.querySelector("[name='qty']").dispatchEvent(new Event("change"));
		return false;
	}

	if (!age || !sex) { // if sex or age isn't set, short-circuit the function
		return false;
	}

	let is_goal_met = false;

	if (row.dataset.type === "fruit") {
		if (qty >= fruit_goal) {
			row.classList.add("goal");
			row.querySelector("p").innerHTML = `Good job! Your weekly goal for fruit is ${fruit_goal} cups`;
		} else {
			row.classList.add("fail");
			row.querySelector("p").innerHTML = `There is room for improvement. <b>You are ${(fruit_goal - qty)} cups short of your weekly fruit goal of ${fruit_goal} cups</b>`;
		}
	}
	if (row.dataset.type === "vegetable") {
		if (qty >= vegetable_goal) {
			row.classList.add("goal");
			row.querySelector("p").innerHTML = `Good job! Your weekly goal for vegetables is ${vegetable_goal} cups`;
		} else {
			row.classList.add("fail");
			row.querySelector("p").innerHTML = `There is room for improvement. <b>You are ${(vegetable_goal - qty)} cups short of your weekly vegetable goal of ${vegetable_goal} cups</b>`;
		}
	}
	if (row.dataset.type === "grain") {
		if (qty >= grain_goal) {
			row.classList.add("goal");
			row.querySelector("p").innerHTML = `Good job! Your weekly goal for grains is ${grain_goal} ounces`;
		} else {
			row.classList.add("fail");
			row.querySelector("p").innerHTML = `There is room for improvement. <b>You are ${(grain_goal - qty)} cups short of your weekly grain goal of ${grain_goal} ounces</b>`;
		}
	}
	if (row.dataset.type === "dairy") {
		if (qty >= dairy_goal) {
			row.classList.add("goal");
			row.querySelector("p").innerHTML = `Good job! Your weekly goal for grains is ${dairy_goal} cups`;
		} else {
			row.classList.add("fail");
			row.querySelector("p").innerHTML = `There is room for improvement. <b> You are ${(dairy_goal - qty)} cups short of your weekly dairy goal of ${dairy_goal} cups</b>`;
		}
	}
	if (row.dataset.type === "protein") {
		//first we get all of the proteins
		qty = 0;

		document.querySelectorAll("[data-type='protein']").forEach(function (row) {
			qty = qty + parseFloat(row.querySelector("[name='qty']").value)
		});

		document.querySelectorAll("[data-type='protein']").forEach(function (row) {
			let message;
			if (qty >= protein_goal) {
				row.classList.add("goal");
				if (row.id === "animal") {
					message = `Nice job! Your weekly protein goal is ${protein_goal} ounces`;
				}

				if (row.id === "nuts") {
					message = `Nice job! Your weekly protein goal is ${protein_goal} ounces`;
				}


			} else {
				row.classList.add("fail");
				if (row.id === "animal") {
					message = `There is room for improvement. <b> You are ${(protein_goal - qty)} cups short of your weekly goal of ${protein_goal} cups.</b> You can improve this with more animal protein, or with vegetable protein.`;
				}

				if (row.id === "nuts") {
					message = `There is room for improvement. <b> You are ${(protein_goal - qty)} cups short of your weekly goal of ${protein_goal} cups.</b> You can improve this with more vegetable protein, or with animal protein.`;
				}
			}
			row.querySelector("p").innerHTML = message;
		});
	}


	// once this row's calculations are done, recalculate the totals for the entire list
	calculate_totals();
}

/**
 * Calculates the totals for the final row in the interactive
 */
function calculate_totals() {
	const item_rows = document.querySelectorAll(".calculator .row[data-type]"); // grab all of the rows that are not the totals row

	/**
	 * Iterate through each row
	 */
	item_rows.forEach(function (row) {
		// capture the quantity value
		let qty = row.querySelector("[name='qty']").value;

		//if the quantity on this row is blank, skip the row
		if (qty === "") {
			return false;
		}

		qty = parseInt(qty); //convert quantity to an integer

	});
}

/**
 * Rounds the input value to two decimal places for currency
 * @param {Number} num
 * @returns {String}
 */
function round_number(num) {
	//first, move the decimal two places forward
	// 1.204567 becomes 120.4567
	num = num * 100;

	//then, round the number to the nearest integer
	// 120.4567 becomes 120
	num = Math.round(num);

	//then move the decimal back two places
	// 120 become 1.2
	num = num / 100;

	// handle trailing zeroes
	// 1.2 becomes 1.20
	num = num.toFixed(2);

	return num;
}