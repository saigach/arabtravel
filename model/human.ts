import { newDate, Model, File } from './common'

export class Nationality {
	static List:Nationality[] = [
		new Nationality({ id: 'jordanian', title: 'Jordanian', icon: null }),
		new Nationality({ id: 'afghan', title: 'Afghan', icon: null }),
		new Nationality({ id: 'albanian', title: 'Albanian', icon: null }),
		new Nationality({ id: 'algerian', title: 'Algerian', icon: null }),
		new Nationality({ id: 'american', title: 'American', icon: null }),
		new Nationality({ id: 'andorran', title: 'Andorran', icon: null }),
		new Nationality({ id: 'angolan', title: 'Angolan', icon: null }),
		new Nationality({ id: 'antiguans', title: 'Antiguans', icon: null }),
		new Nationality({ id: 'argentinean', title: 'Argentinean', icon: null }),
		new Nationality({ id: 'armenian', title: 'Armenian', icon: null }),
		new Nationality({ id: 'australian', title: 'Australian', icon: null }),
		new Nationality({ id: 'austrian', title: 'Austrian', icon: null }),
		new Nationality({ id: 'azerbaijani', title: 'Azerbaijani', icon: null }),
		new Nationality({ id: 'bahamian', title: 'Bahamian', icon: null }),
		new Nationality({ id: 'bahraini', title: 'Bahraini', icon: null }),
		new Nationality({ id: 'bangladeshi', title: 'Bangladeshi', icon: null }),
		new Nationality({ id: 'barbadian', title: 'Barbadian', icon: null }),
		new Nationality({ id: 'barbudans', title: 'Barbudans', icon: null }),
		new Nationality({ id: 'batswana', title: 'Batswana', icon: null }),
		new Nationality({ id: 'belarusian', title: 'Belarusian', icon: null }),
		new Nationality({ id: 'belgian', title: 'Belgian', icon: null }),
		new Nationality({ id: 'belizean', title: 'Belizean', icon: null }),
		new Nationality({ id: 'beninese', title: 'Beninese', icon: null }),
		new Nationality({ id: 'bhutanese', title: 'Bhutanese', icon: null }),
		new Nationality({ id: 'bolivian', title: 'Bolivian', icon: null }),
		new Nationality({ id: 'bosnian', title: 'Bosnian', icon: null }),
		new Nationality({ id: 'brazilian', title: 'Brazilian', icon: null }),
		new Nationality({ id: 'british', title: 'British', icon: null }),
		new Nationality({ id: 'bruneian', title: 'Bruneian', icon: null }),
		new Nationality({ id: 'bulgarian', title: 'Bulgarian', icon: null }),
		new Nationality({ id: 'burkinabe', title: 'Burkinabe', icon: null }),
		new Nationality({ id: 'burmese', title: 'Burmese', icon: null }),
		new Nationality({ id: 'burundian', title: 'Burundian', icon: null }),
		new Nationality({ id: 'cambodian', title: 'Cambodian', icon: null }),
		new Nationality({ id: 'cameroonian', title: 'Cameroonian', icon: null }),
		new Nationality({ id: 'canadian', title: 'Canadian', icon: null }),
		new Nationality({ id: 'cape-verdean', title: 'Cape Verdean', icon: null }),
		new Nationality({ id: 'central-african', title: 'Central African', icon: null }),
		new Nationality({ id: 'chadian', title: 'Chadian', icon: null }),
		new Nationality({ id: 'chilean', title: 'Chilean', icon: null }),
		new Nationality({ id: 'chinese', title: 'Chinese', icon: null }),
		new Nationality({ id: 'colombian', title: 'Colombian', icon: null }),
		new Nationality({ id: 'comoran', title: 'Comoran', icon: null }),
		new Nationality({ id: 'congolese', title: 'Congolese', icon: null }),
		new Nationality({ id: 'costa-rican', title: 'Costa Rican', icon: null }),
		new Nationality({ id: 'croatian', title: 'Croatian', icon: null }),
		new Nationality({ id: 'cuban', title: 'Cuban', icon: null }),
		new Nationality({ id: 'cypriot', title: 'Cypriot', icon: null }),
		new Nationality({ id: 'czech', title: 'Czech', icon: null }),
		new Nationality({ id: 'danish', title: 'Danish', icon: null }),
		new Nationality({ id: 'djibouti', title: 'Djibouti', icon: null }),
		new Nationality({ id: 'dominican', title: 'Dominican', icon: null }),
		new Nationality({ id: 'dutch', title: 'Dutch', icon: null }),
		new Nationality({ id: 'east-timorese', title: 'East Timorese', icon: null }),
		new Nationality({ id: 'ecuadorean', title: 'Ecuadorean', icon: null }),
		new Nationality({ id: 'egyptian', title: 'Egyptian', icon: null }),
		new Nationality({ id: 'emirian', title: 'Emirian', icon: null }),
		new Nationality({ id: 'equatorial-guinean', title: 'Equatorial Guinean', icon: null }),
		new Nationality({ id: 'eritrean', title: 'Eritrean', icon: null }),
		new Nationality({ id: 'estonian', title: 'Estonian', icon: null }),
		new Nationality({ id: 'ethiopian', title: 'Ethiopian', icon: null }),
		new Nationality({ id: 'fijian', title: 'Fijian', icon: null }),
		new Nationality({ id: 'filipino', title: 'Filipino', icon: null }),
		new Nationality({ id: 'finnish', title: 'Finnish', icon: null }),
		new Nationality({ id: 'french', title: 'French', icon: null }),
		new Nationality({ id: 'gabonese', title: 'Gabonese', icon: null }),
		new Nationality({ id: 'gambian', title: 'Gambian', icon: null }),
		new Nationality({ id: 'georgian', title: 'Georgian', icon: null }),
		new Nationality({ id: 'german', title: 'German', icon: null }),
		new Nationality({ id: 'ghanaian', title: 'Ghanaian', icon: null }),
		new Nationality({ id: 'greek', title: 'Greek', icon: null }),
		new Nationality({ id: 'grenadian', title: 'Grenadian', icon: null }),
		new Nationality({ id: 'guatemalan', title: 'Guatemalan', icon: null }),
		new Nationality({ id: 'guinea-bissauan', title: 'Guinea-Bissauan', icon: null }),
		new Nationality({ id: 'guinean', title: 'Guinean', icon: null }),
		new Nationality({ id: 'guyanese', title: 'Guyanese', icon: null }),
		new Nationality({ id: 'haitian', title: 'Haitian', icon: null }),
		new Nationality({ id: 'herzegovinian', title: 'Herzegovinian', icon: null }),
		new Nationality({ id: 'honduran', title: 'Honduran', icon: null }),
		new Nationality({ id: 'hungarian', title: 'Hungarian', icon: null }),
		new Nationality({ id: 'i-kiribati', title: 'I-Kiribati', icon: null }),
		new Nationality({ id: 'icelander', title: 'Icelander', icon: null }),
		new Nationality({ id: 'indian', title: 'Indian', icon: null }),
		new Nationality({ id: 'indonesian', title: 'Indonesian', icon: null }),
		new Nationality({ id: 'iranian', title: 'Iranian', icon: null }),
		new Nationality({ id: 'iraqi', title: 'Iraqi', icon: null }),
		new Nationality({ id: 'irish', title: 'Irish', icon: null }),
		new Nationality({ id: 'israeli', title: 'Israeli', icon: null }),
		new Nationality({ id: 'italian', title: 'Italian', icon: null }),
		new Nationality({ id: 'ivorian', title: 'Ivorian', icon: null }),
		new Nationality({ id: 'jamaican', title: 'Jamaican', icon: null }),
		new Nationality({ id: 'japanese', title: 'Japanese', icon: null }),
		new Nationality({ id: 'kazakhstani', title: 'Kazakhstani', icon: null }),
		new Nationality({ id: 'kenyan', title: 'Kenyan', icon: null }),
		new Nationality({ id: 'kittian-and-nevisian', title: 'Kittian and Nevisian', icon: null }),
		new Nationality({ id: 'kuwaiti', title: 'Kuwaiti', icon: null }),
		new Nationality({ id: 'kyrgyz', title: 'Kyrgyz', icon: null }),
		new Nationality({ id: 'laotian', title: 'Laotian', icon: null }),
		new Nationality({ id: 'latvian', title: 'Latvian', icon: null }),
		new Nationality({ id: 'lebanese', title: 'Lebanese', icon: null }),
		new Nationality({ id: 'liberian', title: 'Liberian', icon: null }),
		new Nationality({ id: 'libyan', title: 'Libyan', icon: null }),
		new Nationality({ id: 'liechtensteiner', title: 'Liechtensteiner', icon: null }),
		new Nationality({ id: 'lithuanian', title: 'Lithuanian', icon: null }),
		new Nationality({ id: 'luxembourger', title: 'Luxembourger', icon: null }),
		new Nationality({ id: 'macedonian', title: 'Macedonian', icon: null }),
		new Nationality({ id: 'malagasy', title: 'Malagasy', icon: null }),
		new Nationality({ id: 'malawian', title: 'Malawian', icon: null }),
		new Nationality({ id: 'malaysian', title: 'Malaysian', icon: null }),
		new Nationality({ id: 'maldivan', title: 'Maldivan', icon: null }),
		new Nationality({ id: 'malian', title: 'Malian', icon: null }),
		new Nationality({ id: 'maltese', title: 'Maltese', icon: null }),
		new Nationality({ id: 'marshallese', title: 'Marshallese', icon: null }),
		new Nationality({ id: 'mauritanian', title: 'Mauritanian', icon: null }),
		new Nationality({ id: 'mauritian', title: 'Mauritian', icon: null }),
		new Nationality({ id: 'mexican', title: 'Mexican', icon: null }),
		new Nationality({ id: 'micronesian', title: 'Micronesian', icon: null }),
		new Nationality({ id: 'moldovan', title: 'Moldovan', icon: null }),
		new Nationality({ id: 'monacan', title: 'Monacan', icon: null }),
		new Nationality({ id: 'mongolian', title: 'Mongolian', icon: null }),
		new Nationality({ id: 'moroccan', title: 'Moroccan', icon: null }),
		new Nationality({ id: 'mosotho', title: 'Mosotho', icon: null }),
		new Nationality({ id: 'motswana', title: 'Motswana', icon: null }),
		new Nationality({ id: 'mozambican', title: 'Mozambican', icon: null }),
		new Nationality({ id: 'namibian', title: 'Namibian', icon: null }),
		new Nationality({ id: 'nauruan', title: 'Nauruan', icon: null }),
		new Nationality({ id: 'nepalese', title: 'Nepalese', icon: null }),
		new Nationality({ id: 'new-zealander', title: 'New Zealander', icon: null }),
		new Nationality({ id: 'nicaraguan', title: 'Nicaraguan', icon: null }),
		new Nationality({ id: 'nigerian', title: 'Nigerian', icon: null }),
		new Nationality({ id: 'nigerien', title: 'Nigerien', icon: null }),
		new Nationality({ id: 'north-korean', title: 'North Korean', icon: null }),
		new Nationality({ id: 'northern-irish', title: 'Northern Irish', icon: null }),
		new Nationality({ id: 'norwegian', title: 'Norwegian', icon: null }),
		new Nationality({ id: 'omani', title: 'Omani', icon: null }),
		new Nationality({ id: 'pakistani', title: 'Pakistani', icon: null }),
		new Nationality({ id: 'palauan', title: 'Palauan', icon: null }),
		new Nationality({ id: 'panamanian', title: 'Panamanian', icon: null }),
		new Nationality({ id: 'papua-new-guinean', title: 'Papua New Guinean', icon: null }),
		new Nationality({ id: 'paraguayan', title: 'Paraguayan', icon: null }),
		new Nationality({ id: 'peruvian', title: 'Peruvian', icon: null }),
		new Nationality({ id: 'polish', title: 'Polish', icon: null }),
		new Nationality({ id: 'portuguese', title: 'Portuguese', icon: null }),
		new Nationality({ id: 'qatari', title: 'Qatari', icon: null }),
		new Nationality({ id: 'romanian', title: 'Romanian', icon: null }),
		new Nationality({ id: 'russian', title: 'Russian', icon: null }),
		new Nationality({ id: 'rwandan', title: 'Rwandan', icon: null }),
		new Nationality({ id: 'saint-lucian', title: 'Saint Lucian', icon: null }),
		new Nationality({ id: 'salvadoran', title: 'Salvadoran', icon: null }),
		new Nationality({ id: 'samoan', title: 'Samoan', icon: null }),
		new Nationality({ id: 'san-marinese', title: 'San Marinese', icon: null }),
		new Nationality({ id: 'sao-tomean', title: 'Sao Tomean', icon: null }),
		new Nationality({ id: 'saudi', title: 'Saudi', icon: null }),
		new Nationality({ id: 'scottish', title: 'Scottish', icon: null }),
		new Nationality({ id: 'senegalese', title: 'Senegalese', icon: null }),
		new Nationality({ id: 'serbian', title: 'Serbian', icon: null }),
		new Nationality({ id: 'seychellois', title: 'Seychellois', icon: null }),
		new Nationality({ id: 'sierra-leonean', title: 'Sierra Leonean', icon: null }),
		new Nationality({ id: 'singaporean', title: 'Singaporean', icon: null }),
		new Nationality({ id: 'slovakian', title: 'Slovakian', icon: null }),
		new Nationality({ id: 'slovenian', title: 'Slovenian', icon: null }),
		new Nationality({ id: 'solomon-islander', title: 'Solomon Islander', icon: null }),
		new Nationality({ id: 'somali', title: 'Somali', icon: null }),
		new Nationality({ id: 'south-african', title: 'South African', icon: null }),
		new Nationality({ id: 'south-korean', title: 'South Korean', icon: null }),
		new Nationality({ id: 'spanish', title: 'Spanish', icon: null }),
		new Nationality({ id: 'sri-lankan', title: 'Sri Lankan', icon: null }),
		new Nationality({ id: 'sudanese', title: 'Sudanese', icon: null }),
		new Nationality({ id: 'surinamer', title: 'Surinamer', icon: null }),
		new Nationality({ id: 'swazi', title: 'Swazi', icon: null }),
		new Nationality({ id: 'swedish', title: 'Swedish', icon: null }),
		new Nationality({ id: 'swiss', title: 'Swiss', icon: null }),
		new Nationality({ id: 'syrian', title: 'Syrian', icon: null }),
		new Nationality({ id: 'taiwanese', title: 'Taiwanese', icon: null }),
		new Nationality({ id: 'tajik', title: 'Tajik', icon: null }),
		new Nationality({ id: 'tanzanian', title: 'Tanzanian', icon: null }),
		new Nationality({ id: 'thai', title: 'Thai', icon: null }),
		new Nationality({ id: 'togolese', title: 'Togolese', icon: null }),
		new Nationality({ id: 'tongan', title: 'Tongan', icon: null }),
		new Nationality({ id: 'trinidadian-or-tobagonian', title: 'Trinidadian or Tobagonian', icon: null }),
		new Nationality({ id: 'tunisian', title: 'Tunisian', icon: null }),
		new Nationality({ id: 'turkish', title: 'Turkish', icon: null }),
		new Nationality({ id: 'tuvaluan', title: 'Tuvaluan', icon: null }),
		new Nationality({ id: 'ugandan', title: 'Ugandan', icon: null }),
		new Nationality({ id: 'ukrainian', title: 'Ukrainian', icon: null }),
		new Nationality({ id: 'uruguayan', title: 'Uruguayan', icon: null }),
		new Nationality({ id: 'uzbekistani', title: 'Uzbekistani', icon: null }),
		new Nationality({ id: 'venezuelan', title: 'Venezuelan', icon: null }),
		new Nationality({ id: 'vietnamese', title: 'Vietnamese', icon: null }),
		new Nationality({ id: 'welsh', title: 'Welsh', icon: null }),
		new Nationality({ id: 'yemenite', title: 'Yemenite', icon: null }),
		new Nationality({ id: 'zambian', title: 'Zambian', icon: null }),
		new Nationality({ id: 'zimbabwea', title: 'Zimbabwea', icon: null })
	]

