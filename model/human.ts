import { newDate, Model, File, MLString } from './common'

export class Nationality {
	static List:Nationality[] = [
		new Nationality({ id: "jordan", title: new MLString({en: "jordan", ar: "الأردن"}), icon: null }),
		new Nationality({ id: "egypt", title: new MLString({en: "egypt", ar: "مصر"}), icon: null }),
		new Nationality({ id: "saudi arabia", title: new MLString({en: "saudi arabia", ar: "المملكة العربية السعودية"}), icon: null }), 		
		new Nationality({ id: "afghanistan", title: new MLString({en: "afghanistan", ar: "أفغانستان"}), icon: null }),
		new Nationality({ id: "albania", title: new MLString({en: "albania", ar: "ألبانيا"}), icon: null }),
		new Nationality({ id: "algeria", title: new MLString({en: "algeria", ar: "الجزائر"}), icon: null }),
		new Nationality({ id: "american samoa", title: new MLString({en: "american samoa", ar: "ساموا-الأمريكي"}), icon: null }),
		new Nationality({ id: "andorra", title: new MLString({en: "andorra", ar: "أندورا"}), icon: null }),
		new Nationality({ id: "angola", title: new MLString({en: "angola", ar: "أنغولا"}), icon: null }),
		new Nationality({ id: "anguilla", title: new MLString({en: "anguilla", ar: "أنغويلا"}), icon: null }),
		new Nationality({ id: "antarctica", title: new MLString({en: "antarctica", ar: "أنتاركتيكا"}), icon: null }),
		new Nationality({ id: "antigua and barbuda", title: new MLString({en: "antigua and barbuda", ar: "أنتيغوا وبربودا"}), icon: null }),
		new Nationality({ id: "argentina", title: new MLString({en: "argentina", ar: "الأرجنتين"}), icon: null }),
		new Nationality({ id: "armenia", title: new MLString({en: "armenia", ar: "أرمينيا"}), icon: null }),
		new Nationality({ id: "aruba", title: new MLString({en: "aruba", ar: "أروبا"}), icon: null }),
		new Nationality({ id: "australia", title: new MLString({en: "australia", ar: "أستراليا"}), icon: null }),
		new Nationality({ id: "austria", title: new MLString({en: "austria", ar: "النمسا"}), icon: null }),
		new Nationality({ id: "azerbaijan", title: new MLString({en: "azerbaijan", ar: "أذربيجان"}), icon: null }),
		new Nationality({ id: "bahamas", title: new MLString({en: "bahamas", ar: "الباهاماس"}), icon: null }),
		new Nationality({ id: "bahrain", title: new MLString({en: "bahrain", ar: "البحرين"}), icon: null }),
		new Nationality({ id: "bangladesh", title: new MLString({en: "bangladesh", ar: "بنغلاديش"}), icon: null }),
		new Nationality({ id: "barbados", title: new MLString({en: "barbados", ar: "بربادوس"}), icon: null }),
		new Nationality({ id: "belarus", title: new MLString({en: "belarus", ar: "روسيا البيضاء"}), icon: null }),
		new Nationality({ id: "belgium", title: new MLString({en: "belgium", ar: "بلجيكا"}), icon: null }),
		new Nationality({ id: "belize", title: new MLString({en: "belize", ar: "بيليز"}), icon: null }),
		new Nationality({ id: "benin", title: new MLString({en: "benin", ar: "بنين"}), icon: null }),
		new Nationality({ id: "bermuda", title: new MLString({en: "bermuda", ar: "جزر برمود"}), icon: null }),
		new Nationality({ id: "bhutan", title: new MLString({en: "bhutan", ar: "بوتان"}), icon: null }),
		new Nationality({ id: "bolivia", title: new MLString({en: "bolivia", ar: "بوليفيا"}), icon: null }),
		new Nationality({ id: "bosnia and herzegovina", title: new MLString({en: "bosnia and herzegovina", ar: "البوسنة و الهرسك"}), icon: null }),
		new Nationality({ id: "botswana", title: new MLString({en: "botswana", ar: "بوتسوانا"}), icon: null }),
		new Nationality({ id: "brazil", title: new MLString({en: "brazil", ar: "البرازيل"}), icon: null }),
		new Nationality({ id: "brunei", title: new MLString({en: "brunei", ar: "بروناي"}), icon: null }),
		new Nationality({ id: "bulgaria", title: new MLString({en: "bulgaria", ar: "بلغاريا"}), icon: null }),
		new Nationality({ id: "burkina faso", title: new MLString({en: "burkina faso", ar: "بوركينا فاسو"}), icon: null }),
		new Nationality({ id: "burundi", title: new MLString({en: "burundi", ar: "بوروندي"}), icon: null }),
		new Nationality({ id: "cambodia", title: new MLString({en: "cambodia", ar: "كمبوديا"}), icon: null }),
		new Nationality({ id: "cameroon", title: new MLString({en: "cameroon", ar: "كاميرون"}), icon: null }),
		new Nationality({ id: "canada", title: new MLString({en: "canada", ar: "كندا"}), icon: null }),
		new Nationality({ id: "cape verde", title: new MLString({en: "cape verde", ar: "الرأس الأخضر"}), icon: null }),
		new Nationality({ id: "central african republic", title: new MLString({en: "central african republic", ar: "جمهورية أفريقيا الوسطى"}), icon: null }),
		new Nationality({ id: "chad", title: new MLString({en: "chad", ar: "تشاد"}), icon: null }),
		new Nationality({ id: "chile", title: new MLString({en: "chile", ar: "تشيلي"}), icon: null }),
		new Nationality({ id: "china", title: new MLString({en: "china", ar: "جمهورية الصين الشعبية"}), icon: null }),
		new Nationality({ id: "colombia", title: new MLString({en: "colombia", ar: "كولومبيا"}), icon: null }),
		new Nationality({ id: "comoros", title: new MLString({en: "comoros", ar: "جزر القمر"}), icon: null }),
		new Nationality({ id: "democratic republic of the congo (kinshasa)", title: new MLString({en: "democratic republic of the congo (kinshasa)", ar: "جمهورية الكونغو الديمقراطية"}), icon: null }),
		new Nationality({ id: "congo, republic of(brazzaville)", title: new MLString({en: "congo, republic of(brazzaville)", ar: "جمهورية الكونغو"}), icon: null }),
		new Nationality({ id: "cook islands", title: new MLString({en: "cook islands", ar: "جزر كوك"}), icon: null }),
		new Nationality({ id: "costa rica", title: new MLString({en: "costa rica", ar: "كوستاريكا"}), icon: null }),
		new Nationality({ id: "cote d'ivoire (ivory coast)", title: new MLString({en: "cote d'ivoire (ivory coast)", ar: "ساحل العاج"}), icon: null }),
		new Nationality({ id: "croatia", title: new MLString({en: "croatia", ar: "كرواتيا"}), icon: null }),
		new Nationality({ id: "cuba", title: new MLString({en: "cuba", ar: "كوبا"}), icon: null }),
		new Nationality({ id: "cyprus", title: new MLString({en: "cyprus", ar: "قبرص"}), icon: null }),
		new Nationality({ id: "czech republic", title: new MLString({en: "czech republic", ar: "الجمهورية التشيكية"}), icon: null }),
		new Nationality({ id: "denmark", title: new MLString({en: "denmark", ar: "الدانمارك"}), icon: null }),
		new Nationality({ id: "djibouti", title: new MLString({en: "djibouti", ar: "جيبوتي"}), icon: null }),
		new Nationality({ id: "dominica", title: new MLString({en: "dominica", ar: "دومينيكا"}), icon: null }),
		new Nationality({ id: "dominican republic", title: new MLString({en: "dominican republic", ar: "الجمهورية الدومينيكية"}), icon: null }),
		new Nationality({ id: "east timor timor-leste", title: new MLString({en: "east timor timor-leste", ar: "تيمور الشرقية"}), icon: null }),
		new Nationality({ id: "ecuador", title: new MLString({en: "ecuador", ar: "إكوادور"}), icon: null }),

		new Nationality({ id: "el salvador", title: new MLString({en: "el salvador", ar: "إلسلفادور"}), icon: null }),
		new Nationality({ id: "equatorial guinea", title: new MLString({en: "equatorial guinea", ar: "غينيا الاستوائي"}), icon: null }),
		new Nationality({ id: "eritrea", title: new MLString({en: "eritrea", ar: "إريتريا"}), icon: null }),
		new Nationality({ id: "estonia", title: new MLString({en: "estonia", ar: "استونيا"}), icon: null }),
		new Nationality({ id: "ethiopia", title: new MLString({en: "ethiopia", ar: "أثيوبيا"}), icon: null }),
		new Nationality({ id: "falkland islands", title: new MLString({en: "falkland islands", ar: "جزر فوكلاند"}), icon: null }),
		new Nationality({ id: "faroe islands", title: new MLString({en: "faroe islands", ar: "جزر فارو"}), icon: null }),
		new Nationality({ id: "fiji", title: new MLString({en: "fiji", ar: "فيجي"}), icon: null }),
		new Nationality({ id: "finland", title: new MLString({en: "finland", ar: "فنلندا"}), icon: null }),
		new Nationality({ id: "france", title: new MLString({en: "france", ar: "فرنسا"}), icon: null }),
		new Nationality({ id: "french guiana", title: new MLString({en: "french guiana", ar: "غويانا الفرنسية"}), icon: null }),
		new Nationality({ id: "french polynesia", title: new MLString({en: "french polynesia", ar: "بولينيزيا الفرنسية"}), icon: null }),
		new Nationality({ id: "gabon", title: new MLString({en: "gabon", ar: "الغابون"}), icon: null }),
		new Nationality({ id: "gambia", title: new MLString({en: "gambia", ar: "غامبيا"}), icon: null }),
		new Nationality({ id: "georgia", title: new MLString({en: "georgia", ar: "جيورجيا"}), icon: null }),
		new Nationality({ id: "germany", title: new MLString({en: "germany", ar: "ألمانيا"}), icon: null }),
		new Nationality({ id: "ghana", title: new MLString({en: "ghana", ar: "غانا"}), icon: null }),
		new Nationality({ id: "greece", title: new MLString({en: "greece", ar: "اليونان"}), icon: null }),
		new Nationality({ id: "greenland", title: new MLString({en: "greenland", ar: "جرينلاند"}), icon: null }),
		new Nationality({ id: "grenada", title: new MLString({en: "grenada", ar: "غرينادا"}), icon: null }),
		new Nationality({ id: "guadeloupe", title: new MLString({en: "guadeloupe", ar: "جزر جوادلوب"}), icon: null }),
		new Nationality({ id: "guam", title: new MLString({en: "guam", ar: "جوام"}), icon: null }),
		new Nationality({ id: "guatemala", title: new MLString({en: "guatemala", ar: "غواتيمال"}), icon: null }),
		new Nationality({ id: "guinea", title: new MLString({en: "guinea", ar: "غينيا"}), icon: null }),
		new Nationality({ id: "guinea-bissau", title: new MLString({en: "guinea-bissau", ar: "غينيا-بيساو"}), icon: null }),
		new Nationality({ id: "guyana", title: new MLString({en: "guyana", ar: "غيانا"}), icon: null }),
		new Nationality({ id: "haiti", title: new MLString({en: "haiti", ar: "هايتي"}), icon: null }),
		new Nationality({ id: "holy see", title: new MLString({en: "holy see", ar: "الكرسي الرسولي"}), icon: null }),
		new Nationality({ id: "honduras", title: new MLString({en: "honduras", ar: "هندوراس"}), icon: null }),
		new Nationality({ id: "hong kong", title: new MLString({en: "hong kong", ar: "هونغ كونغ"}), icon: null }),
		new Nationality({ id: "hungary", title: new MLString({en: "hungary", ar: "المجر"}), icon: null }),
		new Nationality({ id: "iceland", title: new MLString({en: "iceland", ar: "آيسلندا"}), icon: null }),
		new Nationality({ id: "india", title: new MLString({en: "india", ar: "الهند"}), icon: null }),
		new Nationality({ id: "indonesia", title: new MLString({en: "indonesia", ar: "أندونيسيا"}), icon: null }),
		new Nationality({ id: "iran (islamic republic of)", title: new MLString({en: "iran (islamic republic of)", ar: "إيران"}), icon: null }),
		new Nationality({ id: "iraq", title: new MLString({en: "iraq", ar: "العراق"}), icon: null }),
		new Nationality({ id: "ireland (republic of)", title: new MLString({en: "ireland (republic of)", ar: "جمهورية أيرلندا"}), icon: null }),
		new Nationality({ id: "israel", title: new MLString({en: "israel", ar: "إسرائيل"}), icon: null }),
		new Nationality({ id: "italy", title: new MLString({en: "italy", ar: "إيطاليا"}), icon: null }),
		new Nationality({ id: "jamaica", title: new MLString({en: "jamaica", ar: "جمايكا"}), icon: null }),
		new Nationality({ id: "japan", title: new MLString({en: "japan", ar: "اليابان"}), icon: null }),

		new Nationality({ id: "kazakhstan", title: new MLString({en: "kazakhstan", ar: "كازاخستان"}), icon: null }),
		new Nationality({ id: "kenya", title: new MLString({en: "kenya", ar: "كينيا"}), icon: null }),
		new Nationality({ id: "kiribati", title: new MLString({en: "kiribati", ar: "كيريباتي"}), icon: null }),
		new Nationality({ id: "korea, (north korea)", title: new MLString({en: "korea, (north korea)", ar: "كوريا الشمالية"}), icon: null }),
		new Nationality({ id: "korea, (south korea)", title: new MLString({en: "korea, (south korea)", ar: "كوريا الجنوبية"}), icon: null }),
		new Nationality({ id: "kuwait", title: new MLString({en: "kuwait", ar: "الكويت"}), icon: null }),
		new Nationality({ id: "kyrgyzstan", title: new MLString({en: "kyrgyzstan", ar: "قيرغيزستان"}), icon: null }),
		new Nationality({ id: "lao, pdr", title: new MLString({en: "lao, pdr", ar: "لاوس"}), icon: null }),
		new Nationality({ id: "latvia", title: new MLString({en: "latvia", ar: "لاتفيا"}), icon: null }),
		new Nationality({ id: "lebanon", title: new MLString({en: "lebanon", ar: "لبنان"}), icon: null }),
		new Nationality({ id: "lesotho", title: new MLString({en: "lesotho", ar: "ليسوتو"}), icon: null }),
		new Nationality({ id: "liberia", title: new MLString({en: "liberia", ar: "ليبيريا"}), icon: null }),
		new Nationality({ id: "libya", title: new MLString({en: "libya", ar: "ليبيا"}), icon: null }),
		new Nationality({ id: "liechtenstein", title: new MLString({en: "liechtenstein", ar: "ليختنشتين"}), icon: null }),
		new Nationality({ id: "lithuania", title: new MLString({en: "lithuania", ar: "لتوانيا"}), icon: null }),
		new Nationality({ id: "luxembourg", title: new MLString({en: "luxembourg", ar: "لوكسمبورغ"}), icon: null }),
		new Nationality({ id: "macao", title: new MLString({en: "macao", ar: "ماكاو"}), icon: null }),
		new Nationality({ id: "macedonia, rep. of", title: new MLString({en: "macedonia, rep. of", ar: "جمهورية مقدونيا"}), icon: null }),
		new Nationality({ id: "madagascar", title: new MLString({en: "madagascar", ar: "مدغشقر"}), icon: null }),
		new Nationality({ id: "malawi", title: new MLString({en: "malawi", ar: "مالاوي"}), icon: null }),
		new Nationality({ id: "malaysia", title: new MLString({en: "malaysia", ar: "ماليزيا"}), icon: null }),
		new Nationality({ id: "maldives", title: new MLString({en: "maldives", ar: "المالديف"}), icon: null }),
		new Nationality({ id: "mali", title: new MLString({en: "mali", ar: "مالي"}), icon: null }),
		new Nationality({ id: "malta", title: new MLString({en: "malta", ar: "مالطا"}), icon: null }),
		new Nationality({ id: "marshall islands", title: new MLString({en: "marshall islands", ar: "جزر مارشال"}), icon: null }),
		new Nationality({ id: "martinique", title: new MLString({en: "martinique", ar: "مارتينيك"}), icon: null }),
		new Nationality({ id: "mauritania", title: new MLString({en: "mauritania", ar: "موريتانيا"}), icon: null }),
		new Nationality({ id: "mauritius", title: new MLString({en: "mauritius", ar: "موريشيوس"}), icon: null }),
		new Nationality({ id: "mexico", title: new MLString({en: "mexico", ar: "المكسيك"}), icon: null }),
		new Nationality({ id: "micronesia, federal states of", title: new MLString({en: "micronesia, federal states of", ar: "ولايات ميكرونيسيا المتحدة"}), icon: null }),
		new Nationality({ id: "moldova, republic of", title: new MLString({en: "moldova, republic of", ar: "مولدافيا"}), icon: null }),
		new Nationality({ id: "monaco", title: new MLString({en: "monaco", ar: "موناكو"}), icon: null }),
		new Nationality({ id: "mongolia", title: new MLString({en: "mongolia", ar: "منغوليا"}), icon: null }),
		new Nationality({ id: "montenegro", title: new MLString({en: "montenegro", ar: "الجبل الأسو"}), icon: null }),
		new Nationality({ id: "montserrat", title: new MLString({en: "montserrat", ar: "مونتسيرات"}), icon: null }),
		new Nationality({ id: "morocco", title: new MLString({en: "morocco", ar: "المغرب"}), icon: null }),
		new Nationality({ id: "mozambique", title: new MLString({en: "mozambique", ar: "موزمبيق"}), icon: null }),
		new Nationality({ id: "myanmar, burma", title: new MLString({en: "myanmar, burma", ar: "ميانمار"}), icon: null }),
		new Nationality({ id: "namibia", title: new MLString({en: "namibia", ar: "ناميبيا"}), icon: null }),
		new Nationality({ id: "nauru", title: new MLString({en: "nauru", ar: "ناورو"}), icon: null }),
		new Nationality({ id: "nepal", title: new MLString({en: "nepal", ar: "نيبال"}), icon: null }),
		new Nationality({ id: "netherlands", title: new MLString({en: "netherlands", ar: "هولندا"}), icon: null }),
		new Nationality({ id: "netherlands antilles", title: new MLString({en: "netherlands antilles", ar: "جزر الأنتيل الهولندي"}), icon: null }),
		new Nationality({ id: "new caledonia", title: new MLString({en: "new caledonia", ar: "كاليدونيا الجديدة"}), icon: null }),
		new Nationality({ id: "new zealand", title: new MLString({en: "new zealand", ar: "نيوزيلندا"}), icon: null }),
		new Nationality({ id: "nicaragua", title: new MLString({en: "nicaragua", ar: "نيكاراجوا"}), icon: null }),
		new Nationality({ id: "niger", title: new MLString({en: "niger", ar: "النيجر"}), icon: null }),
		new Nationality({ id: "nigeria", title: new MLString({en: "nigeria", ar: "نيجيريا"}), icon: null }),
		new Nationality({ id: "niue", title: new MLString({en: "niue", ar: "نييوي"}), icon: null }),
		new Nationality({ id: "northern mariana islands", title: new MLString({en: "northern mariana islands", ar: "جزر ماريانا الشمالية"}), icon: null }),
		new Nationality({ id: "norway", title: new MLString({en: "norway", ar: "النرويج"}), icon: null }),
		new Nationality({ id: "oman", title: new MLString({en: "oman", ar: "عُمان"}), icon: null }),
		new Nationality({ id: "pakistan", title: new MLString({en: "pakistan", ar: "باكستان"}), icon: null }),
		new Nationality({ id: "palau", title: new MLString({en: "palau", ar: "بالاو"}), icon: null }),
		new Nationality({ id: "palestinian territories", title: new MLString({en: "palestinian territories", ar: "الأراضي الفلسطينية"}), icon: null }),
		new Nationality({ id: "panama", title: new MLString({en: "panama", ar: "بنما"}), icon: null }),
		new Nationality({ id: "papua new guinea", title: new MLString({en: "papua new guinea", ar: "بابوا غينيا الجديدة"}), icon: null }),
		new Nationality({ id: "paraguay", title: new MLString({en: "paraguay", ar: "باراغواي"}), icon: null }),
		new Nationality({ id: "peru", title: new MLString({en: "peru", ar: "بيرو"}), icon: null }),
		new Nationality({ id: "philippines", title: new MLString({en: "philippines", ar: "الفليبين"}), icon: null }),
		new Nationality({ id: "poland", title: new MLString({en: "poland", ar: "بولندا"}), icon: null }),
		new Nationality({ id: "portugal", title: new MLString({en: "portugal", ar: "البرتغال"}), icon: null }),
		new Nationality({ id: "puerto rico", title: new MLString({en: "puerto rico", ar: "بورتوريكو"}), icon: null }),
		new Nationality({ id: "qatar", title: new MLString({en: "qatar", ar: "قطر"}), icon: null }),
		new Nationality({ id: "reunion island", title: new MLString({en: "reunion island", ar: "ريونيون"}), icon: null }),
		new Nationality({ id: "romania", title: new MLString({en: "romania", ar: "رومانيا"}), icon: null }),
		new Nationality({ id: "russian federation", title: new MLString({en: "russian federation", ar: "روسيا"}), icon: null }),
		new Nationality({ id: "rwanda", title: new MLString({en: "rwanda", ar: "رواندا"}), icon: null }),
		new Nationality({ id: "saint kitts and nevis", title: new MLString({en: "saint kitts and nevis", ar: "سانت كيتس ونيفس"}), icon: null }),
		new Nationality({ id: "saint lucia", title: new MLString({en: "saint lucia", ar: "سانت لوسيا"}), icon: null }),
		new Nationality({ id: "saint vincent and the grenadines", title: new MLString({en: "saint vincent and the grenadines", ar: "سانت فنسنت وجزر غرينادين"}), icon: null }),
		new Nationality({ id: "samoa", title: new MLString({en: "samoa", ar: "ساموا"}), icon: null }),
		new Nationality({ id: "san marino", title: new MLString({en: "san marino", ar: "سان مارينو"}), icon: null }),
		new Nationality({ id: "sao tome and principe", title: new MLString({en: "sao tome and principe", ar: "ساو تومي وبرينسيبي"}), icon: null }),

		new Nationality({ id: "senegal", title: new MLString({en: "senegal", ar: "السنغال"}), icon: null }),
		new Nationality({ id: "serbia", title: new MLString({en: "serbia", ar: "جمهورية صربيا"}), icon: null }),
		new Nationality({ id: "seychelles", title: new MLString({en: "seychelles", ar: "سيشيل"}), icon: null }),
		new Nationality({ id: "sierra leone", title: new MLString({en: "sierra leone", ar: "سيراليون"}), icon: null }),
		new Nationality({ id: "singapore", title: new MLString({en: "singapore", ar: "سنغافورة"}), icon: null }),
		new Nationality({ id: "slovakia (slovak republic)", title: new MLString({en: "slovakia (slovak republic)", ar: "سلوفاكيا"}), icon: null }),
		new Nationality({ id: "slovenia", title: new MLString({en: "slovenia", ar: "سلوفينيا"}), icon: null }),
		new Nationality({ id: "solomon islands", title: new MLString({en: "solomon islands", ar: "جزر سليمان"}), icon: null }),
		new Nationality({ id: "somalia", title: new MLString({en: "somalia", ar: "الصومال"}), icon: null }),
		new Nationality({ id: "south africa", title: new MLString({en: "south africa", ar: "جنوب أفريقيا"}), icon: null }),
		new Nationality({ id: "south sudan", title: new MLString({en: "south sudan", ar: "جنوب السودان"}), icon: null }),
		new Nationality({ id: "spain", title: new MLString({en: "spain", ar: "إسبانيا"}), icon: null }),
		new Nationality({ id: "sri lanka", title: new MLString({en: "sri lanka", ar: "سريلانكا"}), icon: null }),
		new Nationality({ id: "sudan", title: new MLString({en: "sudan", ar: "السودان"}), icon: null }),
		new Nationality({ id: "suriname", title: new MLString({en: "suriname", ar: "سورينام"}), icon: null }),
		new Nationality({ id: "swaziland", title: new MLString({en: "swaziland", ar: "سوازيلند"}), icon: null }),
		new Nationality({ id: "sweden", title: new MLString({en: "sweden", ar: "السويد"}), icon: null }),
		new Nationality({ id: "switzerland", title: new MLString({en: "switzerland", ar: "سويسرا"}), icon: null }),
		new Nationality({ id: "syria, syrian arab republic", title: new MLString({en: "syria, syrian arab republic", ar: "سوريا"}), icon: null }),
		new Nationality({ id: "taiwan (republic of china)", title: new MLString({en: "taiwan (republic of china)", ar: "تايوان"}), icon: null }),
		new Nationality({ id: "tajikistan", title: new MLString({en: "tajikistan", ar: "طاجيكستان"}), icon: null }),
		new Nationality({ id: "tanzania", title: new MLString({en: "tanzania", ar: "تنزانيا"}), icon: null }),
		new Nationality({ id: "thailand", title: new MLString({en: "thailand", ar: "تايلندا"}), icon: null }),
		new Nationality({ id: "tibet", title: new MLString({en: "tibet", ar: "تبت"}), icon: null }),
		new Nationality({ id: "timor-leste (east timor)", title: new MLString({en: "timor-leste (east timor)", ar: "تيمور الشرقية"}), icon: null }),
		new Nationality({ id: "togo", title: new MLString({en: "togo", ar: "توغو"}), icon: null }),
		new Nationality({ id: "tonga", title: new MLString({en: "tonga", ar: "تونغا"}), icon: null }),
		new Nationality({ id: "trinidad and tobago", title: new MLString({en: "trinidad and tobago", ar: "ترينيداد وتوباغو"}), icon: null }),
		new Nationality({ id: "tunisia", title: new MLString({en: "tunisia", ar: "تونس"}), icon: null }),
		new Nationality({ id: "turkey", title: new MLString({en: "turkey", ar: "تركيا"}), icon: null }),
		new Nationality({ id: "turkmenistan", title: new MLString({en: "turkmenistan", ar: "تركمانستان"}), icon: null }),
		new Nationality({ id: "tuvalu", title: new MLString({en: "tuvalu", ar: "توفالو"}), icon: null }),
		new Nationality({ id: "uganda", title: new MLString({en: "uganda", ar: "أوغندا"}), icon: null }),
		new Nationality({ id: "ukraine", title: new MLString({en: "ukraine", ar: "أوكرانيا"}), icon: null }),
		new Nationality({ id: "united arab emirates", title: new MLString({en: "united arab emirates", ar: "الإمارات العربية المتحدة"}), icon: null }),
		new Nationality({ id: "united kingdom", title: new MLString({en: "united kingdom", ar: "المملكة المتحدة"}), icon: null }),
		new Nationality({ id: "united states", title: new MLString({en: "united states", ar: "الولايات المتحدة"}), icon: null }),
		new Nationality({ id: "uruguay", title: new MLString({en: "uruguay", ar: "أورغواي"}), icon: null }),
		new Nationality({ id: "uzbekistan", title: new MLString({en: "uzbekistan", ar: "أوزباكستان"}), icon: null }),
		new Nationality({ id: "vanuatu", title: new MLString({en: "vanuatu", ar: "فانواتو"}), icon: null }),
		new Nationality({ id: "vatican city state", title: new MLString({en: "vatican city state", ar: "دولة مدينة الفاتيكان"}), icon: null }),
		new Nationality({ id: "venezuela", title: new MLString({en: "venezuela", ar: "فنزويلا"}), icon: null }),
		new Nationality({ id: "vietnam", title: new MLString({en: "vietnam", ar: "فيتنام"}), icon: null }),
		new Nationality({ id: "virgin islands (british)", title: new MLString({en: "virgin islands (british)", ar: "الجزر العذراء البريطانية"}), icon: null }),
		new Nationality({ id: "virgin islands (u.s.)", title: new MLString({en: "virgin islands (u.s.)", ar: "الجزر العذراء الأمريكي"}), icon: null }),
		new Nationality({ id: "wallis and", title: new MLString({en: "wallis and", ar: "والس وفوتونا"}), icon: null }),
		new Nationality({ id: "western sahara", title: new MLString({en: "western sahara", ar: "الصحراء الغربية"}), icon: null }),
		new Nationality({ id: "yemen", title: new MLString({en: "yemen", ar: "اليمن"}), icon: null }),
		new Nationality({ id: "zambia", title: new MLString({en: "zambia", ar: "زامبيا"}), icon: null }),
		new Nationality({ id: "zimbabwe", title: new MLString({en: "zimbabwe", ar: "زمبابوي"}), icon: null })
	]

