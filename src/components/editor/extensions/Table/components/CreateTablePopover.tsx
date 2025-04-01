import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui';

const TABLE_INIT_GRID_SIZE = 10; // Initial size set to 10x10
const TABLE_MAX_GRID_SIZE = 20; // Maximum size limit

const createArray = (length: number) => Array.from({ length }).map((_, index) => index + 1);

interface IPropsCreateTablePopover {
  createTable: (payload: CreateTablePayload) => void;
  children: React.ReactNode;
}

export interface GridSize {
  rows: number;
  cols: number;
}

export interface CreateTablePayload extends GridSize {
  withHeaderRow: boolean;
}

function CreateTablePopover(props: IPropsCreateTablePopover) {
  const [withHeaderRow, setWithHeaderRow] = useState<boolean>(true);
  const [tableGridSize, setTableGridSize] = useState<GridSize>({
    rows: TABLE_INIT_GRID_SIZE,
    cols: TABLE_INIT_GRID_SIZE,
  });
  const [selectedTableGridSize, setSelectedTableGridSize] = useState<GridSize>({
    rows: 1, // Start with 1x1 selected
    cols: 1,
  });
  const [isOpen, setIsOpen] = useState(false); // Track popover open state

  // Reset grid when popover closes
  useEffect(() => {
    if (!isOpen) {
      resetTableGridSize();
    }
  }, [isOpen]);

  function selectTableGridSize(rows: number, cols: number): void {
    // Expand or shrink rows
    setTableGridSize((prev) => ({
      rows: Math.max(TABLE_INIT_GRID_SIZE, Math.min(rows + 1, TABLE_MAX_GRID_SIZE)),
      cols: prev.cols,
    }));

    // Expand or shrink columns
    setTableGridSize((prev) => ({
      rows: prev.rows,
      cols: Math.max(TABLE_INIT_GRID_SIZE, Math.min(cols + 1, TABLE_MAX_GRID_SIZE)),
    }));

    setSelectedTableGridSize({
      rows,
      cols,
    });
  }

  function onMouseDown(rows: number, cols: number) {
    props?.createTable({ rows, cols, withHeaderRow });
    setIsOpen(false); // Close popover on selection
  }

  function resetTableGridSize(): void {
    setWithHeaderRow(true);
    setTableGridSize({
      rows: TABLE_INIT_GRID_SIZE,
      cols: TABLE_INIT_GRID_SIZE,
    });
    setSelectedTableGridSize({
      rows: 1,
      cols: 1,
    });
  }

  return (
    <Popover modal open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {props?.children}
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-full !p-2"
        side="bottom"
      >
        <div className="table-grid-size-editor p-0">
          <div className="flex flex-col flex-wrap justify-between gap-1">
            {createArray(tableGridSize.rows).map((row) => (
              <div className="flex gap-1" key={`r-${row}`}>
                {createArray(tableGridSize.cols).map((col) => (
                  <div
                    key={`c-${col}`}
                    onMouseDown={() => onMouseDown(row, col)}
                    onMouseOver={() => selectTableGridSize(row, col)}
                    className={`cursor-pointer border-border ${
                      col <= selectedTableGridSize.cols &&
                      row <= selectedTableGridSize.rows
                        ? 'tableCellActive !bg-primary/10'
                        : ''
                    }`}
                  >
                    <div className="box-border size-4 rounded-[2px] !border border-solid !border-border p-1"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-2 text-center text-sm text-zinc-600">
            {selectedTableGridSize.rows} x {selectedTableGridSize.cols}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default CreateTablePopover;