import { allPass, propEq, count, equals, gte } from "ramda";
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
export const validateFieldN2 = ({ star, square, triangle, circle }) =>
    gte(count(equals("green"), [star, square, triangle, circle]), 2);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = ({ star, square, triangle, circle }) =>
    equals(
        count(equals("red"), [star, square, triangle, circle]),
        count(equals("blue"), [star, square, triangle, circle])
    );

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
    propEq("circle", "blue"),
    propEq("star", "red"),
    propEq("square", "orange"),
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = ({ star, square, triangle, circle }) => {
    const colors = [star, square, triangle, circle].filter(
        (color) => color !== "white"
    );
    return colors.some((color) => count(equals(color), colors) >= 3);
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
    propEq("triangle", "green"),
    (figures) => count(equals("green"), Object.values(figures)) === 2,
    (figures) => count(equals("red"), Object.values(figures)) === 1,
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = ({ star, square, triangle, circle }) =>
    [star, square, triangle, circle].every(equals("orange"));

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([
    (figures) => figures.star !== "red",
    (figures) => figures.star !== "white",
]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = ({ star, square, triangle, circle }) =>
    [star, square, triangle, circle].every(equals("green"));

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([
    ({ triangle, square }) => triangle === square,
    ({ triangle }) => triangle !== "white",
]);
