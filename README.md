# Loan Amortization Schedule

## Overview

This is a minimalist loan amortization schedule web app written in React with TypeScript. It is
still a work in progress, but should calculate your monthly payments correctly. If there are any
deviations, they are most likely be caused by the `roundToCent` function which rounds to the
nearest cent. I feel that reflects real world calculations a little better, so I am leaving that
as is. I may add an option later to toggle the rounding and also add currency settings.

## This app uses the following packages

This project was created using React + TypeScript + Vite

- [@emotion/react](<https://emotion.sh/>) - CSS styling
- [@mui/material](https://mui.com/material-ui/) - Theme and UI components
- [react-hook-form](https://react-hook-form.com/) - Light and flexible form library
- [react-router-dom](https://reactrouter.com/) - Client-side routing
- [usehooks-ts](https://usehooks-ts.com/) - React hook library (Provides `useLocalStorage`)
- [immer](https://immerjs.github.io/immer/) - Library that simplifies the process of writing immutable update logic.

## Running

```bash
# At the root of your project run

yarn dev
```
