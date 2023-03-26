import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { FormControlLabel, IconButton, Link } from "@mui/material";
import Box from "@mui/material/Box";
import { blue, red } from "@mui/material/colors";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { AdminResponse } from "../../utils/Admin";

const MatEdit = ({ index, d }: { index: number; d: string }) => {
  const handleEditClick = () => {
    // some action
    console.log("edit" + index);
  };
  const handleDeleteClick = () => {
    // some action
    console.log("delte" + index);
  };

  return (
    <FormControlLabel
      control={
        d === "e" ? (
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={handleEditClick}
          >
            <Link color="textPrimary" href={"/admin/edit/" + index}>
              <EditIcon style={{ color: blue[500] }} />
            </Link>
          </IconButton>
        ) : (
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={handleDeleteClick}
          >
            <Link color="textPrimary" href={"/admin/delete/" + index}>
              <DeleteIcon style={{ color: red[500] }} />
            </Link>
          </IconButton>
        )
      }
      label={undefined}
    />
  );
};

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 80,
    editable: false,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "title",
    headerName: "Title",
    width: 300,
    editable: false,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "category",
    headerName: "Category",
    width: 100,
    editable: false,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    editable: false,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "author",
    headerName: "Author",
    width: 100,
    editable: false,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "edit",
    headerName: "Edit",
    editable: false,
    disableColumnMenu: true,
    sortable: false,
    width: 70,
    renderCell: (params) => {
      return (
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ cursor: "pointer" }}
        >
          <MatEdit index={params.row.id} d="e" />
        </div>
      );
    },
  },
  {
    field: "delete",
    headerName: "Delete",
    editable: false,
    disableColumnMenu: true,
    sortable: false,
    width: 50,
    renderCell: (params) => {
      return (
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ cursor: "pointer" }}
        >
          <MatEdit index={params.row.id} d="d" />
        </div>
      );
    },
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  {
    id: 2,
    lastName:
      "Lannister ajflaksdf askjdfkasdl flksjdfkasld faksldf jasldkfja sdfkljasd",
    firstName: "Cersei",
    age: 42,
  },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 67 },
  { id: 6, lastName: "Melisandre", firstName: "hello", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

interface PostType {
  posts: AdminResponse[];
}

const Dashboard: React.FC<PostType> = ({ posts }) => {
  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        autoHeight={true}
        getRowHeight={() => "auto"}
        rows={posts}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default Dashboard;