	static getNationality(id: string = ''): Nationality {
		return Nationality.List.find( (value:Nationality) => value.id === id) || Nationality.List[0]
	}

	id: string
	title: MLString
	icon: string

	constructor(value: any = {}) {
		this.id = String(value.id || '')
		this.title = new MLString(value.title)
		this.icon = String(value.icon || '')
	}
}

export class Human extends Model {

	title: string

	nationality: Nationality

	_dob: Date
	_age: number

	getAge(now: Date = newDate()): number {
		if (!this.dob)
			return this._age === null ? 999 : this._age

		let ageDifMs: number = Number(now) - this.dob.getTime()
		return Math.abs(new Date(ageDifMs).getUTCFullYear() - 1970)
	}

	get age(): number {
		return this._age === null ? 999 : this._age
	}

	set age(value: number) {
		this._dob = null
		this._age = value
	}

	get dob() {
		return this._dob
	}

	set dob(value: Date) {
		this._dob = value
		this._age = this.getAge()
	}

	phone: string
	email: string

	passport: string

	tickets: File[]

	constructor(value: any = {}) {
		super(value)

		this.title = String(value.title || '')

		this.nationality = Nationality.getNationality(value.nationality || null)

		this.age = value.age !== undefined ? value.age : null
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
			title: this.title,
			nationality: this.nationality.id,
			dob: this.dob,
			age: this.age,
			phone: this.phone,
			email: this.email,
			passport: this.passport,
			tickets: this.tickets.reduce( (prev: {}[], value: File) => prev.concat(value.toObject()), [])
		})
	}
}


