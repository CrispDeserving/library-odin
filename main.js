const library = [];
let dom_cards;
let form_toggler;
let add_book_form;
const DEV = true;

window.addEventListener("DOMContentLoaded", () => {
	dom_cards = document.querySelector(".cards");
	form_toggler = document.querySelector(".add-book-form-toggler");

	let add_book_form = document.querySelector(".add-book-form");
	let form_wrapper = document.querySelector(".form-wrapper");

	form_toggler.addEventListener("click", () => {
		add_book_form.classList.toggle("hidden");
		form_toggler.classList.toggle("shown");
		form_wrapper.classList.toggle("justify-end");
	});

	add_book_form.addEventListener("submit", (evt) => {
		evt.preventDefault();
		form_toggler.click();

		if (!DEV) {
			for (let input of add_book_form.querySelectorAll("input")) {
				input.value = "";
			}

			const check_box = add_book_form.querySelector(`input[type="checkbox"]`);
			check_box.checked = false;
		}

		const form_data = new FormData(add_book_form);
		add_to_library(form_data);
	});

	add_to_library({ title: "The Book", author: "Anon Doe", year_published: 2023, pages: 125 });
	add_to_library({ title: "The Book 2", author: "Anon Doe", year_published: 2025, pages: 125 });
	add_to_library({ title: "The Book 5: The Great Series Skip", author: "Anon Doe", year_published: 2027, pages: 125 });
	add_to_library({ title: "The Book 6: The Great Series Sequel", author: "Anon Doe", year_published: 2029, pages: 125 });

	add_to_library({ title: "Bad Book", author: "Doe Naught", year_published: 1994, pages: 125 });
	add_to_library({ title: "Bad Hook", author: "Doe Naught", year_published: 1999, pages: 125 });
	add_to_library({ title: "Bad Brook", author: "Doe Naught", year_published: 2003, pages: 125 });
	add_to_library({ title: "Bread Shook", author: "Doe Naught", year_published: 2005, pages: 125 });
	
//	library.push(...library);
//	update_library_cards(library);
});

function Book(title, author, year_published, read_book_status, pages) {
	this.title = title;
	this.author = author;
	this.year_published = year_published;
	this.read_book_status = read_book_status;
	this.pages = pages;

	this.toggle_read_status = function() {
		this.read_book_status = !this.read_book_status;
	}
}

function add_to_library(card) {
	if (card instanceof FormData) {
		const title = card.get("title");
		const author = card.get("author");
		const year_published = card.get("year_published");
		const pages = card.get("pages");
		const read_book_status = card.get("read-book");

		library.push(new Book(title, author, year_published, read_book_status, pages));
		update_library_cards(library);
	} else {
		let {title, author, year_published, read_book_status, pages} = card;
		read_book_status = read_book_status ?? false;

		library.push(new Book(title, author, year_published, read_book_status, pages));
		update_library_cards(library);
	}
}

function remove_to_library(card_id) {
	library.splice(card_id, 1);
	
	update_library_cards(library);
}

function toggle_read(card_id) {
	const card = library[card_id];
	card.toggle_read_status();

	update_library_cards(library);
}

function update_library_cards(cards) {
	let inner_html = "";
	for (let i=0; i<cards.length; i++) {
		let card = cards[i];
		
		inner_html += `
			<div class="card" id="card${i}">
				<h2>${card.title}</h2>

				<div class="detail-wrapper">
					<div class="details">
						<div>
							<span>Author: </span>
							<span>${card.author}</span>
						</div>

						<div>
							<span>Year Published: </span>
							<span>${card.year_published}</span>
						</div>

						<div>
							<span>Pages: </span>
							<span>${card.pages}</span>
						</div>

						<div>
							${string_if_true(!card.read_book_status, "Not")} Read Book
						</div>
					</div>

					<div class="buttons">
						<button class="remove_book" onClick="remove_to_library(${i})"> Remove Card </button>
						<button class="toggle_read" onClick="toggle_read(${i})"> Finish Reading? </button>
					</div>
				</div>
			</div>
		`;
	}

	dom_cards.innerHTML = inner_html;
}

function string_if_true(bool_expr, string) {
	return bool_expr ? String(string) : "";
}
