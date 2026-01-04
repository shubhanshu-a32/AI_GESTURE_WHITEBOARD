import cv2
import numpy as np

def detect_shape(points):
    if len(points) < 20:
        return None
    
    pts = np.array(points, dtype=np.int32)
    countour = pts.reshape((-1, 1, 2))
    
    peri = cv2.arcLength(countour, True)
    approx = cv2.approxPolyDP(countour, 0.94 * peri, True)
    
    if len(approx) == 4:
        return "RECTANGLE"
    elif len(approx) > 6:
        return "CIRCLE"
    
    return "FREE"