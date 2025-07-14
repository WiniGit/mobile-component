export declare enum ComponentType {
    text = "Text",
    img = "Image",
    icon = "Icon",
    checkbox = "Checkbox",
    switch = "Switch",
    textField = "Textfield",
    button = "Button",
    calendar = "Calendar",
    datePicker = "DatePicker",
    radio = "Radio",
    select1 = "Select1",
    selectMultiple = "SelectMultiple",
    textArea = "Textarea",
    table = "Table",
    dateTimePicker = "DateTimePicker",
    navLink = "Navlink",
    rate = "Rate",
    progressBar = "ProgressBar",
    progressCircle = "ProgressCircle",
    upload = "Upload",
    numberPicker = "NumberPicker",
    importMultipleFile = "ImportMultiple",
    ckEditor = "CkEditor",
    range = "Range",
    container = "Container",
    chart = "Chart",
    form = "Form",
    card = "Card",
    view = "View",
    report = "Report",
    popup = "Popup",
    colorPicker = "ColorPicker",
    emoji = "Emoji",
    winiEditor = "WiniEditor",
    none = "none"
}
export declare enum FEDataType {
    GID = "GID",
    STRING = "STRING",
    NUMBER = "NUMBER",
    BOOLEAN = "BOOLEAN",
    DATE = "DATE",
    DATETIME = "DATETIME",
    MONEY = "MONEY",
    PASSWORD = "PASSWORD",
    LIST = "LIST",
    HTML = "HTML",
    FILE = "FILE"
}
export declare enum ValidateType {
    required = 1,
    email = 2,
    minLength = 3,
    maxLength = 4,
    number = 5,
    phone = 6,
    equality = 13,
    greaterThan = 14,
    greaterThanOrEqualTo = 15,
    lessThanOrEqualTo = 16,
    lessThan = 17,
    odd = 18,
    even = 19,
    async = 20
}
export declare enum TriggerType {
    click = "click",
    dbclick = "dbclick",
    hover = "hover",
    keydown = "keydown",
    mouseenter = "mouseenter",
    mouseleave = "mouseleave",
    mousedown = "mousedown",
    mouseup = "mouseup",
    scrollend = "scrollend"
}
export declare enum ActionType {
    navigate = "navigate",
    reload = "reload",
    back = "back",
    scrollTo = "scrollTo",
    showPopup = "showPopup",
    toastMessage = "toastMessage",
    closePopup = "closePopup",
    mousedown = "mousedown",
    mouseup = "mouseup",
    submit = "submit",
    setValue = "setValue",
    loadMore = "loadMore"
}
export interface ProjectItem {
    Id: string;
    Name: string;
    CustomerId: string;
    DateCreated: number;
    Description: string;
    LogoId: string;
    Sort?: number;
    Domain: string;
    Sologan?: string;
}
export declare enum DesignTokenType {
    group = "group",
    color = "color",
    font = "font",
    border = "border",
    boxShadow = "box-shadow",
    custom = "custom"
}
export declare enum ColDataType {
    text = "text",
    label = "label",
    datetime = "datetime",
    money = "money",
    website = "website",
    formula = "formula",
    people = "people",
    files = "files",
    progress = "progress",
    rate = "rate"
}
