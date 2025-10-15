import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInSeconds, parse } from 'date-fns';
import uuid from 'react-native-uuid';

export class Util {
    static dateTime_stringToDecimal(stringDate: string) {
        return new Date(stringDate).getTime() / 1000;
    }

    static tryParseInt(input: string) {
        if (input != null && input !== undefined && input !== "") {
            return parseInt(`${input}`.replace(/,/g, ""));
        } else {
            return 0;
        }
    }

    static tryParseFloat(input: string) {
        if (input != null && input !== undefined && input !== "") {
            return parseFloat(`${input}`.replace(/,/g, ""));
        } else {
            return 0;
        }
    }

    static dateDefault = new Date('01/01/2021').getTime();

    static calculateAge = (birthdate: string) => {
        const parsedBirthdate = parse(birthdate, 'dd/MM/yyyy', new Date());
        if (!isNaN(parsedBirthdate.getTime())) {
            const today = new Date();
            const birthdateThisYear = new Date(today.getFullYear(), parsedBirthdate.getMonth(), parsedBirthdate.getDate());
            let ageYears = today.getFullYear() - parsedBirthdate.getFullYear();
            if (today < birthdateThisYear) {
                ageYears--;
            }
            return ageYears;
        } else {
            return 0;
        }
    };

    static getStringDateNow() {
        const currentDate = new Date();
        const day = (currentDate.getDate().toString() as any).padStart(2, "0");
        const month = ((currentDate.getMonth() + 1).toString() as any).padStart(2, "0");
        const year = currentDate.getFullYear();

        return `${day} -${month} -${year} `;
    }

    /** 
     * number to money format.\ 
     * ex: 199999 => 1,999,999 
     * */
    static money(number: number | string) {
        if (number) {
            if (typeof number === "string") {
                return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            } else if (!isNaN(number)) {
                number = number.toFixed(2);
                return number.toString().replace(".00", "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        }
        return "0";
    }

    static moneytmp(number: number, a: number) {
        // if (typeof number === "string") number = parseFloat(number);
        let val = (number / 1).toFixed(a)
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    static stringToDate(_date: string, _format = "dd/MM/yyyy", _delimiter = "/") {
        let dayformat = _format.toLowerCase();
        let hourformat = '';
        let day = _date;
        let hours = '';
        let isHour = false;
        if (_format.trim().indexOf(" ") > -1) {
            dayformat = _format.trim().split(" ")[0];
            hourformat = _format.trim().split(" ")[1];
            day = _date.trim().split(" ")[0];
            hours = _date.trim().split(" ")[1];
            isHour = true;
        }
        let formatLowerCase = dayformat.toLowerCase();
        let formatItems = formatLowerCase.split(_delimiter);
        let dateItems = day.split(_delimiter);
        let monthIndex = formatItems.indexOf("mm");
        let dayIndex = formatItems.indexOf("dd");
        let yearIndex = formatItems.indexOf("yyyy");
        let hour = 0;
        let min = 0;
        let sec = 0;
        if (isHour) {
            let tmpHour = hourformat.split(":");
            let hourindex = tmpHour.indexOf("HH");
            if (hourindex < 0) {
                hourindex = tmpHour.indexOf("hh");
            }
            let mmindex = tmpHour.indexOf("mm");
            let ssindex = tmpHour.indexOf("ss");
            let time = hours.split(":");
            hour = time[hourindex] ? parseInt(time[hourindex]) : 0;
            min = time[mmindex] ? parseInt(time[mmindex]) : 0;
            sec = time[ssindex] ? parseInt(time[ssindex]) : 0;
        }
        let month = parseInt(dateItems[monthIndex]);
        month -= 1;
        let formatedDate = new Date(parseInt(dateItems[yearIndex]), month, parseInt(dateItems[dayIndex]), hour, min, sec);
        return formatedDate;
    }


    /** date: dd/mm/yyyy | yyyy/mm/dd | dd/mm | mm/yyyy
        time: hh:mm:ss | hh:mm */
    static datetoString(x = new Date(), y = "dd/mm/yyyy") {
        let splitDateTime = y.toLowerCase().split(" ");
        let dateConvert = splitDateTime[0]
        let timeConvert = splitDateTime[1]
        let startByTime = dateConvert.includes('hh')
        if (startByTime) {
            timeConvert = splitDateTime[0]
            dateConvert = splitDateTime[1]
        }
        if (dateConvert) {
            dateConvert = dateConvert.split(y.includes("/") ? "/" : "-").map(type => {
                switch (type.toLowerCase()) {
                    case "dd":
                        return x.getDate() < 10 ? `0${x.getDate()}` : `${x.getDate()}`;
                    case "mm":
                        return (x.getMonth() + 1) < 10 ? `0${(x.getMonth() + 1)}` : `${(x.getMonth() + 1)}`;
                    case "yyyy":
                        return `${x.getFullYear()}`;
                    default:
                        break;
                }
            }).join(y.includes("/") ? "/" : "-");
        }
        if (timeConvert) {
            timeConvert = timeConvert.split(":").map(type => {
                switch (type) {
                    case "hh":
                        return x.getHours() < 10 ? `0${x.getHours()}` : `${x.getHours()}`;
                    case "mm":
                        return x.getMinutes() < 10 ? `0${x.getMinutes()}` : `${x.getMinutes()}`;
                    case "ss":
                        return x.getSeconds() < 10 ? `0${x.getSeconds()}` : `${x.getSeconds()}`;
                    default:
                        break;
                }
            }).join(":")
            if (startByTime) {
                return timeConvert + (dateConvert ? ` ${dateConvert}` : '')
            } else {
                return dateConvert + (timeConvert ? ` ${timeConvert}` : '')
            }
        } else {
            return dateConvert;
        }
    }

    dateDefault = new Date("2022-1-1");

    /**
     * action with localStorage
     *  */
    static setStorage = async (listKeyValue: Array<{ key: string, value: string }>) => {
        if (!listKeyValue?.length) return;
        try {
            await AsyncStorage.multiSet(listKeyValue.map((item) => [item.key, typeof item.value === 'object' ? JSON.stringify(item.value) : typeof item.value !== 'string' ? `${item.value}` : item.value]));
        } catch (error) {
            console.error('setStorage failed:', error);
        }
    }

    static getStorage = async (key: string) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.error('getStorage failed:', error);
        }
    }

    static multiGetStorage = async (keys: string[]) => {
        try {
            return await AsyncStorage.multiGet(keys);
        } catch (error) {
            console.error('getStorage failed:', error);
        }
    }

    static clearStorage = async () => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error('setStorage failed:', error);
        }
    }

