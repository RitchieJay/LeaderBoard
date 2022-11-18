import { rankItem } from "@tanstack/match-sorter-utils";
import { flexRender } from "@tanstack/react-table";

export const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({ itemRank });
    return itemRank.passed;
};

export const sortFullName = (
    { forename: aForename, surname: aSurname },
    { forename: bForename, surname: bSurname }
) => {
    const a = `${aSurname} ${aForename}`;
    const b = `${bSurname} ${bForename}`;

    if (a === b) {
        return 0;
    }

    return a < b ? -1 : 1;
};

export const renderHeaderValue = (header) =>
    flexRender(header.column.columnDef.header, header.getContext());
export const renderCellValue = (cell) => flexRender(cell.column.columnDef.cell, cell.getContext());
