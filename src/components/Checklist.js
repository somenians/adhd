

import React from "react";
import {Grid, IconButton, Typography, Box, FormGroup, Checkbox, TextField, List, ListItem, styled, Paper, Button} from '@mui/material'
import {ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import { FixedSizeList, VariableSizeList } from "react-window";
import { useState } from "react";
import { RemoveCircle } from "@mui/icons-material";
import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const StyledTextField = styled(TextField)({
	"& label": {
		color: "white",
	},
	"&:hover label": {
		fontWeight: 400,
	},
	"& label.Mui-focused": {
		color: "white",
	},
	"& .MuiInput-underline:after": {
		borderBottomColor: "white",
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "white",
		},
		"&:hover fieldset": {
			borderColor: "white",
			borderWidth: 2,
		},
		"&.Mui-focused fieldset": {
			borderColor: "white",
		},
        "& fieldset": {
            borderColor: "white",
        }
	},
});
const TodoContainer = styled(Paper)(({ theme}) => ({
	width: 400,
	height: 500,
	padding: theme.spacing(2),
	...theme.typography.body2,
	textAlign: "center",
}));

export const Checklist = () => {
    const [inputVal, setInputVal] = useState("");
    const [currentDate, setCurrentDate] = useState((
				new Date().getFullYear() +
					" " +
					new Date().getMonth() +
					" " +
					new Date().getDate()
			));
    const [todos, setTodos] = useState([]);
    // const [currentTodos, setCurrentTodos] = useState([]);

    // setCurrentDate(
	// 	(new Date().getFullYear() +
	// 		" " +
	// 		new Date().getMonth() +
	// 		" " +
	// 		new Date().getDate())
	// );
    const onChange = (e) => {
        setInputVal(e.target.value);
    };
    const onDateChange = (e) => {
		setCurrentDate((e.$d.getFullYear() +
        " " +
        e.$d.getMonth() +
        " " +
        e.$d.getDate()));
    }

    const handleClick = () => {
        if (inputVal != "" && todos.length < 8) {
            setTodos([
				...todos,
				{
					val: inputVal,
					id: new Date().getTime(),
					date: currentDate
				},
			]);
            setInputVal("");
            // setCurrentTodos(todos);
        }
    };

  const onDelete = (id) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
  };
    return (
		<section className="checklist">
            
			<Grid container rowSpacing={2}>
				<Grid xs={2} sx={{ textAlign: "center" }}></Grid>
				<Grid xs={4} sx={{ textAlign: "center" }}>
					<Typography
						fontSize={55}
						fontWeight="bold"
						sx={{ fontFamily: "Bebas Neue, sans-serif" }}
					>
						To-Do List
					</Typography>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateCalendar
							sx={{
								borderColor: "white",
								color: "white",
								"& .MuiPickersDay-root": { color: "white" },
                                bottom: 0
							}}
							onChange={onDateChange}
							// onChange={}
						/>
					</LocalizationProvider>
				</Grid>
				<Grid xs={1} sx={{ textAlign: "center" }}></Grid>
				<Grid xs={4} sx={{ textAlign: "center" }}>
					<TodoContainer elevation={10} className="list">
						<StyledTextField
							label="Enter Task"
							variant="standard"
							onChange={onChange}
							value={inputVal}
							sx={{ alignSelf: "center" }}
						/>
						<IconButton onClick={handleClick}>
							<AddToPhotosRoundedIcon
								sx={{
									height: 30,
									width: 30,
									alignSelf: "center",
								}}
							/>
						</IconButton>
                        
						{todos
							.filter((todo) => todo.date == currentDate)
							.map((todo) => {
								return (
									<div>
										<ListItem divider="bool">
											<Checkbox
												sx={{
													color: "white",
													"&.Mui-checked": {
														color: "white",
													},
												}}
											/>
											<Typography key={todo.id}>
												{todo.val}
											</Typography>
											<IconButton
												onClick={() =>
													onDelete(todo.id)
												}
											>
												<RemoveCircle />
											</IconButton>
										</ListItem>
									</div>
								);
							})}
					</TodoContainer>
				</Grid>
				<Grid xs={1} sx={{ textAlign: "center" }}></Grid>
			</Grid>
		</section>
	);
}
