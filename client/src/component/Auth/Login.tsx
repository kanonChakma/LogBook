import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Fab } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../feature/auth/authActions";
import { useAppDispatch, useAppSelector } from "../../feature/hook";

export default function Login() {
  const { loading, userCredentials, error } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });
  const [formData, updateFormData] = React.useState(initialFormData);

  React.useEffect(() => {
    if (userCredentials.email) {
      navigate("/");
    }
  }, [navigate, userCredentials]);

  const handleChange = (e: { target: { name: any; value: string } }) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            padding: { md: "40px 30px", xs: "20px" },
            textAlign: "center",
          }}
        >
          <Fab color="secondary" size="small" aria-label="edit">
            <LockOutlinedIcon />
          </Fab>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color="#4B5563">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/register" variant="body2" color="#4B5563">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
    </>
  );
}
