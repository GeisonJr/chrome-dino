/**
 * Check if the value is an array
 * @version 1.0.0
 * @since 1.0.0
 * @author GeisonJr
 */
export function isArray(value) {
    return Array.isArray(value);
}
/**
 * Check if the value is a boolean
 * @version 1.0.0
 * @since 1.0.0
 * @author GeisonJr
 */
export function isBoolean(value) {
    if (isNullOrUndefined(value))
        return false;
    return false
        || value instanceof Boolean
        || typeof value === 'boolean';
}
/**
 * Check if the value is a false
 * @version 1.0.1
 * @since 1.0.0
 * @author GeisonJr
 */
export function isFalsy(value) {
    if (isNullOrUndefined(value))
        return true;
    else if (isBoolean(value))
        return !value;
    else if (isNumber(value))
        return value === 0;
    else if (isString(value))
        return value === '';
    else if (isArray(value))
        return value.length === 0;
    else if (isObject(value))
        return Object.keys(value).length === 0;
    return false;
}
/**
 * Check if the value is a function
 * @version 1.0.0
 * @since 1.0.0
 * @author GeisonJr
 */
export function isFunction(value) {
    if (isNullOrUndefined(value))
        return false;
    return false
        || value instanceof Function
        || typeof value === 'function';
}
/**
 * Check if the value is a NaN (Not a Number)
 * @version 1.0.0
 * @since 1.0.0
 * @author GeisonJr
 */
export function isNaNumber(value) {
    return Number.isNaN(value);
}
/**
 * Check if the value is a null
 * @version 1.0.0
 * @since 1.0.0
 * @author GeisonJr
 */
export function isNull(value) {
    return false
        || value === null;
}
/**
 * Check if the value is a null or undefined
 * @version 1.0.0
 * @since 1.0.0
 * @author GeisonJr
 */
export function isNullOrUndefined(value) {
    return false
        || isNull(value)
        || isUndefined(value);
}
/**
 * Check if the value is a number
 * @version 1.0.0
 * @since 1.0.0
 * @author GeisonJr
 */
export function isNumber(value) {
    if (isNullOrUndefined(value))
        return false;
    return false
        || value instanceof Number
        || typeof value === 'number';
}
/**
 * Check if the value is an object
 * @version 1.0.0
 * @since 1.0.0
 * @author GeisonJr
 */
export function isObject(value) {
    if (isNullOrUndefined(value))
        return false;
    return false
        || value instanceof Object
        || typeof value === 'object';
}
/**
 * Check if the value is a string
 * @version 1.0.0
 * @since 1.0.0
 * @author GeisonJr
 */
export function isString(value) {
    if (isNullOrUndefined(value))
        return false;
    return false
        || value instanceof String
        || typeof value === 'string';
}
/**
 * Check if the value is a true
 * @version 1.0.1
 * @since 1.0.0
 * @author GeisonJr
 */
export function isTruthy(value) {
    if (isFalsy(value))
        return false;
    return true;
}
/**
 * Check if the value is an undefined
 * @version 1.0.0
 * @since 1.0.0
 * @author GeisonJr
 */
export function isUndefined(value) {
    return false
        || value === undefined
        || typeof value === 'undefined';
}
/**
 * Check if the value is a CanvasRenderingContext2D
 * @version 1.0.0
 * @since 1.0.0
 * @author GeisonJr
 */
export function isCanvasRenderingContext2D(value) {
    if (isNullOrUndefined(value))
        return false;
    return false
        || value instanceof CanvasRenderingContext2D;
}
