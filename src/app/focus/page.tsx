"use client";

import { useState, useEffect, useRef } from "react";
import {
  Grid,
  Stack,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { Howl } from "howler";
import {
  PlayCircleRounded,
  SkipNextRounded,
  StopCircleRounded,
} from "@mui/icons-material";
// import { Camera } from "react-camera-pro";
import { Webcam } from "react-webcam";
// import { io } from "socket.io-client";

let studyTime = 1.5e6;
let shortBreak = 600000;
let longBreak = 900000;
let phase = 0;

export default function Page() {
  // -----------------------------------------------------------------------------------
  // Timer Code
  const [timerOn, setTimeOn] = useState(false);
  const [time, setRemainingTime] = useState(studyTime);
  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  function updatePhase() {
    // alarm.play();

    phase++;
    if (phase === 15) {
      phase = 0;
      setRemainingTime(longBreak);
    } else if (phase % 2 === 0) {
      setRemainingTime(studyTime);
    } else {
      setRemainingTime(shortBreak);
    }
    console.log(phase);
  }
  const minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
  const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);

  // -----------------------------------------------------------------------------------
  // Camera Code
  // const webcamRef = useRef(null);

  // const playCameraStream = () => {
  //     if (videoRef.current) {
  //         videoRef.current.play();
  //     }
  // };

  // const videoRef = useRef();
  // useEffect(() => {
  // 	async function getCameraStream() {
  // 		const stream = await navigator.mediaDevices.getUserMedia({
  // 			audio: false,
  // 			video: true,
  // 		});

  // 		if (videoRef.current) {
  // 			videoRef.current.srcObject = stream;
  //             const { videoWidth, videoHeight } = videoRef.current;

  //             // const socket = io("localhost:4999/", {
  // 			// 	transports: ["websocket"],
  // 			// 	cors: {
  // 			// 		origin: "http://localhost:3000/",
  // 			// 	},
  // 			// });

  // 			// socket.on("connect", (data) => {
  // 			// 	console.log(data);
  // 			// });

  //             var canvas = document.getElementById("canvas");
  //             var context = canvas.getContext("2d");

  //             const FPS = 30;
  // 			setInterval(() => {
  // 				context.drawImage(stream, 0, 0, videoWidth, videoHeight);
  // 				var data = canvas.toDataURL("image/jpeg", 0.5);
  // 				context.clearRect(0, 0, videoWidth, videoHeight);
  // 				// socket.emit("image", data);
  //                 fetch("http://localhost:4999", {
  // 					method: "POST",
  // 					headers: {
  // 						Accept: "application/json",
  // 						"Content-Type": "application/json",
  // 					},
  // 					body: JSON.stringify({ img: data }),
  // 				})
  // 					.then((response) => response.json())
  // 					.then((response) =>
  // 						console.log(JSON.stringify(response))
  // 					);
  // 			}, 1000 / FPS);

  // 			// socket.on("processed_image", function (image) {
  //             //     const image_id = document.getElementById("image");
  // 			// 	image_id.src = image;
  //             //     console.log("hehe")
  // 			// });

  //             // socket.on("siddhant", (data) => {
  //             //     console.log(data);
  //             // })

  // 			// socket.on("disconnect", (data) => {
  // 			// 	console.log(data);
  // 			// });

  // 			// return function cleanup() {
  // 			// 	socket.disconnect();
  // 			// };
  // 		}
  // 	}

  // 	getCameraStream();
  // }, []);

  // -----------------------------------------------------------------------------------
  return (
    <section className="focus">
      <Grid container rowSpacing={2}>
        <Grid xs={6} sx={{ textAlign: "center", alignSelf: "center" }}>
          <Typography
            fontSize={60}
            sx={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Focus
          </Typography>
          {/* <Webcam ref={webcamRef} onUserMedia={} /> */}
          {/* <canvas id={'canvas'}>
                        <video
                            ref={videoRef}
                            onCanPlay={() => playCameraStream()}
                        />
                    </canvas>
					<div class="video">
					    <img id="photo" width="250" height="250" />
					</div> */}
        </Grid>

        <Grid xs={4} sx={{ textAlign: "center", alignSelf: "center" }}>
          <Typography
            fontSize={60}
            sx={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Study Timer
          </Typography>
          <Typography
            fontSize={200}
            sx={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            {minutes}:{seconds}
          </Typography>
          {!timerOn && (
            <IconButton
              sx={{ width: 100, height: 100 }}
              className="button"
              onClick={() => setTimeOn(true)}
            >
              <PlayCircleRounded
                color="white"
                sx={{ width: 100, height: 100 }}
              />
            </IconButton>
          )}
          {timerOn && (
            <IconButton
              sx={{ width: 100, height: 100 }}
              className="button"
              onClick={() => setTimeOn(false)}
            >
              <StopCircleRounded
                color="white"
                sx={{ width: 100, height: 100 }}
              />
            </IconButton>
          )}

          <IconButton
            sx={{ width: 100, height: 100 }}
            className="button"
            onClick={() => {
              updatePhase();
              setTimeOn(false);
            }}
          >
            <SkipNextRounded color="white" sx={{ width: 100, height: 100 }} />
          </IconButton>
          {time === 0 && updatePhase()}
        </Grid>
        <Grid xs={2} sx={{ textAlign: "center", alignSelf: "center" }} />
      </Grid>
    </section>
  );
}
