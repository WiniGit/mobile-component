import { TextStyle } from "react-native"

export interface TypoProps {
    // regular
    regular0: TextStyle,
    regular1: TextStyle,
    regular2: TextStyle,
    regular3: TextStyle,
    regular4: TextStyle,
    regular5: TextStyle,
    regular6: TextStyle,
    regular7: TextStyle,
    regular8: TextStyle,
    regular9: TextStyle,
    // semibold
    semibold1: TextStyle,
    semibold2: TextStyle,
    semibold3: TextStyle,
    semibold4: TextStyle,
    semibold5: TextStyle,
    semibold6: TextStyle,
    semibold7: TextStyle,
    semibold8: TextStyle,
    semibold9: TextStyle,
    // medium
    medium1: TextStyle,
    medium2: TextStyle,
    medium3: TextStyle,
    medium4: TextStyle,
    medium5: TextStyle,
    medium6: TextStyle,
    medium7: TextStyle,
    medium8: TextStyle,
    medium9: TextStyle,
    // heading
    "heading-1": TextStyle,
    "heading-2": TextStyle,
    "heading-3": TextStyle,
    "heading-4": TextStyle,
    "heading-5": TextStyle,
    "heading-6": TextStyle,
    "heading-7": TextStyle,
    "heading-8": TextStyle,
    "heading-9": TextStyle,
    // label
    "label-1": TextStyle,
    "label-2": TextStyle,
    "label-3": TextStyle,
    "label-4": TextStyle,
    "label-5": TextStyle,
    // body
    "body-1": TextStyle,
    "body-2": TextStyle,
    "body-3": TextStyle,
    // highlight
    "highlight-1": TextStyle,
    "highlight-2": TextStyle,
    "highlight-3": TextStyle,
    "highlight-4": TextStyle,
    "highlight-5": TextStyle,
    "highlight-6": TextStyle,
    // subtitle
    "subtitle-1": TextStyle,
    "subtitle-2": TextStyle,
    "subtitle-3": TextStyle,
    "subtitle-4": TextStyle,
    "subtitle-5": TextStyle,
    // placeholder
    "placeholder-1": TextStyle,
    "placeholder-2": TextStyle,
    // button-text
    "button-text-1": TextStyle,
    "button-text-2": TextStyle,
    "button-text-3": TextStyle,
    "button-text-4": TextStyle,
    "button-text-5": TextStyle,
    "button-text-6": TextStyle,
    // other
    [key: string]: TextStyle
}

