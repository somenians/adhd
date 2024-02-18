import React from "react";
import "./style.css";
import { Grid, Stack, Typography, Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function handleClick () {
    // navigate("/login")
}
export const About = () => {
	return (
		<section className="about">
			<Grid container rowSpacing={2}>
				<Grid xs={1} sx={{ alignItems: "center" }}></Grid>
				<Grid xs={4} sx={{ alignItems: "center" }}>
					<Typography
						fontSize={60}
						fontWeight="bold"
						sx={{ fontFamily: "Bebas Neue, sans-serif" }}
					>
						About Us
					</Typography>
				</Grid>
				<Grid xs={6} sx={{ alignItems: "center", alignSelf:"center" }}>
					{/* <Typography
						fontSize={40}
						fontWeight="bold"
						sx={{ fontFamily: "Bebas Neue, sans-serif" }}
					>
						But FocusUp! isn't just about monitoring – it's also about empowerment. With FocusUp!, you'll develop the discipline and focus skills needed to thrive in today's fast-paced world, no matter what the circumstances may be. 
					</Typography> */}
					{/* <Typography
						fontSize={40}
						fontWeight="bold"
						sx={{ fontFamily: "Bebas Neue, sans-serif" }}
					> */}
						
					{/* <Grid item xs={6}> */}
                    <Accordion
                        className="accord"
                        sx={{ backgroundColor: "transparent" }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography className="desc">
                                FocusUp! is an your ultimate productivity
                                companion, helping you battle against your
                                distractions while trying to focus on your
                                work. Say goodbye to procrastination and
                                hello to productivity with FocusUp! – the
                                ultimate tool designed to help you stay on
                                track and accomplish your tasks with ease.
                            </Typography>
                        </AccordionSummary>
                        <br></br>
                        <AccordionDetails>
                            <Typography className="desc">
                                FocusUp! conducts a live webcam session to
                                track where your eyes are focused. It
                                ensures you stay on task and avoid
                                distractions around you. Throughout the
                                session, FocusUp! provides gentle alerts if
                                it detects your attention wandering. These
                                prompts gently guide you back to the task at
                                hand, helping you maintain peak
                                productivity. 
                            </Typography>
                            <br></br>
                            <Typography className="desc">
                                But FocusUp! isn't just about
                                monitoring – it's also about empowerment.
                                With FocusUp!, you'll develop the discipline
                                and focus skills needed to thrive in today's
                                fast-paced world, no matter what the
                                circumstances may be.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <br></br>
                    <Button
                        href="/login"
                        variant="contained"
                        size="large"
                        endIcon={<SendIcon />}
                    >
                        Get Started
                    </Button>
						{/* <Button variant="text" size="small">...</Button> */}
					{/* </Grid> */}
                    {/* </Typography> */}
				</Grid>
				{/* <Grid xs={2} sx={{ alignItems: "center" }}></Grid> */}
			</Grid>
		</section>
	);
};
