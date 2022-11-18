import { debounce } from "lodash";
import { useMemo } from "react";

export const useDebounce = (inputFn, delayMs) => {
    return useMemo(() => debounce(inputFn, delayMs), [inputFn, delayMs]);
};
