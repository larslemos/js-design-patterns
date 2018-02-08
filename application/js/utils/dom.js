	window.D$ = (function() {
		var elementHandlers = {
			tr: function(parent) {
				if(parent != null) return parent.insertRow()
				 else 	return this['*'](parent,'tr')
			},
			td: function(parent) {
				if(parent != null) return parent.inserCell()
					else return this['*'](parent, 'td')
			},
			text: function(parent) {
				var textNode = document.createTextNode('New Node inserted here')
				if(parent != null) parent.appendChild(textNode)
					return textNode
			},
			'*' : function(parent, elementName) {
				var element = document.createElement(elementName)
				if(parent != null) parent.appendChild(element)
					return element
			}
		}
	function createElement(elementName, options) {
		options = options || {}
		var element = document.createElement(elementName)

		if (options.parent != null) {
			options.parent.appendChild(element)
		} 

		decorateElement(element, options)

		return element
	}

	function decorateElement(element, options) {
		options = options || {}

		if(options.text != null) {
			setTextElement(element, options.text)
		}
		if(options.className != null) {
			element.className = options.className
		}
	}

	function setTextElement(element, text) {
		//Modern browsers
		if(element.textContent != null) {
			element.textContent = text
		} else {
			element.innerHTML = text
		}
	} 

	function addEventListener(element, type, cb) {
		if(window.addEventListener) {
			element.addEventListener(type, cb, false)
		} else if(window.attachEvent) {
			element.attachEvent('on'+ type, cb)
		} else {
			element['on'+ type] = cb
		}
	}

	function removeEventListener(element, type, cb) {
		if(window.addEventListener) {
			element.removeEventListener('on'+type, cb)
		} else if(window.attachEvent) {
			element.detachEvent('on'+type, cb)
		} else {
			delete element['on'+type]
		}
	}

	return {
		create: createElement,
		on: addEventListener,
		off: removeEventListener
	}

})()
