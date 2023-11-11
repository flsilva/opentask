/*
 * We use [&:not(:disabled)]:hover so it also works with regular <a> tags.
 * If we use "hover:enabled:" instead, it doesn't work with regular <a> tags
 * because they don't have a enabled/disable attribute as <button>s have.
 */

export const buttonCommonClassName =
  'flex items-center justify-center rounded-md text-sm font-medium';

export const buttonGreenClassName = `${buttonCommonClassName} shadow-sm px-3.5 py-2.5 bg-green-600 text-white [&:not(:disabled)]:hover:bg-green-500 disabled:cursor-not-allowed`;

export const buttonRedClassName = `${buttonCommonClassName} shadow-sm px-3.5 py-2.5 border border-red-600 bg-white text-red-600 bg-gray-50 disabled:cursor-not-allowed`;

export const buttonWhiteClassName = `${buttonCommonClassName} shadow-sm px-3.5 py-2.5 border bg-white text-gray-700 [&:not(:disabled)]:hover:bg-gray-50 disabled:cursor-not-allowed`;

export const buttonLinkClassName = `${buttonCommonClassName} text-gray-700 px-0 py-0 hover:enabled:bg-transparent [&:not(:disabled)]:hover:text-green-600 [&:not(:disabled)]:hover:fill-green-600 disabled:cursor-not-allowed`;
