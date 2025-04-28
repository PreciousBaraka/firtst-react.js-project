import { DataGrid } from "@mui/x-data-grid";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import { useState } from "react";
import Loading from "./Loading";

export default function DataTable({
  columns,
  data = [],
  dataLabel = "Hospital Visits",
  onAddNew = null,
  onSearch = null,
  isLoading = false,
  hideSearch = false,
  placeholder = "",
}) {
  const [search, setSearch] = useState("");
  const handleSearchSubmit = (e) => {
    if (!onSearch) return;
    e.preventDefault();
    onSearch(search);
  };
  return (
    <section className='bg-white p-4 rounded-md shadow-md'>
      <div className='flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 mb-2 '>
        <h2 className='text-lg font-semibold text-cement-200 uppercase my-auto'>
          {dataLabel}
        </h2>
        <div className='flex-1 space-x-2 flex flex-col md:flex-row justify-end'>
          {(!hideSearch || onSearch) && (
            <form
              className='w-2/3 flex items-center space-x-2'
              onSubmit={handleSearchSubmit}>
              <CustomInput
                name='search'
                placeholder={placeholder}
                className='w-full'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <CustomButton
                type='submit'
                title='Search'
                className='col-span-1'
              />
            </form>
          )}
          {onAddNew && (
            <div className="flex justify-end">
              <CustomButton
                title='Add New'
                className="px-2"
                onClick={onAddNew}
              />
            </div>
          )}
        </div>
      </div>
      {isLoading && <Loading isLoading={isLoading} />}
      <div className='bg-white '>
        <DataGrid
          rows={data || []}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          showColumnVerticalBorder
          showCellVerticalBorder
        />
      </div>
    </section>
  );
}
