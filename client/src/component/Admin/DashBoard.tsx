import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, FormControlLabel, IconButton, Link } from "@mui/material";
import Box from "@mui/material/Box";
import { blue, red } from "@mui/material/colors";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { AdminResponse } from "../../common/types";

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
    width: 270,
    editable: false,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "category_name",
    headerName: "Category Name",
    width: 150,
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
    field: "author_name",
    headerName: "Author Name",
    width: 200,
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
    width: 100,
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
    width: 100,
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

interface PostType {
  posts: AdminResponse[];
}

const Dashboard: React.FC<PostType> = ({ posts }) => {
  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <Box textAlign="right">
        <Button
          style={{
            marginBottom: "10px",
            marginRight: "10px",
          }}
          variant="outlined"
          startIcon={<AddIcon />}
        >
          <Link
            style={{ textDecoration: "none" }}
            color="textPrimary"
            href="/admin/create/"
          >
            Create Post
          </Link>
        </Button>
      </Box>
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
