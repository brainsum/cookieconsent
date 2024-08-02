import { el } from 'redom';

export default class Utilities {
	static ready(fn) {
		if (
			document.attachEvent
				? document.readyState === 'complete'
				: document.readyState !== 'loading'
		) {
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	}

	static objectType(obj) {
		return Object.prototype.toString.call(obj).slice(8, -1);
	}

	static lightenDarkenColor(col, amt) {
		let usePound = false;

		// Handling HEX color format
		if (col[0] === '#') {
			col = col.slice(1);
			usePound = true;

			let num = parseInt(col, 16);
			let r = (num >> 16) + amt;
			let g = ((num >> 8) & 0x00ff) + amt;
			let b = (num & 0x0000ff) + amt;

			r = Math.min(255, Math.max(0, r));
			g = Math.min(255, Math.max(0, g));
			b = Math.min(255, Math.max(0, b));

			return (
				(usePound ? '#' : '') +
				((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')
			);
		}

		// Handling RGBA and RGB color format
		if (col.startsWith('rgb')) {
			let parts = col.match(
				/rgba?\((\d{1,3})\s*,?\s*(\d{1,3})\s*,?\s*(\d{1,3})(?:\s*\/\s*(\d+\.?\d*%?))?\)/i
			);

			if (parts) {
				let r = parseInt(parts[1]) + amt;
				let g = parseInt(parts[2]) + amt;
				let b = parseInt(parts[3]) + amt;
				let a = parts[4] ? parseFloat(parts[4]) : 1;

				r = Math.min(255, Math.max(0, r));
				g = Math.min(255, Math.max(0, g));
				b = Math.min(255, Math.max(0, b));

				// Conditionally format output depending on alpha presence
				if (parts[4]) {
					return `rgba(${r}, ${g}, ${b}, ${a})`;
				} else {
					return `rgb(${r}, ${g}, ${b})`;
				}
			}
		}
		return col; // Return the original if format is not recognized
	}

	static removeCookie() {
		document.cookie = `cconsent=; expires=Thu, 01 Jan 1980 00:00:00 UTC; path=/;`;
		//remove localStorage consentMode obj
		localStorage.removeItem('consentMode');
		window.CookieConsent.config.cookieExists = false;
	}

	// Create an array of services from Cookieconsent global object
	// Filter based on category or leave empty is all is wanted
	static listGlobalServices(category) {
		let categories = [];

		// Global config objectnot set
		if (typeof window.CookieConsent === 'undefined') return categories;

		// Category is not specified or opposite
		if (typeof category === 'undefined') {
			for (let key in window.CookieConsent.config.services) {
				categories.push(key);
			}
		} else {
			for (let key in window.CookieConsent.config.services) {
				if (window.CookieConsent.config.services[key].category === category)
					categories.push(key);
			}
		}

		return categories;
	}

	static dispatchEvent(elem, event) {
		var event;

		if (typeof Event === 'function') {
			event = new Event(event);
		} else {
			event = document.createEvent('Event');
			event.initEvent(event, true, true);
		}

		elem.dispatchEvent(event);
	}

	// Parse HTML and creates paragraph with links
	static parseAndCreateParagraph(htmlString) {
		const paragraph = el('p');
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = htmlString;

		tempDiv.childNodes.forEach((node) => {
			if (node.nodeType === Node.TEXT_NODE) {
				paragraph.appendChild(el('span', node.textContent));
			} else if (
				node.nodeType === Node.ELEMENT_NODE &&
				node.tagName.toLowerCase() === 'a'
			) {
				const href = node.getAttribute('href');
				const text = node.textContent;
				paragraph.appendChild(
					el(
						'a',
						{ href: href, target: '_blank', rel: 'noopener noreferrer' },
						text
					)
				);
			}
		});

		return paragraph;
	}
}
