import cv2
import asyncio
from hand_tracker import HandTracker
from gestures import detect_gesture
from websocket_client import client
from shape_detector import detect_shape

async def main():
    tracker = HandTracker()
    cap = cv2.VideoCapture(0)
    
    print("Initializing AI Hand Tracker...")
    # Attempt connection at startup
    await client.connect()

    points = []

    try:
        while True:
            ret, frame = cap.read()
            if not ret:
                break

            landmarks = tracker.get_landmarks(frame)

            if landmarks:
                gesture = detect_gesture(landmarks)
                index = landmarks[8]
                x, y = int(index.x * 800), int(index.y * 600)

                if gesture == "DRAW":
                    points.append((x, y))
                    # Send draw data
                    await client.send_data({
                        "type": "DRAW",
                        "x": x,
                        "y": y
                    })
                else:
                    shape = detect_shape(points)
                    if shape:
                        # Send shape data
                        await client.send_data({
                            "type": "SHAPE",
                            "shape": shape,
                            "points": points
                        })
                    points = []

            cv2.imshow("AI Hand Tracker", frame)
            # waitKey(1) is blocking, but for short duration it's acceptable in this loop
            if cv2.waitKey(1) & 0xFF == 27:
                break
            
            # Allow other async tasks to run (like socketio heartbeats)
            await asyncio.sleep(0.01)

    finally:
        cap.release()
        cv2.destroyAllWindows()
        await client.disconnect()

if __name__ == "__main__":
    asyncio.run(main())
