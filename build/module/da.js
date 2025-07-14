"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColDataType = exports.DesignTokenType = exports.ActionType = exports.TriggerType = exports.ValidateType = exports.FEDataType = exports.ComponentType = void 0;
var ComponentType;
(function (ComponentType) {
    ComponentType["text"] = "Text";
    ComponentType["img"] = "Image";
    ComponentType["icon"] = "Icon";
    ComponentType["checkbox"] = "Checkbox";
    ComponentType["switch"] = "Switch";
    ComponentType["textField"] = "Textfield";
    ComponentType["button"] = "Button";
    ComponentType["calendar"] = "Calendar";
    ComponentType["datePicker"] = "DatePicker";
    ComponentType["radio"] = "Radio";
    ComponentType["select1"] = "Select1";
    ComponentType["selectMultiple"] = "SelectMultiple";
    ComponentType["textArea"] = "Textarea";
    ComponentType["table"] = "Table";
    ComponentType["dateTimePicker"] = "DateTimePicker";
    ComponentType["navLink"] = "Navlink";
    ComponentType["rate"] = "Rate";
    ComponentType["progressBar"] = "ProgressBar";
    ComponentType["progressCircle"] = "ProgressCircle";
    ComponentType["upload"] = "Upload";
    ComponentType["numberPicker"] = "NumberPicker";
    ComponentType["importMultipleFile"] = "ImportMultiple";
    ComponentType["ckEditor"] = "CkEditor";
    ComponentType["range"] = "Range";
    ComponentType["container"] = "Container";
    ComponentType["chart"] = "Chart";
    ComponentType["form"] = "Form";
    ComponentType["card"] = "Card";
    ComponentType["view"] = "View";
    ComponentType["report"] = "Report";
    ComponentType["popup"] = "Popup";
    ComponentType["colorPicker"] = "ColorPicker";
    ComponentType["emoji"] = "Emoji";
    ComponentType["winiEditor"] = "WiniEditor";
    ComponentType["none"] = "none";
})(ComponentType || (exports.ComponentType = ComponentType = {}));
var FEDataType;
(function (FEDataType) {
    FEDataType["GID"] = "GID";
    FEDataType["STRING"] = "STRING";
    FEDataType["NUMBER"] = "NUMBER";
    FEDataType["BOOLEAN"] = "BOOLEAN";
    FEDataType["DATE"] = "DATE";
    FEDataType["DATETIME"] = "DATETIME";
    FEDataType["MONEY"] = "MONEY";
    FEDataType["PASSWORD"] = "PASSWORD";
    FEDataType["LIST"] = "LIST";
    FEDataType["HTML"] = "HTML";
    FEDataType["FILE"] = "FILE";
})(FEDataType || (exports.FEDataType = FEDataType = {}));
var ValidateType;
(function (ValidateType) {
    ValidateType[ValidateType["required"] = 1] = "required";
    ValidateType[ValidateType["email"] = 2] = "email";
    ValidateType[ValidateType["minLength"] = 3] = "minLength";
    ValidateType[ValidateType["maxLength"] = 4] = "maxLength";
    ValidateType[ValidateType["number"] = 5] = "number";
    ValidateType[ValidateType["phone"] = 6] = "phone";
    // date = 7,
    // dateTime = 8,
    // earliestDate = 9,
    // latestDate = 10,
    // earliestTime = 11,
    // latestTime = 12,
    ValidateType[ValidateType["equality"] = 13] = "equality";
    ValidateType[ValidateType["greaterThan"] = 14] = "greaterThan";
    ValidateType[ValidateType["greaterThanOrEqualTo"] = 15] = "greaterThanOrEqualTo";
    ValidateType[ValidateType["lessThanOrEqualTo"] = 16] = "lessThanOrEqualTo";
    ValidateType[ValidateType["lessThan"] = 17] = "lessThan";
    ValidateType[ValidateType["odd"] = 18] = "odd";
    ValidateType[ValidateType["even"] = 19] = "even";
    ValidateType[ValidateType["async"] = 20] = "async";
})(ValidateType || (exports.ValidateType = ValidateType = {}));
var TriggerType;
(function (TriggerType) {
    TriggerType["click"] = "click";
    TriggerType["dbclick"] = "dbclick";
    TriggerType["hover"] = "hover";
    TriggerType["keydown"] = "keydown";
    TriggerType["mouseenter"] = "mouseenter";
    TriggerType["mouseleave"] = "mouseleave";
    TriggerType["mousedown"] = "mousedown";
    TriggerType["mouseup"] = "mouseup";
    TriggerType["scrollend"] = "scrollend";
})(TriggerType || (exports.TriggerType = TriggerType = {}));
var ActionType;
(function (ActionType) {
    ActionType["navigate"] = "navigate";
    ActionType["reload"] = "reload";
    ActionType["back"] = "back";
    ActionType["scrollTo"] = "scrollTo";
    ActionType["showPopup"] = "showPopup";
    ActionType["toastMessage"] = "toastMessage";
    ActionType["closePopup"] = "closePopup";
    ActionType["mousedown"] = "mousedown";
    ActionType["mouseup"] = "mouseup";
    ActionType["submit"] = "submit";
    ActionType["setValue"] = "setValue";
    ActionType["loadMore"] = "loadMore";
})(ActionType || (exports.ActionType = ActionType = {}));
var DesignTokenType;
(function (DesignTokenType) {
    DesignTokenType["group"] = "group";
    DesignTokenType["color"] = "color";
    DesignTokenType["font"] = "font";
    DesignTokenType["border"] = "border";
    DesignTokenType["boxShadow"] = "box-shadow";
    DesignTokenType["custom"] = "custom";
})(DesignTokenType || (exports.DesignTokenType = DesignTokenType = {}));
var ColDataType;
(function (ColDataType) {
    ColDataType["text"] = "text";
    ColDataType["label"] = "label";
    ColDataType["datetime"] = "datetime";
    ColDataType["money"] = "money";
    ColDataType["website"] = "website";
    ColDataType["formula"] = "formula";
    ColDataType["people"] = "people";
    ColDataType["files"] = "files";
    ColDataType["progress"] = "progress";
    ColDataType["rate"] = "rate";
})(ColDataType || (exports.ColDataType = ColDataType = {}));
