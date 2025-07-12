/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import { allPass, test, pipe, tap, andThen, otherwise } from "ramda";
import Api from "../tools/api";
import { round } from "lodash";

const api = new Api();

const isValidLength = (str) => str.length > 2 && str.length < 10;
const isPositive = (str) => Number(str) > 0;
const isNumber = test(/^[0-9]+(\.[0-9]+)?$/);
const validate = allPass([isValidLength, isPositive, isNumber]);

const toNumber = Number;
const toRounded = round;
const toString = String;

const getBinary = (number) =>
    api
        .get("https://api.tech/numbers/base", {
            number: toString(number),
            from: 10,
            to: 2,
        })
        .then((res) => res.result);

const getAnimal = (id) =>
    api.get(`https://animals.tech/${id}`, {}).then((res) => res.result);

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    const log = tap(writeLog);

    if (!validate(value)) {
        handleError("ValidationError");
        return;
    }

    pipe(
        log,
        toNumber,
        toRounded,
        log,
        getBinary,
        andThen(
            pipe(
                log,
                (bin) => bin.length,
                log,
                (len) => Math.pow(len, 2),
                log,
                (sq) => sq % 3,
                log,
                getAnimal,
                andThen(handleSuccess)
            )
        ),
        otherwise(handleError)
    )(value);
};
export default processSequence;
