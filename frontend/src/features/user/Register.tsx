import React, {useState} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {RegisterMutation} from "../../types";
import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	Link,
	TextField,
	Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectRegisterError} from "./userSlice";
import {googleLogin, register} from "./userThunks";
import {GoogleLogin} from "@react-oauth/google";

const Register = () => {
	const dispatch = useAppDispatch();
	const error = useAppSelector(selectRegisterError);
	const navigate = useNavigate();

	const [state, setState] = useState<RegisterMutation>({
		username: "",
		password: "",
		displayName: "",
	});

	const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = event.target;
		setState((prevState: any) => ({...prevState, [name]: value}));
	};

	const submitFormHandler = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			await dispatch(register(state)).unwrap();
			navigate("/chat");
		} catch (e) {
			// error happened
		}
	};

	const getFieldError = (fieldName: string) => {
		try {
			return error?.errors[fieldName].message;
		} catch {
			return undefined;
		}
	};

	const googleLoginHandler = async (credentials: string) => {
		await dispatch(googleLogin(credentials)).unwrap();
		navigate("/");
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				style={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
					<LockOutlinedIcon/>
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Box sx={{pt: 2}}>
					<GoogleLogin
						onSuccess={(credentialResponse) => {
							if (credentialResponse.credential) {
								void googleLoginHandler(credentialResponse.credential);
							}
						}}
						onError={() => {
							console.log("Login Failed");
						}}
					/>
				</Box>
				<Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								sx={{width: 1}}
								label="Username"
								name="username"
								autoComplete="new-username"
								value={state.username}
								required
								onChange={inputChangeHandler}
								error={Boolean(getFieldError("username"))}
								helperText={getFieldError("username")}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								sx={{width: 1}}
								required
								label="Display Name"
								name="displayName"
								autoComplete="new-displayName"
								value={state.displayName}
								onChange={inputChangeHandler}
								error={Boolean(getFieldError("displayName"))}
								helperText={getFieldError("displayName")}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								sx={{width: 1}}
								required
								name="password"
								label="Password"
								type="password"
								autoComplete="new-password"
								value={state.password}
								onChange={inputChangeHandler}
								error={Boolean(getFieldError("password"))}
								helperText={getFieldError("password")}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{mt: 3, mb: 2}}
					>
						Sign Up
					</Button>

					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link component={RouterLink} to="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default Register;
