import socketio
import asyncio

class SocketClient:
    def __init__(self):
        self.sio = socketio.AsyncClient()
        self.connected = False

    async def connect(self):
        try:
            # Connect to the server
            await self.sio.connect('http://localhost:5000')
            self.connected = True
            print("Connected to server")
        except Exception as e:
            print(f"Connection failed: {e}")

    async def send_data(self, data):
        if not self.connected:
            await self.connect()
        
        if self.connected:
            try:
                # Emit 'draw' event as expected by server/socket.ts
                await self.sio.emit('draw', data)
            except Exception as e:
                print(f"Failed to send data: {e}")
                self.connected = False

    async def disconnect(self):
        if self.connected:
            await self.sio.disconnect()
            self.connected = False

# Global instance
client = SocketClient()

# Wrapper for backward compatibility if needed, but we will use client directly
async def send_data(data):
    await client.send_data(data)