	static getNationality(id: string = ''): Nationality {
		return Nationality.List.find( (value:Nationality) => value.id === id) || Nationality.List[0]
	}

	id: string
	title: string
	icon: string

	constructor(value: any = {}) {
		this.id = String(value.id || '')
		this.title = String(value.title || '')
		this.icon = String(value.icon || '')
	}
}

export class AgeGroup {
	static List: AgeGroup[] = [
		new AgeGroup({ id: 'adults', title: 'Adults', icon: null }),
		new AgeGroup({ id: 'kids', title: 'Kids', icon: null }),
		new AgeGroup({ id: 'infants', title: 'Infants', icon: null })
	]

	static getAgeGroup(id: string): AgeGroup {
		return AgeGroup.List.find( (value:AgeGroup) => value.id === id) || AgeGroup.List[0]
	}

	id: string
	title: string
	icon: string

	constructor(value: any = {}) {
		this.id = String(value.id || '')
		this.title = String(value.title || '')
		this.icon = String(value.icon || '')
	}
}

export class Human extends Model {
	nationality: Nationality
	dob: Date

	phone: string
	email: string

	passport: string

	tickets: File[]

	getAge(now: Date = newDate()): number {
		if (!this.dob)
			return null

		let ageDifMs: number = Number(now) - this.dob.getTime()
		return Math.abs(new Date(ageDifMs).getUTCFullYear() - 1970)
	}