    static removeStorage = async (keys: string[]) => {
        try {
            await AsyncStorage.multiRemove(keys);
        } catch (error) {
            console.error('getStorage failed:', error);
        }
    }

    static randomString(length: number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    static percentToHex = (p: number) => {
        // const percent = Math.max(0, Math.min(100, p)); // bound percent from 0 to 100
        const intValue = Math.round(p / 100 * 255); // map percent to nearest integer (0 - 255)
        const hexValue = intValue.toString(16) as any; // get hexadecimal representation
        return hexValue.padStart(2, '0').toUpperCase(); // format with leading 0 and upper case characters
    }

    static hexToPercent = (h: string) => {
        const pValue = parseInt(h, 16);
        const percent = Math.round(pValue / 255 * 100);
        return percent;
    }

    static hexToRGB(hex: string) {
        let alpha = false,
            h: any = hex.slice(hex.startsWith('#') ? 1 : 0);
        if (h.length === 3) h = [...h].map(x => x + x).join('');
        else if (h.length === 8) alpha = true;
        h = parseInt(h, 16);
        return (
            'rgb' +
            (alpha ? 'a' : '') +
            '(' +
            (h >>> (alpha ? 24 : 16)) +
            ', ' +
            ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
            ', ' +
            ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
            (alpha ? `, ${h & 0x000000ff} ` : '') +
            ')'
        );
    }

    static colorNameToHex(color: string) {
        let colors: { [p: string]: string } = {
            "aliceblue": "f0f8ff", "antiquewhite": "faebd7", "aqua": "00ffff", "aquamarine": "7fffd4", "azure": "f0ffff",
            "beige": "f5f5dc", "bisque": "ffe4c4", "black": "000000", "blanchedalmond": "ffebcd", "blue": "0000ff", "blueviolet": "8a2be2", "brown": "a52a2a", "burlywood": "deb887",
            "cadetblue": "5f9ea0", "chartreuse": "7fff00", "chocolate": "d2691e", "coral": "ff7f50", "cornflowerblue": "6495ed", "cornsilk": "fff8dc", "crimson": "dc143c", "cyan": "00ffff",
            "darkblue": "00008b", "darkcyan": "008b8b", "darkgoldenrod": "b8860b", "darkgray": "a9a9a9", "darkgreen": "006400", "darkkhaki": "bdb76b", "darkmagenta": "8b008b", "darkolivegreen": "556b2f",
            "darkorange": "ff8c00", "darkorchid": "9932cc", "darkred": "8b0000", "darksalmon": "e9967a", "darkseagreen": "8fbc8f", "darkslateblue": "483d8b", "darkslategray": "2f4f4f", "darkturquoise": "00ced1",
            "darkviolet": "9400d3", "deeppink": "ff1493", "deepskyblue": "00bfff", "dimgray": "696969", "dodgerblue": "1e90ff",
            "firebrick": "b22222", "floralwhite": "fffaf0", "forestgreen": "228b22", "fuchsia": "ff00ff",
            "gainsboro": "dcdcdc", "ghostwhite": "f8f8ff", "gold": "ffd700", "goldenrod": "daa520", "gray": "808080", "green": "008000", "greenyellow": "adff2f",
            "honeydew": "f0fff0", "hotpink": "ff69b4",
            "indianred ": "cd5c5c", "indigo": "4b0082", "ivory": "fffff0", "khaki": "f0e68c",
            "lavender": "e6e6fa", "lavenderblush": "fff0f5", "lawngreen": "7cfc00", "lemonchiffon": "fffacd", "lightblue": "add8e6", "lightcoral": "f08080", "lightcyan": "e0ffff", "lightgoldenrodyellow": "fafad2",
            "lightgrey": "d3d3d3", "lightgreen": "90ee90", "lightpink": "ffb6c1", "lightsalmon": "ffa07a", "lightseagreen": "20b2aa", "lightskyblue": "87cefa", "lightslategray": "778899", "lightsteelblue": "b0c4de",
            "lightyellow": "ffffe0", "lime": "00ff00", "limegreen": "32cd32", "linen": "faf0e6",
            "magenta": "ff00ff", "maroon": "800000", "mediumaquamarine": "66cdaa", "mediumblue": "0000cd", "mediumorchid": "ba55d3", "mediumpurple": "9370d8", "mediumseagreen": "3cb371", "mediumslateblue": "7b68ee",
            "mediumspringgreen": "00fa9a", "mediumturquoise": "48d1cc", "mediumvioletred": "c71585", "midnightblue": "191970", "mintcream": "f5fffa", "mistyrose": "ffe4e1", "moccasin": "ffe4b5",
            "navajowhite": "ffdead", "navy": "000080",
            "oldlace": "fdf5e6", "olive": "808000", "olivedrab": "6b8e23", "orange": "ffa500", "orangered": "ff4500", "orchid": "da70d6",
            "palegoldenrod": "eee8aa", "palegreen": "98fb98", "paleturquoise": "afeeee", "palevioletred": "d87093", "papayawhip": "ffefd5", "peachpu": "ffdab9", "peru": "cd853f", "pink": "ffc0cb", "plum": "dda0dd", "powderblue": "b0e0e6", "purple": "800080",
            "rebeccapurple": "663399", "red": "ff0000", "rosybrown": "bc8f8f", "royalblue": "4169e1",
            "saddlebrown": "8b4513", "salmon": "fa8072", "sandybrown": "f4a460", "seagreen": "2e8b57", "seashell": "fff5ee", "sienna": "a0522d", "silver": "c0c0c0", "skyblue": "87ceeb", "slateblue": "6a5acd", "slategray": "708090", "snow": "fffafa", "springgreen": "00ff7f", "steelblue": "4682b4",
            "tan": "d2b48c", "teal": "008080", "thistle": "d8bfd8", "tomato": "ff6347", "turquoise": "40e0d0",
            "violet": "ee82ee",
            "wheat": "f5deb3", "white": "ffffff", "whitesmoke": "f5f5f5",
            "yellow": "ffff00", "yellowgreen": "9acd32"
        };

        return colors[color.toLowerCase()];
    }

    static prettyJsonToString(data: { [p: string]: any }) {
        return JSON.stringify(data, null, 6).replace(/\n( *)/g, function (_, p1) {
            return '<br>' + '&nbsp;'.repeat(p1.length);
        });
    }

    static syntaxHighlight(json: { [p: string]: any }) {
        let _json = JSON.stringify(json, null, 6);

        return _json.replace(/\n( *)/g, function (match, p1) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            }
            else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<br>' + '&nbsp;'.repeat(p1.length) + '<span className="' + cls + '">' + match + '</span>';
        });
    }

    static generateRandomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    static generateLightColorRgb() {
        return 'rgb(' + (Math.floor((256 - 229) * Math.random()) + 230) + ',' +
            (Math.floor((256 - 229) * Math.random()) + 230) + ',' +
            (Math.floor((256 - 229) * Math.random()) + 230) + ')';
    }

    static generateDarkColorRgb(id?: number | string) {
        if (!id || typeof id === "number") {
            const safeNum = Math.abs(Number(id ?? Math.random())) || 0;

            const hue = safeNum % 360;
            const saturation = 80;
            const lightness = 25;

            return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        } else {
            // Normalize: remove dashes if present

            let hash = 0;

            for (let i = 0; i < id.length; i++) {
                hash = id.charCodeAt(i) + ((hash << 5) - hash);
                hash = hash & hash; // Convert to 32bit integer
            }

            const hue = Math.abs(hash) % 360;
            const saturation = 80;
            const lightness = 25;

            return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        }
    }

    static toSlug(input: string) {
        return input.toString().toLowerCase()
            .replace(/đ/g, 'd')
            .replace(/[í|ì|ỉ|ĩ|ị]/g, 'i')
            .replace(/[ý|ỳ|ỷ|ỹ|ỵ]/g, 'y')
            .replace(/[á|à|ả|ã|ạ|â|ă|ấ|ầ|ẩ|ẫ|ậ|ắ|ằ|ẳ|ẵ|ặ]/g, 'a')
            .replace(/[é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ]/g, 'e')
            .replace(/[ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự]/g, 'u')
            .replace(/[ó|ò|ỏ|õ|ọ|ô|ơ|ố|ồ|ổ|ỗ|ộ|ớ|ờ|ở|ỡ|ợ]/g, 'o')
            .replace(/\s+/g, ' ')
            .replace(/({|}|\(|\)|<|>)/g, "")
            .replace(/ /g, "-");
    }

    static convertToKebabCase = (str: string) => {
        return str
            .replace(/([a-z])([A-Z])/g, '$1-$2') // Insert hyphen between lowercase and uppercase letters
            .toLowerCase()                       // Convert entire string to lowercase
            .replace(/[ _]/g, '-');              // Replace spaces or underscores with hyphens
    };

    static kebabToCamelCase = (str: string) => {
        const parts = str.split('-');
        return parts[0] + parts.slice(1).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
    }

    static timeSince = (dateCreate: number) => {
        const now = new Date(); // Thời điểm hiện tại
        const createdDate = new Date(dateCreate); // Chuyển dateCreate thành Date object
        const seconds = differenceInSeconds(now, createdDate); // Chênh lệch thời gian (giây)

        // Định nghĩa các khoảng thời gian
        const intervals = [
            { label: "năm", seconds: 31536000 }, // 365 ngày
            { label: "tháng", seconds: 2592000 }, // 30 ngày
            { label: "ngày", seconds: 86400 },
            { label: "giờ", seconds: 3600 },
            { label: "phút", seconds: 60 },
            { label: "giây", seconds: 1 },
        ];

        // Tìm khoảng thời gian phù hợp
        for (const interval of intervals) {
            const count = Math.floor(seconds / interval.seconds);
            if (count >= 1) {
                return `${count} ${interval.label}${count > 1 ? "" : ""} trước`;
            }
        }

        return "vừa xong"; // Nếu nhỏ hơn 1 giây
    }

    static extractHashtags = (content: string) => {
        // Biểu thức chính quy để tìm hashtag
        const hashtagRegex = /#[^\s#<]+/g;

        // Tìm tất cả hashtag trong nội dung
        const hashtags = content.match(hashtagRegex);

        // Trả về danh sách hashtag (hoặc mảng rỗng nếu không có)
        return hashtags || [];
    }

    static getRandomGradient(seed: string) {
        // Sử dụng seed để tạo giá trị ngẫu nhiên cố định
        const seedRandom = (s: any) => {
            let h = 0;
            for (let i = 0; i < s.length; i++) h = Math.imul(31, h) + s.charCodeAt(i) | 0;
            return (h % 0xFFFFFFFF) / 0xFFFFFFFF;
        };

        // Hàm chuyển HSL sang RGB
        const hslToRgb = (h: number, s: number, l: number) => {
            h = h % 360;
            s = s / 100;
            l = l / 100;
            let r, g, b;

            if (s === 0) {
                r = g = b = l; // Grayscale
            } else {
                const hue2rgb = (p: number, q: number, t: number) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                r = hue2rgb(p, q, h / 360 + 1 / 3);
                g = hue2rgb(p, q, h / 360);
                b = hue2rgb(p, q, h / 360 - 1 / 3);
            }

            return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
        };

        // Tạo giá trị ngẫu nhiên từ seed
        const random1 = seedRandom(seed.toString());
        const random2 = seedRandom(seed.toString() + 'offset');

        // Tạo hai màu sáng trong không gian HSL
        // Hue: 0-360, Saturation: 70-100% (màu rực rỡ), Lightness: 80-90% (rất sáng)
        const hue1 = random1 * 360; // Hue ngẫu nhiên
        const hue2 = random2 * 360; // Hue khác cho color2
        const saturation = 70 + random1 * 30; // Saturation từ 70% đến 100%
        const lightness = 80 + random1 * 10; // Lightness từ 80% đến 90%

        const color1 = hslToRgb(hue1, saturation, lightness);
        const color2 = hslToRgb(hue2, saturation, lightness);

        return `linear-gradient(90deg, ${color1}, ${color2})`;
    }

    static to_vietnamese(number: number | string) {
        const defaultNumbers = ' hai ba bốn năm sáu bảy tám chín';
        const chuHangDonVi = ('1 một' + defaultNumbers).split(' ');
        const chuHangChuc = ('lẻ mười' + defaultNumbers).split(' ');
        const chuHangTram = ('không một' + defaultNumbers).split(' ');
        function convert_block_three(number: any) {
            if (number == '000') return '';
            var _a: any = number + ''; //Convert biến 'number' thành kiểu string

            //Kiểm tra độ dài của khối
            switch (_a.length) {
                case 0: return '';
                case 1: return chuHangDonVi[_a];
                case 2: return convert_block_two(_a);
                case 3:
                    var chuc_dv = '';
                    if (_a.slice(1, 3) != '00') {
                        chuc_dv = convert_block_two(_a.slice(1, 3));
                    }
                    var tram = chuHangTram[_a[0]] + ' trăm';
                    return tram + ' ' + chuc_dv;
            }
        }

        function convert_block_two(number: any) {
            var dv = chuHangDonVi[number[1]];
            var chuc = chuHangChuc[number[0]];
            var append = '';

            // Nếu chữ số hàng đơn vị là 5
            if (number[0] > 0 && number[1] == 5) {
                dv = 'lăm'
            }

            // Nếu số hàng chục lớn hơn 1
            if (number[0] > 1) {
                append = ' mươi';

                if (number[1] == 1) {
                    dv = ' mốt';
                }
            }

            return chuc + '' + append + ' ' + dv;
        }
        const dvBlock = '1 nghìn triệu tỷ'.split(' ');
        var str = parseInt(`${number}`) + '';
        var i = 0;
        var arr = [];
        var index = str.length;
        var result = [];
        var rsString = '';

        if (index == 0 || str == 'NaN') {
            return '';
        }

        // Chia chuỗi số thành một mảng từng khối có 3 chữ số
        while (index >= 0) {
            arr.push(str.substring(index, Math.max(index - 3, 0)));
            index -= 3;
        }

        // Lặp từng khối trong mảng trên và convert từng khối đấy ra chữ Việt Nam
        for (i = arr.length - 1; i >= 0; i--) {
            if (arr[i] != '' && arr[i] != '000') {
                result.push(convert_block_three(arr[i]));

                // Thêm đuôi của mỗi khối
                if (dvBlock[i]) {
                    result.push(dvBlock[i]);
                }
            }
        }

        // Join mảng kết quả lại thành chuỗi string
        rsString = result.join(' ');

        // Trả về kết quả kèm xóa những ký tự thừa
        const value = rsString.replace(/[0-9]/g, '').replace(/ /g, ' ').replace(/ $/, '');
        return value[0].toUpperCase() + value.slice(1);
    }

    /** start from 1: Ex: 1=A, 2=B, 3=C, ... */
    static numberToAlphabet(n?: number) {
        if (!n || n <= 0) return '';
        let result = '';
        while (n > 0) {
            n--; // Convert to 0-based index
            const char = String.fromCharCode(65 + (n % 26));
            result = char + result;
            n = Math.floor(n / 26);
        }
        return result;
    }
}

export function formatNumberConvert(num: number) {
    if (num >= 1e9) {
        return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1e6) {
        return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1e3) {
        return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
}

export function inputMoneyPattern(ev: any) {
    let num = ev.target.value.replaceAll(",", "").length % 3;
    if (num > 0) {
        let newV = ev.target.value.replaceAll(",", "").substring(num).split("");
        ev.target.value = ev.target.value.replaceAll(",", "").substring(0, num) + newV.map((v: string, i: number) => i % 3 === 0 ? `, ${v} ` : v).join("");
    } else {
        let newV = ev.target.value.replaceAll(",", "").split("");
        ev.target.value = newV.map((v: string, i: number) => i > 0 && i % 3 === 0 ? `, ${v} ` : v).join("");
    }
}

export const randomGID = () => uuid.v4().replace(/-/g, '');