export default {
	key:'2wsuptA2A-9oC-7H-7tscuaiH4mg==',

	charCounterCount: false,

	iframe: true,
	iframeStyle: '',
	initOnClick: false,
	heightMin: 300,

	placeholderText: '',
	language: 'en',
	spellcheck: true,

	toolbarBottom: false,
	toolbarSticky: true,
	toolbarInline: false,
	toolbarVisibleWithoutSelection: true,

	toolbarButtons: ['bold', 'italic', 'underline','strong','align' , 'paragraphFormat', 'formatOL', 'formatUL', '|', 'insertLink', 'insertImage', 'insertQuote', 'insertTable', '|', 'undo', 'redo', 'selectAll', 'html'],

	editorClass: '',

	htmlAllowComments: false,
	htmlAllowedAttrs: ['allowfullscreen', 'alt', 'class', 'colspan', 'contenteditable', 'controls', 'd', 'data', 'data-.*', 'frameborder', 'href', 'id', 'rowspan', 'src', 'spellcheck', 'style', 'target', 'title', 'scrolling', 'type', 'width', 'height', 'viewBox', 'name', 'xmlns', 'xmlns:xlink', 'xlink:href'],
	htmlAllowedTags: ['a', 'b', 'blockquote', 'br', 'div', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'i', 'iframe', 'img', 'li', 'ol', 'p', 'script', 'span', 'path', 'strong', 'svg', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'tr', 'u', 'ul', 'svg', 'use'],
	htmlAllowedEmptyTags: ['iframe', 'img', 'div', 'script', 'span', 'path', 'use'],
	htmlRemoveTags: [],
	htmlSimpleAmpersand: false,

	paragraphFormat: {
		N: 'Обычно',
		H3: 'Заголовок'
	},
	paragraphFormatSelection: false,
	paragraphMultipleStyles: false,
	paragraphStyles: {},

	multiLine: true,

	linkAlwaysBlank: true,
	linkAttributes: {},
	linkAutoPrefix: '//',
	linkConvertEmailAddress: false,
	linkEditButtons: 	['linkOpen', 'linkEdit', 'linkRemove'],
	linkInsertButtons: [],
	linkList: [],
	linkStyles: {},
	linkText: false,

	tableCellMultipleStyles: false,
	tableCellStyles: {},
	tableColors: [],
	tableColorsButtons: [],
	tableEditButtons: ['tableHeader', 'tableRemove', '|', 'tableRows', 'tableColumns', '-', 'tableCells', 'tableCellStyle'],
	tableInsertButtons: ['tableBack', '|'],
	tableMultipleStyles: false,
	tableStyles: {},

	pastePlain: true,
	pasteAllowLocalImages: false,
	pasteDeniedAttrs: ['class', 'id', 'style'],
	pasteDeniedTags: [],

	imageAllowedTypes: ['jpeg', 'jpg', 'png'],
	imageDefaultAlign: 'left',
	imageDefaultDisplay: 'block',
	imageMove: false,
	imageMultipleStyles: false,
	imagePaste: false,
	imageUploadMethod: 'POST',
	imageUploadParam: 'file',
	imageUploadParams: {},
	imageUploadURL: '/file/jpg'
}