	get age(): number {
		return this.getAge()
	}

	getAgeGroup(now: Date = newDate()): AgeGroup {
		let age = this.getAge(now)

		if (age === null)
			return null

		if (age > 6)
			return  AgeGroup.getAgeGroup('adults')

		if (age >= 2 && age <= 6)
			return  AgeGroup.getAgeGroup('kids')

		if (age < 2)
			return  AgeGroup.getAgeGroup('infants')
	}

	get ageGroup(): AgeGroup {
		return this.getAgeGroup()
	}

	constructor(value: any = {}) {
		super(value)

		this.nationality = Nationality.getNationality(value.nationality || null)

		this.dob = value.dob ? newDate(value.dob) : null

		this.phone = String(value.phone || '')
		this.email = String(value.email || '')

		this.passport = String(value.passport || '')

		this.tickets = value.tickets instanceof Array ?
			value.tickets.reduce(
				( prev: File[] , value:any ) =>
					value ? prev.concat(value instanceof File ? value : new File(value)) : prev,
				[]
			) : []
	}

	toObject(): {} {
		return Object.assign({}, super.toObject(), {
			nationality: this.nationality.id,
			dob: this.dob,
			phone: this.phone,
			email: this.email,
			passport: this.passport,
			tickets: this.tickets.reduce( (prev: {}[], value: File) => prev.concat(value.toObject()), [])
		})
	}
}
