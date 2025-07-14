import {
    allPass,
    propEq,
    count,
    equals,
    gte,
    __,
    pipe,
    values,
    any,
    filter,
    all,
    complement,
} from "ramda";
/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
    propEq("star", "red"),
    propEq("square", "green"),
    propEq("triangle", "white"),
    propEq("circle", "white"),
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = pipe(values, count(equals("green")), gte(__, 2));

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = pipe(values, (colors) =>
    equals(count(equals("red"), colors), count(equals("blue"), colors))
);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
    propEq("circle", "blue"),
    propEq("star", "red"),
    propEq("square", "orange"),
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = pipe(
    values,
    filter(complement(equals("white"))),
    (colors) => any((color) => count(equals(color), colors) >= 3, colors)
);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
    propEq("triangle", "green"),
    pipe(values, count(equals("green")), equals(2)),
    pipe(values, count(equals("red")), equals(1)),
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = pipe(values, all(equals("orange")));

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([
    complement(propEq("star", "red")),
    complement(propEq("star", "white")),
]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = pipe(values, all(equals("green")));

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([
    ({ triangle, square }) => triangle === square,
    complement(propEq("triangle", "white")),
]);
