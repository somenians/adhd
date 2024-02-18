import base64
import os
import mediapipe as mp
import csv 
import math
import time
import cv2
import numpy as np
from flask import Flask, render_template, send_from_directory, request
from flask_socketio import SocketIO, emit
import sys

app = Flask(__name__, static_folder="./templates/static")
app.config["SECRET_KEY"] = "secret!"
socketio = SocketIO(app)

def base64_to_image(base64_string):
    """
    The base64_to_image function accepts a base64 encoded string and returns an image.
    The function extracts the base64 binary data from the input string, decodes it, converts 
    the bytes to numpy array, and then decodes the numpy array as an image using OpenCV.
    
    :param base64_string: Pass the base64 encoded image string to the function
    :return: An image
    """
    base64_data = base64_string.split(",")[1]
    image_bytes = base64.b64decode(base64_data)
    image_array = np.frombuffer(image_bytes, dtype=np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    return image



@app.route('/track', methods=['POST'])
def track():
    """
    The receive_image function takes in an image from the webcam, converts it to grayscale, and then emits
    the processed image back to the client.

    emit()
    :param image: Pass the image data to the receive_image function
    :return: The image that was received from the client
    """
    img = request.files['image']
    # Decode the base64-encoded image data
    print("image received")
    img = base64_to_image(img)

    # Flip + convert img from BGR to RGB
    img = cv2.cvtColor(cv2.flip(img, 1), cv2.COLOR_BGR2RGB)

    # To improve performance
    img.flags.writeable = False
    
    # Get the result
    results = face_mesh.process(img)
    img.flags.writeable = True
    
    # Convert the color space from RGB to BGR
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    (img_h, img_w, img_c) = img.shape
    face_2d = []

    """if not results.multi_face_landmarks:
      continue """

    for face_landmarks in results.multi_face_landmarks:
        face_2d = []
        for idx, lm in enumerate(face_landmarks.landmark):
            # Convert landmark x and y to pixel coordinates
            x, y = int(lm.x * img_w), int(lm.y * img_h)

            # Add the 2D coordinates to an array
            face_2d.append((x, y))
        
        # Get relevant landmarks for headpose estimation
        face_2d_head = np.array([
            face_2d[1],      # Nose
            face_2d[199],    # Chin
            face_2d[33],     # Left eye left corner
            face_2d[263],    # Right eye right corner
            face_2d[61],     # Left mouth corner
            face_2d[291]     # Right mouth corner
        ], dtype=np.float64)

        face_2d = np.asarray(face_2d)

        # The camera matrix
        focal_length = 1 * img_w
        cam_matrix = np.array([ [focal_length, 0, img_h / 2],
                                [0, focal_length, img_w / 2],
                                [0, 0, 1]])

        # Distortion coefficients 
        dist_coeffs = np.zeros((4, 1), dtype=np.float64)

        # Solve PnP
        _, l_rvec, l_tvec = cv2.solvePnP(leye_3d, face_2d_head, cam_matrix, dist_coeffs, flags=cv2.SOLVEPNP_ITERATIVE)
        _, r_rvec, r_tvec = cv2.solvePnP(reye_3d, face_2d_head, cam_matrix, dist_coeffs, flags=cv2.SOLVEPNP_ITERATIVE)


        # Get rotational matrix from rotational vector
        l_rmat, _ = cv2.Rodrigues(l_rvec)
        r_rmat, _ = cv2.Rodrigues(r_rvec)


        # [0] changes pitch
        # [1] changes roll
        # [2] changes yaw
        # +1 changes ~45 degrees (pitch down, roll tilts left (counterclockwise), yaw spins left (counterclockwise))

        # --- Projection ---

        # Get left eye corner as integer
        l_corner = face_2d_head[2].astype(np.int32)

        # Project axis of rotation for left eye
        axis = np.float32([[-100, 0, 0], [0, 100, 0], [0, 0, 300]]).reshape(-1, 3)
        l_axis, _ = cv2.projectPoints(axis, l_rvec, l_tvec, cam_matrix, dist_coeffs)

        # Draw axis of rotation for left eye
        if draw_headpose:
            """if draw_full_axis:
                cv2.line(img, l_corner, tuple(np.ravel(l_axis[0]).astype(np.int32)), (200,200,0), 3)
                cv2.line(img, l_corner, tuple(np.ravel(l_axis[1]).astype(np.int32)), (0,200,0), 3)"""
            end_tuple = tuple(np.ravel(l_axis[2]).astype(np.int32))
            cv2.line(img, l_corner, end_tuple, (0,200,200), 3)
            vector_magnitude = math.sqrt((l_corner[0]-end_tuple[0]) ** 2 + math.sqrt((l_corner[1]-end_tuple[1]) ** 2))
            cv2.circle(img, (320, 240), radius=20, thickness=-1, color=(127,127,127))  
            
            print(vector_magnitude, file=sys.stderr)
            
            if vector_magnitude > 20:
                focused = False
                frames_out_of_margin += 1
                frame_margin_of_error = 10
                if frames_out_of_margin > 150:
                    print("ur not focusing")

                    
            else:
                if focused == False:
                    if frame_margin_of_error > 0:
                        frame_margin_of_error -= 1
                    else:
                        frames_out_of_margin = 0
                        frame_margin_of_error = 10
                        focused = True
        
        
    
        # Get left eye corner as integer
        r_corner = face_2d_head[3].astype(np.int32)

        # Get left eye corner as integer
        r_axis, _ = cv2.projectPoints(axis, r_rvec, r_tvec, cam_matrix, dist_coeffs)

        # Draw axis of rotation for left eye
        if draw_headpose:
            if draw_full_axis:
                cv2.line(img, r_corner, tuple(np.ravel(r_axis[0]).astype(np.int32)), (200,200,0), 3)
                cv2.line(img, r_corner, tuple(np.ravel(r_axis[1]).astype(np.int32)), (0,200,0), 3)
            cv2.line(img, r_corner, tuple(np.ravel(r_axis[2]).astype(np.int32)), (0,200,200), 3)
        


    #cv2.imshow('Head Pose Estimation', img)


    result, frame_encoded = cv2.imencode(".jpg", img)
    processed_img_data = base64.b64encode(frame_encoded).decode()
    b64_src = "data:image/jpg;base64,"
    processed_img_data = b64_src + processed_img_data
    emit("processed_image", processed_img_data)


@app.route("/")
def index():
    """
    The index function returns the index.html template, which is a landing page for users.
    
    :return: The index
    """
    return render_template("index.html")


if __name__ == "__main__":
        ############## PARAMETERS #######################################################
    # cite public github -> https://github.com/matthullstrung/gaze-estimation/blob/main/headpose.py
    # Set these values to show/hide certain vectors of the estimation
    draw_gaze = False
    draw_full_axis = False
    draw_headpose = True

    # Gaze Score multiplier (Higher multiplier = Gaze affects headpose estimation more)
    x_score_multiplier = 4
    y_score_multiplier = 4

    # Threshold of how close scores should be to average between frames
    threshold = .3

    #################################################################################


    mp_face_mesh = mp.solutions.face_mesh
    face_mesh = mp_face_mesh.FaceMesh(static_image_mode=False,
        refine_landmarks=True,
        max_num_faces=1,
        min_detection_confidence=0.5)

    cap = cv2.VideoCapture(0)
    face_3d = np.array([
        [0.0, 0.0, 0.0],            # Nose tip
        [0.0, -330.0, -65.0],       # Chin
        [-225.0, 170.0, -135.0],    # Left eye left corner
        [225.0, 170.0, -135.0],     # Right eye right corner
        [-150.0, -150.0, -125.0],   # Left Mouth corner
        [150.0, -150.0, -125.0]     # Right mouth corner
        ], dtype=np.float64)

    # Reposition left eye corner to be the origin
    leye_3d = np.array(face_3d)
    leye_3d[:,0] += 225
    leye_3d[:,1] -= 175
    leye_3d[:,2] += 135

    # Reposition right eye corner to be the origin
    reye_3d = np.array(face_3d)
    reye_3d[:,0] -= 225
    reye_3d[:,1] -= 175
    reye_3d[:,2] += 135

    # Gaze scores from the previous frame
    last_lx, last_rx = 0, 0
    last_ly, last_ry = 0, 0

    frames = 0
    frame_margin_of_error = 10  # accounts for misclassification of facial position (values can surge or lull randomly)
    frames_out_of_margin = 0 # allows us to calculate how long someone has been out of focus (frames / 30 frames/second = seconds out of focus)
    focused = True

    socketio.run(app, debug=True, port=4999, host='0.0.0.0')