const typography: TypoProps = {
    // regular
    regular0: {
        lineHeight: 14,
        fontSize: 10
    },
    regular1: {
        lineHeight: 16,
        fontSize: 12
    },
    regular2: {
        lineHeight: 22,
        fontSize: 14
    },
    regular3: {
        lineHeight: 24,
        fontSize: 16
    },
    regular4: {
        lineHeight: 28,
        fontSize: 20
    },
    regular5: {
        lineHeight: 32,
        fontSize: 24
    },
    regular6: {
        lineHeight: 38,
        fontSize: 30
    },
    regular7: {
        lineHeight: 46,
        fontSize: 38
    },
    regular8: {
        lineHeight: 56,
        fontSize: 46
    },
    regular9: {
        lineHeight: 68,
        fontSize: 56
    },
    // semibold
    semibold1: {
        lineHeight: 20,
        fontSize: 12,
        fontWeight: "600"
    },
    semibold2: {
        lineHeight: 22,
        fontSize: 14,
        fontWeight: "600"
    },
    semibold3: {
        lineHeight: 24,
        fontSize: 16,
        fontWeight: "600"
    },
    semibold4: {
        lineHeight: 28,
        fontSize: 20,
        fontWeight: "600"
    },
    semibold5: {
        lineHeight: 32,
        fontSize: 24,
        fontWeight: "600"
    },
    semibold6: {
        lineHeight: 38,
        fontSize: 30,
        fontWeight: "600"
    },
    semibold7: {
        lineHeight: 46,
        fontSize: 38,
        fontWeight: "600"
    },
    semibold8: {
        lineHeight: 56,
        fontSize: 46,
        fontWeight: "600"
    },
    semibold9: {
        lineHeight: 68,
        fontSize: 56,
        fontWeight: "600"
    },
    // medium
    medium1: {
        lineHeight: 16,
        fontSize: 12,
        fontWeight: "500"
    },
    medium2: {
        lineHeight: 22,
        fontSize: 14,
        fontWeight: "500"
    },
    medium3: {
        lineHeight: 24,
        fontSize: 16,
        fontWeight: "500"
    },
    medium4: {
        lineHeight: 28,
        fontSize: 20,
        fontWeight: "500"
    },
    medium5: {
        lineHeight: 32,
        fontSize: 24,
        fontWeight: "500"
    },
    medium6: {
        lineHeight: 38,
        fontSize: 30,
        fontWeight: "500"
    },
    medium7: {
        lineHeight: 46,
        fontSize: 38,
        fontWeight: "500"
    },
    medium8: {
        lineHeight: 56,
        fontSize: 46,
        fontWeight: "500"
    },
    medium9: {
        lineHeight: 68,
        fontSize: 56,
        fontWeight: "500"
    },
    // heading
    "heading-1": {
        lineHeight: 68,
        fontSize: 56,
        fontWeight: "600"
    },
    "heading-2": {
        lineHeight: 56,
        fontSize: 46,
        fontWeight: "500"
    },
    "heading-3": {
        lineHeight: 46,
        fontSize: 38,
        fontWeight: "500"
    },
    "heading-4": {
        lineHeight: 38,
        fontSize: 30,
        fontWeight: "500"
    },
    "heading-5": {
        lineHeight: 32,
        fontSize: 24,
        fontWeight: "500"
    },
    "heading-6": {
        lineHeight: 28,
        fontSize: 20,
        fontWeight: "500"
    },
    "heading-7": {
        lineHeight: 24,
        fontSize: 16,
        fontWeight: "500"
    },
    "heading-8": {
        lineHeight: 22,
        fontSize: 14,
        fontWeight: "500"
    },
    "heading-9": {
        lineHeight: 16,
        fontSize: 12,
        fontWeight: "500"
    },
    // label
    "label-1": {
        lineHeight: 24,
        fontSize: 16,
        fontWeight: "500"
    },
    "label-2": {
        lineHeight: 24,
        fontSize: 16
    },
    "label-3": {
        lineHeight: 22,
        fontSize: 14,
        fontWeight: "500"
    },
    "label-4": {
        lineHeight: 22,
        fontSize: 14
    },
    "label-5": {
        lineHeight: 16,
        fontSize: 12
    },
    // body
    "body-1": {
        lineHeight: 28,
        fontSize: 20
    },
    "body-2": {
        lineHeight: 24,
        fontSize: 16
    },
    "body-3": {
        lineHeight: 22,
        fontSize: 14
    },
    // highlight
    "highlight-1": {
        lineHeight: 68,
        fontSize: 56,
        fontWeight: "700"
    },
    "highlight-2": {
        lineHeight: 56,
        fontSize: 46,
        fontWeight: "700"
    },
    "highlight-3": {
        lineHeight: 46,
        fontSize: 38,
        fontWeight: "700"
    },
    "highlight-4": {
        lineHeight: 38,
        fontSize: 30,
        fontWeight: "700"
    },
    "highlight-5": {
        lineHeight: 32,
        fontSize: 24,
        fontWeight: "700"
    },
    "highlight-6": {
        lineHeight: 28,
        fontSize: 20,
        fontWeight: "700"
    },
    // subtitle
    "subtitle-1": {
        lineHeight: 28,
        fontSize: 20
    },
    "subtitle-2": {
        lineHeight: 24,
        fontSize: 16
    },
    "subtitle-3": {
        lineHeight: 22,
        fontSize: 14
    },
    "subtitle-4": {
        lineHeight: 16,
        fontSize: 12
    },
    "subtitle-5": {
        lineHeight: 14,
        fontSize: 10
    },
    // placeholder
    "placeholder-1": {
        lineHeight: 24,
        fontSize: 16
    },
    "placeholder-2": {
        lineHeight: 22,
        fontSize: 14
    },
    // button-text
    "button-text-1": {
        lineHeight: 24,
        fontSize: 16,
        fontWeight: "600"
    },
    "button-text-2": {
        lineHeight: 24,
        fontSize: 16,
        fontWeight: "500"
    },
    "button-text-3": {
        lineHeight: 22,
        fontSize: 14,
        fontWeight: "500"
    },
    "button-text-4": {
        lineHeight: 22,
        fontSize: 14
    },
    "button-text-5": {
        lineHeight: 16,
        fontSize: 12,
        fontWeight: "500"
    },
    "button-text-6": {
        lineHeight: 16,
        fontSize: 12
    },
}

export { typography }