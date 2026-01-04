def detect_gesture(landmarks):
    index_tip = landmarks[8]
    middle_tip = landmarks[12]
    
    if index_tip.y < middle_tip.y:
        return "DRAW"
    return "STOP"